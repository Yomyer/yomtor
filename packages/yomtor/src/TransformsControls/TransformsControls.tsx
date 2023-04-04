import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ActionIcon, Control, Input, NumberInput } from '@yomtor/ui'
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
  const [x, setX] = useState<number>()
  const [y, setY] = useState<number>()
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [angle, setAngle] = useState<number>()

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & (ChangeFlag.ACTIVE | ChangeFlag.MATRIX)) {
        const x = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.info.topLeft.x -
                (item.artboard && item.artboard.info.topLeft.x),
              2
            )
          )
        )
        const y = countBy(
          canvas.project.activeItems.map((item) =>
            round(
              item.info.topLeft.y -
                (item.artboard && item.artboard.info.topLeft.y),
              2
            )
          )
        )
        const width = countBy(
          canvas.project.activeItems.map((item) => round(item.info.width, 2))
        )
        const height = countBy(
          canvas.project.activeItems.map((item) => round(item.info.height, 2))
        )
        const angle = countBy(
          canvas.project.activeItems.map((item) => round(item.info.angle, 2))
        )
        setX(size(x) === 1 ? parseFloat(findKey(x)) : 0)
        /*
        setY(size(y) === 1 ? findKey(y) : 'Mixeda')
        setWidth(size(width) === 1 ? findKey(width) : 'Mixeda')
        setHeight(size(height) === 1 ? findKey(height) : 'Mixeda')
        setAngle(size(angle) === 1 ? findKey(angle) : 'Mixeda')
        */
      }
    })
  }, [canvas])

  const changeHandler = (key: string, value: number) => {
    canvas.project.activeItems.forEach((item) => {
      if (['x', 'y'].includes(key)) {
        if (item.artboard) {
          value += item.artboard.info.topLeft[key]
        }
        console.log(value)
        item.info.topLeft[key] = value
      }
    })
  }

  return visible ? (
    <Control>
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<XAxisIcon />}
            value={x}
            onChange={(value: number) => changeHandler('x', value)}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
