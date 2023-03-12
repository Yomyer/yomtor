import { ConstraintsControlsProps } from './ConstraintsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Constraints } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'

const defaultProps: Partial<ConstraintsControlsProps> = {
  zoom: 1
}

export const ConstraintsControls = (props: ConstraintsControlsProps) => {
  const {} = useComponentDefaultProps('ObjectControls', defaultProps, props)
  const { canvas } = useEditorContext()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!canvas) return
    setData(canvas.project.activeLayer.children)

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
      }
    })
    // canvas.project.
  }, [canvas])

  return <Constraints></Constraints>
}
