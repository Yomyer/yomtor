import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, NumberInput, Select } from '@yomtor/ui'
import { BlendMode, ChangeFlag } from '@yomtor/paper'
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

  const blendModeHandler = (value: typeof BlendMode.MODES & 'start') => {
    isString(value) && value !== 'start' && value !== 'normal'
      ? setDropFilled(true)
      : setDropFilled(false)

    canvas.project.activeItems.forEach((item) => (item.blendMode = value))
  }

  const opacityHandler = (value: number) => {
    canvas.project.activeItems.forEach(
      (item) => (item.opacity = value / OPACITY_MULTIPLIER)
    )

    setOpacity(value)
  }

  const visibilityHandler = (value) => {
    setVisibility(!value)
    canvas.project.activeItems.forEach((item) => (item.visible = !value))
  }

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
            onChange={blendModeHandler}
          />
        </Control.Panel>
        <Control.Panel start={22} end={31}>
          <NumberInput
            value={opacity}
            max={100}
            min={0}
            onChange={opacityHandler}
            mixed={isEmpty(opacity.toString())}
            parser={(value) => {
              return value.replace(/[^(\d)]/g, '')
            }}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value)) ? `${value}%` : '100%'
            }
          />
        </Control.Panel>
        <Control.Panel start={32} end={32}>
          <ActionIcon
            icon={visibility ? <EyeIcon /> : <EyeClosedIcon />}
            onClick={() => visibilityHandler(visibility)}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
