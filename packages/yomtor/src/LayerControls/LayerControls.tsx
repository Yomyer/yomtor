import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, NumberInput, Select } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'
import { LayerControlsProps } from './LayerControls.props'
import { countBy, findKey, isEmpty, isNumber, isString, size } from 'lodash'
import { LayerSelectData } from './data'
import {
  DropletFilledIcon,
  DropletIcon,
  EyeClosedIcon,
  EyeIcon
} from '../../../icons/src/list'

const OPACITY_MULTIPLIER = 100

const defaultProps: Partial<LayerControlsProps> = {
  visible: false
}

export const LayerControls = (props: LayerControlsProps) => {
  const { visible: isVisible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [visible, setVisible] = useState<boolean>(isVisible)
  const [artboard, setArtboard] = useState<boolean>()
  const [opacity, setOpacity] = useState<number | ''>('')
  const [visibility, setVisibility] = useState<boolean | ''>('')
  const [dropFilled, setDropFilled] = useState<boolean>(false)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        setVisible(canvas.project.activeItems.length > 0)

        const opacity = countBy(
          canvas.project.activeItems.map(
            (item) => item.opacity * OPACITY_MULTIPLIER
          )
        )

        const visibility = countBy(
          canvas.project.activeItems.map((item) => item.visible)
        )

        const hasArtboard = countBy(
          canvas.project.activeItems.map((item) => item.artboard)
        )

        setOpacity(size(opacity) === 1 ? parseFloat(findKey(opacity)) : '')
        setVisibility(
          size(visibility) === 1 ? findKey(visibility) === 'true' : ''
        )
        setArtboard(!isEmpty(hasArtboard) && !hasArtboard.null)
      }
    })
  }, [canvas])

  const changeHandler = (
    property: 'blendMode' | 'opacity' | 'visibility',
    value: string | number
  ) => {
    isString(value) && value !== 'start' && value !== 'normal'
      ? setDropFilled(true)
      : setDropFilled(false)
    canvas.project.activeItems.forEach((item) => (item[property] = value))
  }

  const clickHandler = (value) => {
    setVisibility(!value)
    canvas.project.activeItems.forEach((item) => (item.visible = !value))
  }
  console.log(opacity)
  return artboard || visible ? (
    <Control>
      <Control.Title title={<>Layer</>} />
      <Control.Group>
        <Control.Panel start={1} end={21}>
          <Select
            data={LayerSelectData}
            defaultValue='start'
            icon={
              dropFilled ? (
                <DropletFilledIcon size='sm' />
              ) : (
                <DropletIcon size='sm' />
              )
            }
            onChange={(value) => changeHandler('blendMode', value)}
          />
        </Control.Panel>
        <Control.Panel start={22} end={31}>
          <NumberInput
            value={opacity}
            max={100}
            min={0}
            onChange={(value: number) => {
              // setNumberValue(value)
              changeHandler('opacity', value / OPACITY_MULTIPLIER)
            }}
            mixed={isEmpty(opacity.toString())}
            /*
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '$ '
            }
            */
            // rightSection={<div style={{ fontSize: '11px' }}>%</div>}
          />
        </Control.Panel>
        <Control.Panel start={32} end={32}>
          <ActionIcon
            icon={visibility ? <EyeIcon /> : <EyeClosedIcon />}
            onClick={() => clickHandler(visibility)}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
