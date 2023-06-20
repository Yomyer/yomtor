import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TransformToolProps } from './TransformTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import {
  ChangeFlag,
  Control,
  DrawControlEvent,
  Group,
  Item,
  Matrix,
  MouseEvent,
  Path,
  Point,
  Selector,
  Shape,
  Size,
  Tool,
  ToolEvent
} from '@yomtor/paper'
import {
  sign,
  normalize,
  round,
  abs,
  rotateDelta,
  scaleWithRotate,
  roundToNearestEven
} from '@yomtor/utils'
import { useHotkeys } from '@yomtor/hooks'
import { Resize, Rotate, useCursor, useGlobalCursor } from '@yomtor/cursors'

const defaultProps: Partial<TransformToolProps> = {}

export const TransformTool = (props: TransformToolProps) => {
  const { children } = useComponentDefaultProps(
    'TransformTool',
    defaultProps,
    props
  )

  const { canvas } = useEditorContext()
  const [tool, setTool] = useState<Tool>()
  const mode = useRef<'resize' | 'rotate'>('resize')
  const cursor = useRef<{
    point?: Point
    angle: number
    corner?: Item
  }>(null)
  const activeItems = useRef<Item[]>([])
  const cursorAngle = useRef<number>(null)
  const data = useRef<{
    pivot: Point
    pivotOrigin: Point
    corner: Point
    handler: Point
    size: Size
    center: Point
    direction: Point
    angle: number
    delta?: Point
    point?: Point
  }>()
  const point = useRef<Point>(null)

  const activeHelpers = useRef<Item[]>([])
  const toolControls = useRef<Control[]>([])

  const lastPoint = useRef<Point>(null)
  const cornerItem = useRef<Item>(null)
  const size = useRef<Size>()
  const cornerName = useRef<string>(null)
  const pivot = useRef<Point>(null)
  const angle = useRef<number>()
  const corner = useRef<Point>(null)
  const center = useRef<Point>(null)
  const delta = useRef<Point>(null)
  const direction = useRef<Point>(null)
  const centered = useRef<boolean>(null)

  const [showRotate, hideRotate] = useGlobalCursor(Rotate)
  const [showResize, hideResize] = useGlobalCursor(Resize)
  const { showCursor, hideCursors } = useCursor()

  const scaleCorners = [
    'topCenter',
    'bottomCenter',
    'leftCenter',
    'rightCenter'
  ]
  const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']

  const transform = (e: ToolEvent, helper = true) => {
    if (!lastPoint.current) return
    mode.current === 'rotate' ? rotate(e, helper) : resize(e, helper)
  }

  const resize = (e: ToolEvent, helper = true) => {
    const selector = canvas.project.selector

    let origin = pivot.current

    delta.current = rotateDelta(
      e.point,
      point.current,
      selector.inheritedAngle
    ).multiply(direction.current)

    let disrupting = new Point(0, 0)
    let factor = new Size(delta.current)

    if (e.modifiers.alt) {
      origin = center.current
      factor = roundToNearestEven(factor.add(new Size(delta.current)).round())
      disrupting = new Point(1, 1)
    }

    let newSize = size.current.add(factor).round()

    if (e.modifiers.shift) {
      const signx = newSize.width > 0 ? 1 : -1
      const signy = newSize.height > 0 ? 1 : -1

      const diff = newSize.abs().divide(size.current)
      const max = Math.max(diff.width, diff.height)
      newSize = size.current
        .multiply(max)
        .multiply(new Size(signx, signy))
        .round()

      if (!e.modifiers.alt) {
        disrupting = corners.includes(cornerName.current)
          ? null
          : new Point(
              +!['leftCenter', 'rightCenter'].includes(cornerName.current),
              +!['topCenter', 'bottomCenter'].includes(cornerName.current)
            )
      }
    }

    selector.setSize(newSize, origin, disrupting, helper)

    canvas.project.selector.setInfo(
      `${newSize.abs().width} x ${newSize.abs().height}`,
      e.point
    )

    if (helper) {
      canvas.project.emit('object:scaling', e)
    }
  }

  const rotate = (e: ToolEvent, helper = true) => {
    const current = data.current
    const selector = canvas.project.selector

    const origin = corner.current.subtract(center.current).angle % 360
    const rotate = lastPoint.current.subtract(center.current).angle % 360
    let delta = round(rotate - origin) % 360

    if (e.modifiers.shift) {
      delta = (round(delta / 15) * 15) % 360
    }

    selector.setAngle(delta, center.current, helper)

    canvas.project.selector.setInfo(`${delta % 181}º`, corner.current)
    if (helper) {
      canvas.project.emit('object:rotating', e)
    }
    setCursor(canvas.project.activeItems.length > 1 && delta)
  }

  const setCursor = (angle = 0) => {
    if (tool.idle) return

    const cursorIcon = mode.current === 'rotate' ? Rotate : Resize

    hideCursors([Rotate, Resize])
    hideRotate(cursorAngle.current)

    if (!cursor.current) {
      return showCursor(cursorIcon)
    }

    angle =
      ((round(
        (cursor.current.corner.position.subtract(
          canvas.project.selector.position
        ).angle +
          angle) /
          5
      ) *
        5) %
        360) %
      181

    showCursor(cursorIcon, angle)

    cursorAngle.current = angle
  }

  const createControls = useCallback(() => {
    const config = {
      size: 8,
      strokeColor: 'rgba(0, 142, 252, 1)',
      fillColor: 'white',
      strokeWidth: 0.2,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 2,
      shadowOffset: 1,
      applyChanges: false
    }

    const rotates = {
      rotateTopLeft: -5,
      rotateTopRight: [5, -5],
      rotateBottomLeft: [-5, 5],
      rotateBottomRight: 5
    }

    tool.addControl(
      new Control('transforms', ({ control, selector }: DrawControlEvent) => {
        const zoom = control.zoom

        control.removeChildren()

        if (canvas.project.activeItems.length) {
          Object.keys(rotates).forEach((corner) => {
            control.addChild(
              new Shape.Rectangle({
                ...config,
                name: corner,
                size: config.size / zoom,
                opacity: 0.0000001,
                position: selector[
                  corner.replace('rotateB', 'b').replace('rotateT', 't')
                ].add(new Point(rotates[corner]).divide(zoom))
              }).rotate(selector.inheritedAngle)
            )
          })

          scaleCorners.forEach((corner) => {
            control.addChild(
              new Shape.Rectangle({
                ...config,
                name: corner,
                opacity: 0.0000001,
                size: ['topCenter', 'bottomCenter'].includes(corner)
                  ? new Size(selector.width, 1 / zoom)
                  : new Size(1 / zoom, selector.height),
                position: selector[corner]
              }).rotate(selector.inheritedAngle)
            )
          })

          corners.forEach((corner) => {
            control.addChild(
              new Shape.Rectangle({
                ...config,
                name: corner,
                size: config.size / zoom,
                position: selector[corner]
              }).rotate(selector.inheritedAngle)
            )
          })
        }
      })
    )
  }, [tool])

  useEffect(() => {
    if (!canvas) return
    setTool(canvas.createTool('TransformTool', false, ['SelectorTool']))
  }, [canvas])

  useEffect(() => {
    if (!tool) return

    createControls()

    const selector = canvas.project.selector

    tool.onMouseDrag = (e: ToolEvent) => {
      transform(e)

      tool.hideOtherTools()
      tool.hide = true

      lastPoint.current = e.point
    }

    tool.onKeyDown = (e: ToolEvent) => {
      e.point = lastPoint.current
      transform(e)
    }

    tool.onKeyUp = (e: ToolEvent) => {
      e.point = lastPoint.current
      transform(e)
    }

    tool.onMouseUp = (e: ToolEvent) => {
      tool.showOtherTools()
      tool.hide = false
      canvas.project.deactivateAll()
      activeHelpers.current.forEach((item) => item.remove())
      activeItems.current.forEach((item) =>
        item.set({ visible: true, actived: true })
      )

      transform(e, false)

      hideRotate()
      hideResize()
      tool.activeMain()

      if (e.item) {
        const hitResult = e.item.hitTest(e.point, {
          stroke: false,
          fill: true
        })
        if (hitResult && hitResult.item) {
          const event: MouseEvent = e as unknown as MouseEvent
          event.target = hitResult.item
          hitResult.item.emit('mouseenter', event)
        }
      }

      cursor.current = null

      selector.clearInfo()

      canvas.project.emit(
        mode.current === 'resize' ? 'object:resized' : 'object:rotated',
        e
      )
    }

    canvas.view.on('mousemove', (e: MouseEvent & { target: Control }) => {
      if (
        e.target &&
        e.target.name &&
        tool.getControl('transforms').children.includes(e.target)
      ) {
        cornerItem.current = e.target || cornerItem.current
      } else {
        cornerItem.current = null
      }

      if (!cornerItem.current) {
        hideCursors([Rotate, Resize])
      }
    })

    selector.on('mouseenter', (e: MouseEvent & { target: Control }) => {
      if (
        (tool.actived && !tool.mainActived) ||
        canvas.mainTool.paused ||
        !tool.getControl('transforms').children.includes(e.target)
      )
        return

      cursor.current = {
        angle: 0,
        point: e.target.position,
        corner: e.target
      }

      mode.current =
        !scaleCorners.includes(e.target.name) && e.modifiers.meta
          ? 'rotate'
          : 'resize'

      if (e.target.name.startsWith('rotate')) {
        mode.current = 'rotate'
      }
      cursorAngle.current = null

      canvas.project.clearHighlightedItem()

      setCursor()
    })

    selector.on('mouseleave', () => {
      if (!tool.actived) {
        cursor.current = null
        mode.current = 'resize'
      }
    })

    selector.on(
      'mousedown',
      (e: MouseEvent & { target: Control; force: boolean }) => {
        if (
          !tool.mainActived ||
          (!tool.getControl('transforms').children.includes(e.target) &&
            !e.force)
        )
          return

        tool.activate()

        activeItems.current = [...canvas.project.activeItems]
        cornerName.current = e.target.name
          .replace('rotateB', 'b')
          .replace('rotateT', 't')

        point.current = e.point
        angle.current = selector.inheritedAngle
        pivot.current = selector.getOposite(cornerName.current)
        size.current = selector.size
        corner.current = selector[cornerName.current]
        center.current = selector.center
        delta.current = new Point(0, 0)

        const matrix = new Matrix().rotate(
          -selector.inheritedAngle,
          selector.center
        )
        direction.current = sign(
          normalize(
            matrix
              .transformPoint(corner.current)
              .subtract(matrix.transformPoint(pivot.current))
          )
        )

        cursor.current = {
          angle: selector.angle,
          point: e.point,
          corner: e.target
        }

        cursorAngle.current = null

        setCursor()

        lastPoint.current = e.point
      }
    )
  }, [tool])

  useHotkeys(
    {
      keys: '*+cmd',
      down: () => {
        if (!tool.actived) {
          if (
            canvas.project.selector &&
            cornerItem.current &&
            mode.current !== 'rotate' &&
            !scaleCorners.includes(cornerItem.current.name)
          ) {
            mode.current = 'rotate'
            cursor.current = {
              point: cornerItem.current.position,
              corner: cornerItem.current,
              angle: canvas.project.selector.angle
            }
            setCursor()
          }
        }
      },
      up: () => {
        if (!tool.actived && cornerItem.current) {
          mode.current = cornerItem.current.name.startsWith('rotate')
            ? 'rotate'
            : 'resize'
          setCursor()
        }
      }
    },
    [tool, canvas]
  )

  return <>{children}</>
}

TransformTool.displayName = '@yomtor/core/TransformTool'
