import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { Control } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'
import { LayerControlsProps } from './LayerControls.props'
import { Select } from '@mantine/core'

const defaultProps: Partial<LayerControlsProps> = {
  visible: false
}

export const LayerControls = (props: LayerControlsProps) => {
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [active, setActive] = useState<boolean>()

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        setActive(canvas.project.activeItems.length > 0)
      }
    })
  }, [canvas])

  return visible ? (
    <Control>
      <Control.Title>Layer</Control.Title>
      <Control.Group columns={11}>
        <Control.Panel start={4} end={32}>
          <Select data={[]} />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
