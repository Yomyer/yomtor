import { ZoomControlsProps } from './ZoomControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'

const defaultProps: Partial<ZoomControlsProps> = {
  factor: 8,
  pixelGrid: true
}

export const ZoomControls = (props: ZoomControlsProps) => {
  const {} = useComponentDefaultProps('ZoomControls', defaultProps, props)
  const { canvas } = useEditorContext()

  return <></>
}
