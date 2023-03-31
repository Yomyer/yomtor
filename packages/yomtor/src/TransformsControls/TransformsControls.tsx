import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, Input } from '@yomtor/ui'
import {
  HeightIcon,
  RadiusIcon,
  RotationIcon,
  UnlinkIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon
} from '@yomtor/icons'
import { ChangeFlag } from '@yomtor/paper'
import { countBy, find, findKey, size } from 'lodash'

const defaultProps: Partial<TransformsControlsProps> = {
  visible: false
}

type Data = {
  x: number | string
  y: number | string
  width: number | string
  height: number | string
  angle: number | string
  radius: number | string
}

export const TransformsControls = (props: TransformsControlsProps) => {
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [data, setData] = useState<Partial<Data>>({})

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & (ChangeFlag.ACTIVE | ChangeFlag.GEOMETRY)) {
        const x = countBy(
          canvas.project.activeItems.map((item) => item.activeInfo.topLeft.x)
        )
        setData({
          x: size(x) === 1 ? findKey(x) : 'multiple'
        })
      }
    })
  }, [canvas])

  return visible ? (
    <Control>
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <Input icon={<XAxisIcon />} value={data.x} />
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
          <ActionIcon icon={<UnlinkIcon />} />
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
