import { ZoomControlsProps } from './ZoomControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'

const defaultProps: Partial<ZoomControlsProps> = {
  zoom: 1
}

export const ZoomControls = (props: ZoomControlsProps) => {
  const { zoom: zoomProp } = useComponentDefaultProps(
    'ZoomControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [zoom, setZoom] = useState<number>(zoomProp)

  useEffect(() => {
    if (!canvas) return
    canvas.view.on('zoom', ({ zoom }) => {
      setZoom(zoom)
    })
  }, [canvas])

  useEffect(() => {
    setZoom(zoom)
  }, [zoom])

  return <>{zoom}</>
}
