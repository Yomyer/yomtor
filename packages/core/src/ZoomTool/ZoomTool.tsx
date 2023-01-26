import { ZoomToolProps } from './ZoomTool.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '../Editor.context'
import React, { useCallback, useEffect, useState } from 'react'
import { Tool, Grid } from '@yomtor/paper'
import { useEventListener, useHotkeys } from '@yomtor/hooks'

const defaultProps: Partial<ZoomToolProps> = {
  factor: 8,
  pixelGrid: true
}

export const ZoomTool = (props: ZoomToolProps) => {
  const { factor, pixelGrid } = useComponentDefaultProps(
    'ZoomTool',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [tool, setTool] = useState<Tool>()
  const [zoom, setZoom] = useState<number>()

  const wheelZoom = useCallback(
    (e: WheelEvent) => {
      if (!tool) return

      if (e.metaKey) {
        canvas.getTool('View').paused = true
        tool.activate()

        const oldZoom = canvas.view.zoom
        const oldCenter = canvas.view.center

        const mousePosition = canvas.view.viewToProject(
          new canvas.Point(e.offsetX, e.offsetY)
        )

        const reverse = 1 - 1 / factor
        const newZoom = e.deltaY > 0 ? oldZoom * reverse : oldZoom / reverse
        canvas.view.zoom = newZoom

        canvas.view.center = canvas.view.center.add(
          mousePosition.subtract(oldCenter).multiply(1 - oldZoom / newZoom)
        )

        setZoom(newZoom)
      } else {
        tool.activeMain()
      }
    },
    [tool]
  )

  useEffect(() => {
    if (!canvas) return
    setTool(canvas.createTool('Zoom'))
    canvas.project.setGrid({ actived: pixelGrid })
  }, [canvas, pixelGrid])

  useEffect(() => {
    if (!zoom) return
    canvas.view.emit('zoom', { zoom })
  }, [zoom])

  useHotkeys(
    {
      keys: '*+cmd',
      down: () => {},
      up: () => {
        if (tool && tool.actived) {
          tool.activeMain()
          canvas.getTool('View').paused = false
        }
        return false
      }
    },
    [tool]
  )

  useEventListener(
    'wheel',
    (e: WheelEvent) => {
      wheelZoom(e)
    },
    canvas && canvas.view.element
  )

  return (
    <>
      <button>{zoom}</button>
    </>
  )
}
