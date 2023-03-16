import { Selectors, DefaultProps } from '@yomtor/styles'
import useStyles, { RowStylesParams } from './Row.styles'

type RowStylesNames = Selectors<typeof useStyles>

export interface RowProps
  extends DefaultProps<RowStylesNames, RowStylesParams> {}
