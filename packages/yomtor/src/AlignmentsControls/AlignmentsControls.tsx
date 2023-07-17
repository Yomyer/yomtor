import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Control } from '@yomtor/ui'
import { AligmentStartIcon, AligmentCenterIcon } from '@yomtor/icons'
import { Artboard, ChangeFlag, Point } from '@yomtor/paper'
import { countBy, isEmpty } from 'lodash'
import { AlignmentsControlsProps } from './AlignmentsControls.props'

const defaultProps: Partial<AlignmentsControlsProps> = {
  visible: false
}

export const AlignmentsControls = (props: AlignmentsControlsProps) => {
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [active, setActive] = useState<boolean>()

  const clickHandler = (
    position:
      | 'top'
      | 'right'
      | 'left'
      | 'bottom'
      | 'horizontal-center'
      | 'vertical-center'
  ) => {
    if (!canvas) return

    let limits = canvas.project.activatedItems[0]?.artboard?.bounds

    if (canvas.project.activatedCount > 1) {
      limits = canvas.project.selector.bounds
    }

    canvas.project.activatedItems.forEach((item) => {
      switch (position) {
        case 'horizontal-center':
          item.bounds.center.x = limits.center.x
          break
        case 'vertical-center':
          item.bounds.center.y = limits.center.y
          break
        default:
          item.bounds[position] = limits[position]
          break
      }
    })
  }

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        const actives = canvas.project.activatedItems
        console.log('a')
        setActive(
          actives.length > 1 || !!(actives.length === 1 && actives[0].artboard)
        )
      }
    })
  }, [canvas])

  return visible ? (
    <Control>
      <Control.Group columns={11}>
        <Control.Panel start={1} end={2}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('left')}
            icon={<AligmentStartIcon />}
          />
        </Control.Panel>
        <Control.Panel start={3} end={4}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('horizontal-center')}
            icon={<AligmentCenterIcon />}
          />
        </Control.Panel>
        <Control.Panel start={5} end={6}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('right')}
            icon={<AligmentStartIcon flipX />}
          />
        </Control.Panel>
        <Control.Panel start={7} end={8}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('top')}
            icon={<AligmentStartIcon rotate={90} />}
          />
        </Control.Panel>
        <Control.Panel start={9} end={10}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('vertical-center')}
            icon={<AligmentCenterIcon rotate={90} />}
          />
        </Control.Panel>
        <Control.Panel start={11} end={12}>
          <ActionIcon
            disabled={!active}
            onClick={() => clickHandler('bottom')}
            icon={<AligmentStartIcon rotate={90} flipX />}
          />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
