import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Control, Input, NumberInput } from '@yomtor/ui'

import { ChangeFlag, Point } from '@yomtor/paper'
import { countBy, find, findKey, isEmpty, size } from 'lodash'
import { round } from '@yomtor/utils'
import {
  HeightIcon,
  RadiusIcon,
  RotationIcon,
  UnlinkIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon
} from '../../../icons/src/list'

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
  const [x, setX] = useState<number | ''>('')
  const [y, setY] = useState<number | ''>('')
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [angle, setAngle] = useState<number | ''>('')
  const draggingRef = useRef<boolean>(false)

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (
        type & (ChangeFlag.ACTIVE | ChangeFlag.MATRIX) &&
        !draggingRef.current
      ) {
        if (canvas.project.activeItems.length && !draggingRef.current) {
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
          setX(size(x) === 1 ? parseFloat(findKey(x)) : '')
          setY(size(y) === 1 ? parseFloat(findKey(y)) : '')
          setWidth(size(width) === 1 ? parseFloat(findKey(width)) : '')
          setHeight(size(height) === 1 ? parseFloat(findKey(height)) : '')
          setAngle(size(angle) === 1 ? parseFloat(findKey(angle)) : '')
        }
      }
    })
  }, [canvas])

  const changeHandler = (key: string, value: number) => {
    canvas.project.activeItems.forEach((item) => {
      if (['x', 'y'].includes(key)) {
        console.log(value)
        item.info.topLeft[key] = item.artboard
          ? value + item.artboard.info.topLeft[key]
          : value
      }
      if (['width', 'height'].includes(key)) {
        item.info[key] = value
      }
      if (['angle'].includes(key)) {
        item.info[key] = value
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
            draggingRef={draggingRef}
            mixed={isEmpty(x.toString())}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<YAxisIcon />}
            value={y}
            onChange={(value: number) => changeHandler('y', value)}
            draggingRef={draggingRef}
          />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<WidthIcon />}
            value={width}
            min={1}
            onChange={(value: number) => changeHandler('width', value)}
            draggingRef={draggingRef}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<HeightIcon />}
            value={height}
            min={1}
            onChange={(value: number) => changeHandler('height', value)}
            draggingRef={draggingRef}
          />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon icon={<UnlinkIcon />} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<RotationIcon />}
            value={angle}
            onChange={(value: number) => changeHandler('angle', value)}
            draggingRef={draggingRef}
          />
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
