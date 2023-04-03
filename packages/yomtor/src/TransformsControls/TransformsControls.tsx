import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
import { round } from '@yomtor/utils'

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
  const [x, setX] = useState<number | string>()
  const [y, setY] = useState<number | string>()
  const [width, setWidth] = useState<number | string>()
  const [height, setHeight] = useState<number | string>()
  const [angle, setAngle] = useState<number | string>()

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & (ChangeFlag.ACTIVE | ChangeFlag.MATRIX)) {
        const x = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.activeInfo.topLeft.x -
                (item.artboard && item.artboard.activeInfo.topLeft.x),
              2
            )
          )
        )
        const y = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.activeInfo.topLeft.y -
                (item.artboard && item.artboard.activeInfo.topLeft.y),
              2
            )
          )
        )
        const width = countBy(
          canvas.project.activeItems.map((item) =>
            round(item.activeInfo.width, 2)
          )
        )
        const height = countBy(
          canvas.project.activeItems.map((item) =>
            round(item.activeInfo.height, 2)
          )
        )
        const angle = countBy(
          canvas.project.activeItems.map((item) =>
            round(item.activeInfo.angle, 2)
          )
        )
        setX(size(x) === 1 ? findKey(x) : 'Mixeda')
        setY(size(y) === 1 ? findKey(y) : 'Mixeda')
        setWidth(size(width) === 1 ? findKey(width) : 'Mixeda')
        setHeight(size(height) === 1 ? findKey(height) : 'Mixeda')
        setAngle(size(angle) === 1 ? findKey(angle) : 'Mixeda')
      }
    })
  }, [canvas])

  const changeHandler = (key: string, value: string) => {
    canvas.project.activeItems.forEach((item) => {
      if (['x', 'y'].includes(key)) {
        console.log(value)
        item.position[key] = value
      }
    })
  }

  return visible ? (
    <Control>
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <Input
            icon={<XAxisIcon />}
            defaultValue={x}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              changeHandler('x', event.currentTarget.value)
            }
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <Input icon={<YAxisIcon />} defaultValue={y} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <Input icon={<WidthIcon />} defaultValue={width} />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <Input icon={<HeightIcon />} defaultValue={height} />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon icon={<UnlinkIcon />} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <Input icon={<RotationIcon />} defaultValue={angle} />
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
