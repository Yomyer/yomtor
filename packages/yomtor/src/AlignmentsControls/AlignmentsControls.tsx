import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control } from '@yomtor/ui'
import { AligmentStartIcon, AligmentCenterIcon } from '@yomtor/icons'
import { ChangeFlag, Point } from '@yomtor/paper'
import { countBy, isEmpty } from 'lodash'
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
  const [artboard, setArtboard] = useState<boolean>()

  const align = (position) => {
    if (!canvas) return

    canvas.project.activeItems.forEach((item) => {
      const { activeInfo } = item.artboard

      switch (position) {
        case 'horizontal-center':
          item.bounds.center.x = activeInfo.center.x
          break
        case 'vertical-center':
          item.bounds.center.y = activeInfo.center.y
          break
        default:
          item.bounds[position] = activeInfo[position]
          break
      }
    })
  }

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        const hasArtboard = countBy(
          canvas.project.activeItems.map((item) => item.artboard)
        )

        setArtboard(!isEmpty(hasArtboard) && !hasArtboard.null)
      }
    })
  }, [canvas])

  return visible ? (
    <Control>
      <Control.Group columns={11}>
        <Control.Panel start={1} end={2}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('left')}
            icon={<AligmentStartIcon />}
          />
        </Control.Panel>
        <Control.Panel start={3} end={4}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('horizontal-center')}
            icon={<AligmentCenterIcon />}
          />
        </Control.Panel>
        <Control.Panel start={5} end={6}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('right')}
            icon={<AligmentStartIcon flipX />}
          />
        </Control.Panel>
        <Control.Panel start={7} end={8}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('top')}
            icon={<AligmentStartIcon rotate={90} />}
          />
        </Control.Panel>
        <Control.Panel start={9} end={10}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('vertical-center')}
            icon={<AligmentCenterIcon rotate={90} />}
          />
        </Control.Panel>
        <Control.Panel start={11} end={12}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('bottom')}
            icon={<AligmentStartIcon rotate={90} flipX />}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
