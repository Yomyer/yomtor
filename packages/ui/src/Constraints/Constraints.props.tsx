import { YomtorStyleSystemSize, DefaultProps, Selectors } from '@yomtor/styles'
import useStyles from './Constraints.styles'
import { Constraints } from '@yomtor/paper'

type ConstraintsStylesNames = Selectors<typeof useStyles>

export type ConstraintsType = Lowercase<
  keyof Omit<typeof Constraints, 'prototype'>
>

const a: ConstraintsType = 'scale'

export interface ConstraintsProps
  extends Omit<DefaultProps<ConstraintsStylesNames>, YomtorStyleSystemSize> {
  compact?: boolean
  actived?: boolean
  horizontal?: ConstraintsType
  vertical?: ConstraintsType
}
