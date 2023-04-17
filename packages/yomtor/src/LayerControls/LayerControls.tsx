import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, NumberInput, Select } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'
import { LayerControlsProps } from './LayerControls.props'
import { countBy, isEmpty } from 'lodash'
import { LayerSelectData } from './data'
import {
  ConstraintsBarIcon,
  DropletIcon,
  EyeIcon,
  XAxisIcon
} from '../../../icons/src/list'
import { Divider } from '@mantine/core'
import { Item } from 'paper/dist/paper-core'

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
  const [numberValue, setNumberValue] = useState<number>(100)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const changeHandler = (
    property: 'blendMode' | 'opacity' | 'visibility',
    value
  ) => canvas.project.activeItems.forEach((item) => (item[property] = value))

  const clickHandler = (value) => {
    setIsVisible(!value)
    canvas.project.activeItems.forEach((item) => (item.visible = value))
  }

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
      <Control.Group columns={32}>
        <Control.Panel start={1} end={18}>
          <Select
            data={LayerSelectData}
            icon={<DropletIcon size='sm' />}
            onChange={(value) => changeHandler('blendMode', value)}
          />
        </Control.Panel>
        <Control.Panel start={19} end={30}>
          <NumberInput
            value={numberValue}
            max={100}
            min={0}
            onChange={(value: number) => changeHandler('opacity', value)}
          />
        </Control.Panel>
        <Control.Panel start={31} end={32}>
          <ActionIcon
            icon={isVisible ? <EyeIcon /> : <XAxisIcon />}
            onClick={() => clickHandler(isVisible)}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
