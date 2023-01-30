import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ViewToolProps } from './ViewTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import { Point, Tool, ToolEvent, MouseEvent, Rectangle } from '@yomtor/paper'
import { HotKeysEvent, useEventListener, useHotkeys } from '@yomtor/hooks'
import {
  clearCursor,
  clearGlobalCursor,
  Grab,
  Grabbing,
  setCursor,
  setGlobalCursor
} from '@yomtor/cursors'

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

  const wheelMove = useCallback(
    (e: WheelEvent) => {
      if (tool && !tool.paused) {
        const point = new canvas.Point(e.deltaX, e.deltaY).divide(factor)

        canvas.view.center = canvas.view.center.add(
          point.divide(canvas.view.zoom)
        )
      }
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
    setTool(canvas.createTool('View'))

    canvas.view.on('mousemove', (e: MouseEvent) => {
      offset.current = e.point
    })

    canvas.view.on('mousedrag', (e: MouseEvent) => {
      const rect = new Rectangle(new Point(0, 0), canvas.view.viewSize).expand(
        -5
      )

      const point = canvas.view.projectToView(e.point)
      const inside = rect.contains(point)

      dragEvent.current = e as unknown as ToolEvent
      dragEvent.current.downPoint = downPoint.current

      scrollDragDirection.current = null

      if (!inside) {
        scrollDragDirection.current = new Point(
          point.x < rect.x ? -1 : point.x > rect.width ? 1 : 0,
          point.y < rect.y ? -1 : point.y > rect.height ? 1 : 0
        )

        canvas.view.center = canvas.view.center.add(
          scrollDragDirection.current.multiply(1).divide(canvas.view.zoom)
        )
      }
    })

    canvas.view.on('mouseup', () => {
      scrollDragDirection.current = null
    })

    canvas.view.on('mousedown', (e: ToolEvent) => {
      downPoint.current = e.point
    })
  }, [canvas])

  useEffect(() => {
    if (!tool) return

    canvas.view.on('frame', (e: any) => {
      if (!(e.count % 1) && !tool.actived) {
        setTimeout(() => {
          if (scrollDragDirection.current) {
            const delta = scrollDragDirection.current
              .multiply(factor)
              .divide(canvas.view.zoom)
            const point = dragEvent.current.point.add(delta)

            dragEvent.current.point = point
            dragEvent.current.delta = delta

            canvas.project.removeOn('mousedrag')

            canvas.view.emit('mousedrag', dragEvent.current)

            canvas.view.handleMouseEvent('mousedrag', dragEvent.current, point)
          }
        })
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
