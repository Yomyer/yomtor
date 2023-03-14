import { ConstraintsControlsProps } from './ConstraintsControls.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { useEditorContext } from '@yomtor/core'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ConstraintDirections,
  ConstraintPositions,
  Constraints as ConstraintsBase
} from '@yomtor/ui'
import { ChangeFlag, Constraints } from '@yomtor/paper'
import { countBy } from 'lodash'

const defaultProps: Partial<ConstraintsControlsProps> = {
  zoom: 1
}

export const ConstraintsControls = (props: ConstraintsControlsProps) => {
  const {} = useComponentDefaultProps('ObjectControls', defaultProps, props)
  const { canvas } = useEditorContext()
  const [constraints, setConstraints] = useState<Constraints>()

  const changeHandler = (
    direction: ConstraintDirections,
    position: ConstraintPositions
  ) => {
    canvas.project.activeItems.forEach((item) => {
      item.constraints[direction] = position
      constraints[direction] = position

      setConstraints(new Constraints(constraints))
    })
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
    // canvas.project.
  }, [canvas])

  return <ConstraintsBase {...constraints} onChange={changeHandler} />
}
