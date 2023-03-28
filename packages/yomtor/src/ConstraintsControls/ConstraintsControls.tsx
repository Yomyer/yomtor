import { ConstraintsControlsProps } from './ConstraintsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ConstraintDirections,
  ConstraintPositions,
  Constraints as ConstraintsBase,
  Control
} from '@yomtor/ui'
import { Artboard, ChangeFlag, Constraints } from '@yomtor/paper'
import { countBy } from 'lodash'

const defaultProps: Partial<ConstraintsControlsProps> = {
  visible: false
}

export const ConstraintsControls = (props: ConstraintsControlsProps) => {
  const { visible } = useComponentDefaultProps(
    'ObjectControls',
    defaultProps,
    props
  )
  const { canvas } = useEditorContext()
  const [constraints, setConstraints] = useState<Constraints>(
    new Constraints(['start'])
  )
  const [artboard, setArtboard] = useState<boolean>()

  const changeHandler = (
    direction: ConstraintDirections,
    position: ConstraintPositions
  ) => {
    canvas &&
      canvas.project.activeItems.forEach((item) => {
        item.constraints[direction] = position
      })

    constraints[direction] = position
    setConstraints(new Constraints(constraints))
  }

  useEffect(() => {
    if (!canvas) return

    canvas.project.on('changed', (type) => {
      if (type & ChangeFlag.ACTIVE) {
        const vertical = countBy(
          canvas.project.activeItems.map((item) => item.constraints.vertical)
        )
        const horizontal = countBy(
          canvas.project.activeItems.map((item) => item.constraints.horizontal)
        )

        const hasArtboard = countBy(
          canvas.project.activeItems.map((item) => item.artboard)
        )

        setArtboard(!hasArtboard || !hasArtboard.null)

        setConstraints(
          new Constraints([
            Object.keys(horizontal).length === 1
              ? Object.keys(horizontal)[0]
              : 'mixed',
            Object.keys(vertical).length === 1
              ? Object.keys(vertical)[0]
              : 'mixed'
          ])
        )
      }
    })
  }, [canvas])

  return (constraints && artboard) || visible ? (
    <Control>
      <Control.Title>Constraints</Control.Title>
      <Control.Group>
        <Control.Panel>
          <ConstraintsBase {...constraints} onChange={changeHandler} />
        </Control.Panel>
      </Control.Group>
    </Control>
  ) : null
}
