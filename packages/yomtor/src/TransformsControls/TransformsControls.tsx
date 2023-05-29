import { TransformsControlsProps } from './TransformsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useRef, useState } from 'react'
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
import { ChangeFlag, Artboard, Group, Size, Item } from '@yomtor/paper'
import { countBy, find, findKey, isEmpty, size } from 'lodash'
import { round } from '@yomtor/utils'
import { ItemData } from './data'
import { SelectItem } from '@mantine/core'

const defaultProps: Partial<TransformsControlsProps> = {
  visible: false
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

        const combo = countBy(
          canvas.project.activeItems.map((item) => item.className)
        )

        ItemData.forEach((item) => delete item.selected)

        setX(size(x) === 1 ? parseFloat(findKey(x)) : '')
        setY(size(y) === 1 ? parseFloat(findKey(y)) : '')
        setWidth(size(width) === 1 ? parseFloat(findKey(width)) : '')
        setHeight(size(height) === 1 ? parseFloat(findKey(height)) : '')
        setAngle(size(angle) === 1 ? parseFloat(findKey(angle)) : '')
        setDisabelGroup(!!disableGroup.true)
        setCombo(
          size(combo) === 1
            ? ItemData.find((data) => data.label === findKey(combo))?.value
            : null
        )
      }
      update.current = true

      if (type & ChangeFlag.ACTIVE) {
        setVisible(!!canvas.project.activeItems.length)
      }
      if (type & ChangeFlag.MATRIX) {
        const s = countBy(
          canvas.project.activeItems.map(
            (item) =>
              `${round(item.info.width, 2)}x${round(item.info.height, 2)}`
          )
        )

        ItemData.filter((item) => item.right).forEach(
          (item) => delete item.selected
        )

        const sizeSelected = ItemData.find((data) => findKey(s) === data.right)
        if (sizeSelected) {
          sizeSelected.selected = true
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
    const actives = [...canvas.project.activeItems]

    let size: Size
    const regex = /^(\d+)x(\d+)/
    if (regex.exec(value)) {
      const match = regex.exec(value)
      size = new Size(parseInt(match[1]), parseInt(match[2]))
      value = 'artboard'
    }

    if (['artboard', 'group'].includes(value)) {
      const types = {
        artboard: Artboard,
        group: Group
      }

      actives.forEach((item) => {
        let clone: Item
        if (item.className !== types[value].prototype.className) {
          clone = new types[value](item.children)
          item.replaceWith(clone)
          clone.actived = true
        } else {
          clone = item
        }

        if (size) {
          clone.info.width = size.width
          clone.info.height = size.height
        }
      })

      setCombo(value)
    }
  }

  return visible ? (
    <Control>
      {combo && (
        <Control.Title
          end={14}
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
