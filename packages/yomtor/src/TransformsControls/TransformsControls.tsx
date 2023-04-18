import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ActionIcon, Control, Input, NumberInput, Select } from '@yomtor/ui'
import {
  HeightIcon,
  RadiusIcon,
  RotationIcon,
  UnlinkIcon,
  WidthIcon,
  XAxisIcon,
  YAxisIcon
} from '@yomtor/icons'
import { ChangeFlag, Artboard, Group } from '@yomtor/paper'
import { countBy, find, findKey, isEmpty, size } from 'lodash'
import { round } from '@yomtor/utils'
import { ItemData } from './data'

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
  const { visible: isVisible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [visible, setVisible] = useState<boolean>(isVisible)
  const [x, setX] = useState<number | ''>('')
  const [y, setY] = useState<number | ''>('')
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [angle, setAngle] = useState<number | ''>('')
  const [combo, setCombo] = useState<string>()
  const [disableGroup, setDisabelGroup] = useState<boolean>(false)
  const update = useRef<boolean>(true)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    const group = ItemData.find((item) => item.value === 'group')
    group.disabled = disableGroup
  }, [disableGroup])

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (
        type & (ChangeFlag.ACTIVE | ChangeFlag.MATRIX) &&
        update.current &&
        canvas.project.activeItems.length
      ) {
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

        const disableGroup = countBy(
          canvas.project.activeItems.map(
            (item) => item instanceof Artboard && !item.children.length
          )
        )

        setX(size(x) === 1 ? parseFloat(findKey(x)) : '')
        setY(size(y) === 1 ? parseFloat(findKey(y)) : '')
        setWidth(size(width) === 1 ? parseFloat(findKey(width)) : '')
        setHeight(size(height) === 1 ? parseFloat(findKey(height)) : '')
        setAngle(size(angle) === 1 ? parseFloat(findKey(angle)) : '')
        setDisabelGroup(!!disableGroup.true)
      }
      update.current = true

      if (type & ChangeFlag.ACTIVE) {
        const length = canvas.project.activeItems.length
        setVisible(!!length)

        if (length) {
          const item = canvas.project.activeItems[0]

          const find = ItemData.find((data) => data.label === item.className)

          setCombo(length === 1 && find ? find.value : '')
        }
      }
    })
  }, [canvas])

  const changeHandler = (key: string, value: number, mixed?: boolean) => {
    update.current = false
    canvas.project.activeItems.forEach((item) => {
      if (['x', 'y'].includes(key)) {
        item.info.topLeft[key] =
          item.artboard && !mixed
            ? value + item.artboard.info.topLeft[key]
            : !mixed
            ? value
            : item.info.topLeft[key] + value
      }
      if (['width', 'height'].includes(key)) {
        item.info[key] = !mixed ? value : item.info[key] + value
      }
      if (['angle'].includes(key)) {
        item.info[key] = !mixed ? value : item.info[key] + value
      }
    })
  }

  const classHandler = (value: string) => {
    if (['artboard', 'group'].includes(value)) {
      const types = {
        artboard: Artboard,
        group: Group
      }

      const actives = [...canvas.project.activeItems]

      actives.forEach((item) => {
        const clone = new types[value](item.children)
        item.replaceWith(clone)
        clone.actived = true
      })
    }

    setCombo(value)
  }

  return visible ? (
    <Control>
      {combo && (
        <Control.Title
          title={
            <Select
              data={ItemData}
              value={combo}
              inherit
              onChange={classHandler}
            />
          }
          start={1}
        >
          <></>
        </Control.Title>
      )}
      <Control.Group rowGap={8}>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<XAxisIcon />}
            value={x}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('x', value, mixed)
            }
            mixed={isEmpty(x.toString())}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<YAxisIcon />}
            value={y}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('y', value, mixed)
            }
            mixed={isEmpty(y.toString())}
          />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<WidthIcon />}
            value={width}
            min={1}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('width', value, mixed)
            }
            mixed={isEmpty(width.toString())}
          />
        </Control.Panel>
        <Control.Panel start={16} end={30}>
          <NumberInput
            icon={<HeightIcon />}
            value={height}
            min={1}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('height', value, mixed)
            }
            mixed={isEmpty(height.toString())}
          />
        </Control.Panel>
        <Control.Panel start={32} end={33}>
          <ActionIcon icon={<UnlinkIcon />} />
        </Control.Panel>
        <Control.Panel start={1} end={14}>
          <NumberInput
            icon={<RotationIcon />}
            value={angle}
            onChange={(value: number, mixed: boolean) =>
              changeHandler('angle', value, mixed)
            }
            mixed={isEmpty(angle.toString())}
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
