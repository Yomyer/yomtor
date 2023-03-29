import { Selectors, DefaultProps } from '@yomtor/styles'
import { ReactNode } from 'react'
import useStyles, { GroupStylesParams } from './Group.styles'

type GroupStylesNames = Selectors<typeof useStyles>

export interface GroupProps
  extends DefaultProps<GroupStylesNames, GroupStylesParams> {
  children: ReactNode
  gap?: number
  rowGap?: number
  columnGap?: number
  columns?: number
}
