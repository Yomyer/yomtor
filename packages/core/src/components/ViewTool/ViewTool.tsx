import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ViewToolProps } from './ViewTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../../Editor.context'
import {
  Point,
  Tool,
  ToolEvent,
  MouseEvent,
  Rectangle,
  Event,
  Path
} from '@yomtor/paper'
import { HotKeysEvent, useEventListener, useHotkeys } from '@yomtor/hooks'
import {
  clearCursor,
  clearGlobalCursor,
  Grab,
  Grabbing,
  setCursor,
  setGlobalCursor
} from '@yomtor/cursors'
import { round } from '@yomtor/utils'

const defaultProps: Partial<ViewToolProps> = {
  factor: 5
}

export const ViewTool = (props: ViewToolProps) => {
  const { factor } = useComponentDefaultProps('ViewTool', defaultProps, props)

  const { canvas } = useEditorContext()
  const [tool, setTool] = useState<Tool>()
  const offset = useRef<Point>()
  const scrollDragDirection = useRef<Point>()
  const dragEvent = useRef<ToolEvent>()
  const downPoint = useRef<Point>()
  const outside = useRef<boolean>()

  const emitDragEvent = (e: WheelEvent) => {
    const event = new ToolEvent(tool, 'mousewheel', e)
    event.modifiers.alt = e.altKey
    event.modifiers.shift = e.shiftKey
    event.modifiers.control = e.ctrlKey
    event.modifiers.meta = e.metaKey
    event.lastPoint = offset.current
    event.downPoint = downPoint.current
    event.point = canvas.view.getEventPoint(e as unknown as Event)
    event.delta = event.point.subtract(offset.current)

    canvas.view.emit('mousewheel', event)
    canvas.tool && canvas.tool.onMouseDrag(event)

    offset.current = event.point
  }

  const wheelMove = useCallback(
    (e: WheelEvent) => {
      if (tool && !tool.paused) {
        const point = new canvas.Point(e.deltaX, e.deltaY).divide(factor)

        canvas.view.center = canvas.view.center.add(
          point.divide(canvas.view.zoom)
        )
      }

      emitDragEvent(e)
    },
    [tool, factor]
  )

  const arrowMove = useCallback(
    (e: HotKeysEvent) => {
      if (tool && tool.mainActived && !canvas.project.activeItems.length) {
        const point = new Point(e.delta)
          .multiply((e.isPressed('shift') && 10) || 1)
          .multiply(-factor)

        canvas.view.center = canvas.view.center.add(
          point.divide(canvas.view.zoom)
        )
      }
    },
    [tool]
  )

  useEffect(() => {
    if (!canvas) return
    const tool = canvas.createTool('ViewTool')

    setTool(tool)

    canvas.view.on('mousemove', (e: MouseEvent) => {
      offset.current = e.point
    })

    canvas.view.on('mousedrag', (e: MouseEvent) => {
      const rect = new Rectangle(new Point(0, 0), canvas.view.viewSize).expand(
        -10
      )
      const point = canvas.view.projectToView(e.point)
      outside.current = !rect.contains(point)
      const nearest = rect.getNearestPoint(point)
      const distance = round(
        Math.min(Math.max(nearest.getDistance(point), 0), 7)
      )
      if (outside.current) {
        dragEvent.current = new ToolEvent(tool, 'mouseviewdrag', e)
        Object.assign(dragEvent.current, e, {
          count: distance,
          type: 'mouseviewdrag',
          downPoint: downPoint.current,
          delta: new Point(
            point.x < rect.x ? -distance : point.x > rect.width ? distance : 0,
            point.y < rect.y ? -distance : point.y > rect.height ? distance : 0
          ).divide(canvas.view.zoom)
        })
      }
    })

    canvas.view.on('mouseup', () => {
      scrollDragDirection.current = null
      outside.current = false
    })

    canvas.view.on('mousedown', (e: ToolEvent) => {
      downPoint.current = e.point
    })
  }, [canvas])

  useEffect(() => {
    if (!tool) return

    canvas.view.on('frame', (e: any) => {
      if (outside.current) {
        canvas.view.center = canvas.view.center.add(dragEvent.current.delta)
        dragEvent.current.point = dragEvent.current.point.add(
          dragEvent.current.delta
        )

        canvas.tool && canvas.tool.onMouseDrag(dragEvent.current)
      }
    })

    tool.onMouseDown = () => {
      setGlobalCursor(Grabbing)
    }

    tool.onMouseDrag = (e: ToolEvent) => {
      const offset = e.downPoint.subtract(e.point)
      canvas.view.center = canvas.view.center.add(offset)
    }

    tool.onMouseUp = () => {
      clearGlobalCursor(Grabbing)
    }
  }, [tool])

  useHotkeys(
    {
      keys: 'space',
      down: () => {
        if (tool && tool.mainActived) {
          setCursor(Grab)
          tool.activate()
        }
        return false
      },
      up: () => {
        if (tool && tool.actived) {
          clearGlobalCursor(Grabbing)
          clearCursor(Grab)
          tool.activeMain()
        }
        return false
      }
    },
    [tool]
  )

  useHotkeys(
    {
      keys: 'arrows,shift+arrows',
      down: (_, e: HotKeysEvent) => {
        arrowMove(e)
      }
    },
    [tool]
  )

  useEventListener(
    'wheel',
    (e: WheelEvent) => {
      wheelMove(e)
    },
    canvas && canvas.view.element
  )

  return <></>
}

ViewTool.displayName = '@yomtor/core/ViewTool'
