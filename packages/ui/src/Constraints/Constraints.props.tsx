import { DefaultProps, Selectors } from '@yomtor/styles'
import useStyles, { ConstraintsStylesParams } from './Constraints.styles'
import { Constraints } from '@yomtor/paper'

type ConstraintsStylesNames = Selectors<typeof useStyles>

export type ConstraintPositions = typeof Constraints.POSITIONS

export type ConstraintDirections = 'vertical' | 'horizontal'
export interface ConstraintsProps
  extends DefaultProps<ConstraintsStylesNames, ConstraintsStylesParams> {
  compact?: boolean
  actived?: boolean
  horizontal?: ConstraintPositions
  vertical?: ConstraintPositions
  onChange?: (
    direction: ConstraintDirections,
    position: ConstraintPositions
  ) => void
}
