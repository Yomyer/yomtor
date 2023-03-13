import { DefaultProps, Selectors } from '@yomtor/styles'
import useStyles, { ConstraintsStylesParams } from './Constraints.styles'
import { Constraints } from '@yomtor/paper'

type ConstraintsStylesNames = Selectors<typeof useStyles>

export type ConstraintsType = typeof Constraints.TYPES

export interface ConstraintsProps
  extends DefaultProps<ConstraintsStylesNames, ConstraintsStylesParams> {
  compact?: boolean
  actived?: boolean
  horizontal?: ConstraintsType
  vertical?: ConstraintsType
}
