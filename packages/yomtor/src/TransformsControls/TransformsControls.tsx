import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, Input } from '@yomtor/ui'
import {
  HeightIcon,
  RadiusIcon,
  RotationIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon
} from '@yomtor/icons'

const defaultProps: Partial<TransformsControlsProps> = {
  visible: false
}

export const TransformsControls = (props: TransformsControlsProps) => {
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()

  return visible ? (
    <Control>
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <Input icon={<XAxisIcon />} />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <Input icon={<YAxisIcon />} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <Input icon={<WidthIcon />} />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <Input icon={<HeightIcon />} />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon icon={<RotationIcon />} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <Input icon={<RotationIcon />} />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <Input icon={<RadiusIcon />} />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon icon={<RotationIcon />} />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
