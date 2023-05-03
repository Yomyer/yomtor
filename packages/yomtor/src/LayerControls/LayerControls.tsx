import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, NumberInput, Select } from '@yomtor/ui'
import { ChangeFlag } from '@yomtor/paper'
import { LayerControlsProps } from './LayerControls.props'
import { countBy, isEmpty, isNumber, isString } from 'lodash'
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
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [active, setActive] = useState<boolean>()
  const [artboard, setArtboard] = useState<boolean>()
  const [numberValue, setNumberValue] = useState<number>(OPACITY_MULTIPLIER)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [dropFilled, setDropFilled] = useState<boolean>(false)

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
    setIsVisible(!value)
    canvas.project.activeItems.forEach((item) => (item.visible = !value))
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
            value={numberValue > 100 ? 100 : numberValue}
            max={100}
            min={0}
            onChange={(value: number) => {
              setNumberValue(value)
              changeHandler('opacity', value / OPACITY_MULTIPLIER)
            }}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '$ '
            }
            // rightSection={<div style={{ fontSize: '11px' }}>%</div>}
          />
        </Control.Panel>
        <Control.Panel start={32} end={32}>
          <ActionIcon
            icon={isVisible ? <EyeIcon /> : <EyeClosedIcon />}
            onClick={() => clickHandler(isVisible)}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
