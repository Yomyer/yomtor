import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control } from '@yomtor/ui'
import { AligmentStartIcon, AligmentCenterIcon } from '@yomtor/icons'
import { ChangeFlag } from '@yomtor/paper'
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

  const align = (position: 'left' | 'right' | 'center' | 'bottom' | 'top') => {
    canvas &&
      canvas.project.activeItems.forEach((item) => {
        item.bounds[position] = item.artboard.activeInfo[position]
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
            onClick={() => align('center')}
            icon={<AligmentCenterIcon />}
          />
        </Control.Panel>
        <Control.Panel start={5} end={6}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('center')}
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
            onClick={() => align('right')}
            icon={<AligmentCenterIcon rotate={90} />}
          />
        </Control.Panel>
        <Control.Panel start={11} end={12}>
          <ActionIcon
            disabled={!artboard}
            onClick={() => align('right')}
            icon={<AligmentStartIcon rotate={90} flipX />}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
