import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TransformToolProps } from './TransformTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../../Editor.context'
import {
  Control,
  Item,
  Matrix,
  MouseEvent,
  Point,
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
  scaleWithRotate
} from '@yomtor/utils'
import { useEventListener, useHotkeys } from '@yomtor/hooks'
import {
  clearCursor,
  clearGlobalCursor,
  Resize,
  Rotate,
  setCursor,
  setGlobalCursor
} from '@yomtor/cursors'

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
  const lastPoint = useRef<Point>(null)
  const corner = useRef<Item>(null)
  const activeHelpers = useRef<Item[]>([])
  const toolControls = useRef<Control[]>([])
  const scaleCorners = [
    'topCenter',
    'bottomCenter',
    'leftCenter',
    'rightCenter'
  ]
  const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']

  const helperControl = () => {
    canvas.project.deactivateAll()

    if (activeHelpers.current.length) {
      activeHelpers.current.forEach((item) => item.remove())
    }

    activeHelpers.current = activeItems.current.map((item) => {
      const clone = item
        .set({
          visible: false,
          highlighted: false
        })
        .clone({ keep: true })
      clone.set({
        visible: true,
        actived: true
      })
      return clone
    })
  }

  const transform = (e: ToolEvent, helper = true) => {
    mode.current === 'rotate' ? rotate(e, helper) : resize(e, helper)
  }

  const resize = (e: ToolEvent, helper = true) => {
    const current = data.current

    if (helper && e) {
      helperControl()
    }

    current.delta = rotateDelta(
      current.point,
      current.handler,
      current.angle
    ).multiply(current.direction)

    let sizeModify = current.size
    if (e.modifiers.alt) {
      current.pivot = current.center
      sizeModify = current.size.multiply(0.5)
    } else {
      current.pivot = current.pivotOrigin
    }

    const size = sizeModify.add(current.delta as unknown as Size).round()
    if (size.width === 0) {
      size.width = 1
    }
    if (size.height === 0) {
      size.height = 1
    }

    const factor = new canvas.Point(1.0, 1.0)
    if (Math.abs(sizeModify.width) > 0.0000001) {
      factor.x = size.width / sizeModify.width
    }
    if (Math.abs(sizeModify.height) > 0.0000001) {
      factor.y = size.height / sizeModify.height
    }

    if (e.modifiers.shift) {
      const signx = factor.x > 0 ? 1 : -1
      const signy = factor.y > 0 ? 1 : -1

      factor.x = factor.y = Math.max(
        Math.abs(factor.x * current.direction.x),
        Math.abs(factor.y * current.direction.y)
      )
      factor.x *= signx
      factor.y *= signy
    }

    canvas.project.activeItems.forEach((item) => {
      scaleWithRotate(
        item,
        factor,
        current.pivot,
        current.center,
        canvas.project.activeItems.length === 1 ? undefined : current.angle
      )
    })

    canvas.project.selector.setInfo(
      `${abs(round(sizeModify.width * factor.x))} x ${abs(
        round(sizeModify.height * factor.y)
      )}`,
      current.point
    )

    if (helper) {
      canvas.project.fire('object:scaling', e)
    }
  }

  const rotate = (e: ToolEvent, helper = true) => {
    const current = data.current

    if (helper && e) {
      helperControl()
    }

    const origin = data.current.handler.subtract(current.center).angle % 360
    const rotate = data.current.point.subtract(current.center).angle % 360
    let delta = round(rotate - origin) % 360

    if (e.modifiers.shift) {
      delta = (round(delta / 15) * 15) % 360
    }

    canvas.project.activeItems.forEach((item) => {
      item.rotate(delta, data.current.center)
    })

    canvas.project.selector.setInfo(`${delta % 181}º`, current.point)
    if (helper) {
      canvas.project.fire('object:rotating', e)
    }
    showCursor(true, canvas.project.activeItems.length > 1 && delta)
  }

  const showCursor = (global = false, angle = 0) => {
    if (tool.idle) return

    const cursorIcon = mode.current === 'rotate' ? Rotate : Resize
    clearCursor([Rotate, Resize])
    clearGlobalCursor(Rotate, cursorAngle.current)

    if (!cursor.current) {
      return setCursor(cursorIcon)
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

    if (cursorAngle.current !== angle) {
      global ? setGlobalCursor(cursorIcon, angle) : setCursor(cursorIcon, angle)
      clearGlobalCursor(Rotate, cursorAngle.current)
    } else {
      global ? setGlobalCursor(cursorIcon, angle) : setCursor(cursorIcon, angle)
    }

    cursorAngle.current = angle
  }

  const createControls = useCallback(() => {
    const controls = toolControls.current

    const handler = new Shape.Rectangle({
      size: 8,
      strokeColor: 'rgba(0, 142, 252, 1)',
      fillColor: 'white',
      strokeWidth: 0.2,
      insert: false
    })

    const invisibleHandler = new Shape.Rectangle({
      size: 8,
      fillColor: 'red',
      opacity: 0.0000001,
      insert: false
    })

    const rotates = {
      rotateTopLeft: -5,
      rotateTopRight: [5, -5],
      rotateBottomLeft: [-5, 5],
      rotateBottomRight: 5
    }

    Object.keys(rotates).forEach((corner) => {
      controls.push(
        new Control(
          corner,
          invisibleHandler.clone(),
          ({ control, selector }) => {
            control.position =
              selector[corner.replace('rotateB', 'b').replace('rotateT', 't')]
            control.offset = rotates[corner]
          }
        )
      )
    })

    scaleCorners.forEach((corner) => {
      controls.push(
        new Control(
          corner,
          invisibleHandler.clone(),
          ({ control, selector }) => {
            control.position = selector[corner]
            ;['topCenter', 'bottomCenter'].includes(corner) &&
              (control.size.width = canvas.view.zoom * selector.width)
            ;['leftCenter', 'rightCenter'].includes(corner) &&
              (control.size.height = canvas.view.zoom * selector.height)
          }
        )
      )
    })

    corners.forEach((corner) => {
      controls.push(
        new Control(
          corner,
          handler.clone(),
          ({ control, selector }) => (control.position = selector[corner])
        )
      )
    })
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
      const delta = e.point.subtract(lastPoint.current)
      data.current.point = data.current.point.add(delta)

      transform(e)

      lastPoint.current = e.point
    }

    tool.onKeyDown = (e: ToolEvent) => {
      transform(e)
    }

    tool.onKeyUp = (e: ToolEvent) => {
      transform(e)
    }

    tool.onMouseUp = (e: ToolEvent) => {
      canvas.project.deactivateAll()
      activeHelpers.current.forEach((item) => item.remove())
      activeItems.current.forEach((item) =>
        item.set({ visible: true, actived: true })
      )

      transform(e, false)

      clearGlobalCursor([Rotate, Resize])
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

      canvas.project.fire(
        mode.current === 'resize' ? 'object:resized' : 'object:rotated',
        e
      )
    }

    canvas.view.on('mousemove', (e: MouseEvent & { target: Control }) => {
      if (
        e.target &&
        e.target.data &&
        e.target.name &&
        e.target instanceof Control
      ) {
        corner.current = e.target || corner.current
      } else {
        corner.current = null
      }

      if (!corner.current) {
        clearCursor([Rotate, Resize])
      }
    })

    selector.on('mouseenter', (e: MouseEvent & { target: Control }) => {
      if ((tool.actived && !tool.mainActived) || canvas.mainTool.paused) return

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

      showCursor()
    })

    selector.on('mouseleave', () => {
      if (!tool.actived) {
        cursor.current = null
        mode.current = 'resize'
      }
      clearCursor([Rotate, Resize])
    })

    selector.on('mousedown', (e: MouseEvent & { target: Control }) => {
      if (!tool.mainActived) return
      tool.activate()

      const cornerName = e.target.name
        .replace('rotateB', 'b')
        .replace('rotateT', 't')
      activeItems.current = [...canvas.project.activeItems]

      const angle = selector.inheritedAngle

      const matrix = new Matrix().rotate(
        -selector.inheritedAngle,
        selector.center
      )

      const center = selector.center
      const corner: Point = selector[cornerName]
      const handler: Point = selector[cornerName]
      const pivot: Point = selector.getOposite(cornerName)
      const pivotOrigin = selector.getOposite(cornerName)
      const size = new Size(selector)
      const direction = sign(
        normalize(
          matrix.transformPoint(corner).subtract(matrix.transformPoint(pivot))
        )
      )

      data.current = {
        pivot,
        pivotOrigin,
        corner,
        handler,
        size,
        center,
        direction,
        angle,
        point: round(selector[cornerName] as Point)
      }

      cursor.current = {
        angle: selector.angle,
        point: selector[cornerName],
        corner: e.target
      }

      cursorAngle.current = null

      showCursor(true)

      lastPoint.current = selector[cornerName]
    })
  }, [tool])

  useHotkeys(
    {
      keys: '*+cmd',
      down: () => {
        if (!tool.actived) {
          if (
            canvas.project.selector &&
            corner.current &&
            mode.current !== 'rotate' &&
            !scaleCorners.includes(corner.current.name)
          ) {
            console.log(
              canvas.project.selector,
              corner.current,
              mode.current,
              !scaleCorners.includes(corner.current.name)
            )
            mode.current = 'rotate'
            cursor.current = {
              point: corner.current.position,
              corner: corner.current,
              angle: canvas.project.selector.angle
            }
            showCursor()
          }
        }
      },
      up: () => {
        if (!tool.actived && corner.current) {
          mode.current = corner.current.name.startsWith('rotate')
            ? 'rotate'
            : 'resize'
          showCursor()
        }
      }
    },
    [tool, canvas]
  )

  return <>{children}</>
}

TransformTool.displayName = '@yomtor/core/TransformTool'
