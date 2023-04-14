import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { Control, Select } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'
import { LayerControlsProps } from './LayerControls.props'
import { countBy, isEmpty } from 'lodash'
import { LayerSelectData } from './data'
import { ConstraintsBarIcon, DropletIcon } from '../../../icons/src/list'
import { Divider } from '@mantine/core'

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
  const [artboard, setArtboard] = useState<boolean>()

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        setActive(canvas.project.activeItems.length > 0)
        const hasArtboard = countBy(
          canvas.project.activeItems.map((item) => item.artboard)
        )

        setArtboard(!isEmpty(hasArtboard) && !hasArtboard.null)
      }
    })
  }, [canvas])

  return artboard || visible ? (
    <Control>
      <Control.Title>Layer</Control.Title>
      <Control.Group columns={11}>
        <Control.Panel start={1} end={8}>
          <Select data={LayerSelectData} icon={<DropletIcon size='sm' />} />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
