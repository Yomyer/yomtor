import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control, Input } from '@yomtor/ui'
import {
  AlignBoxBottomIcon,
  AlignBoxCenterIcon,
  AlignBoxLeftIcon,
  AlignBoxRightIcon,
  AlignBoxTopIcon
} from '@yomtor/icons'
import { ChangeFlag } from '@yomtor/paper'
import { countBy, find, findKey, size } from 'lodash'
import { round } from '@yomtor/utils'
import { AlignmentsControlsProps } from './AlignmentsControls.props'

const defaultProps: Partial<AlignmentsControlsProps> = {
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

export const AlignmentsControls = (props: AlignmentsControlsProps) => {
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
        setX(size(x) === 1 ? findKey(x) : 'Mixed')
        setY(size(y) === 1 ? findKey(y) : 'Mixed')
        setWidth(size(width) === 1 ? findKey(width) : 'Mixed')
        setHeight(size(height) === 1 ? findKey(height) : 'Mixed')
        setAngle(size(angle) === 1 ? findKey(angle) : 'Mixed')
      }
    })
  }, [canvas])

  return (
    <Control>
      <Control.Group columns={10}>
        <Control.Panel start={1} end={2}>
          <ActionIcon icon={<AlignBoxLeftIcon />} />
        </Control.Panel>
        <Control.Panel start={3} end={4}>
          <ActionIcon icon={<AlignBoxBottomIcon />} />
        </Control.Panel>
        <Control.Panel start={5} end={6}>
          <ActionIcon icon={<AlignBoxCenterIcon />} />
        </Control.Panel>
        <Control.Panel start={7} end={8}>
          <ActionIcon icon={<AlignBoxTopIcon />} />
        </Control.Panel>
        <Control.Panel start={9} end={10}>
          <ActionIcon icon={<AlignBoxRightIcon />} />
        </Control.Panel>
      </Control.Group>
    </Control>
  )
}
