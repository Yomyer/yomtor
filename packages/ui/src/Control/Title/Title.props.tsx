import { Selectors, DefaultProps } from '@yomtor/styles'
import useStyles, { TitleStylesParams } from './Title.styles'

type TitleStylesNames = Selectors<typeof useStyles>

export interface TitleProps
  extends DefaultProps<TitleStylesNames, TitleStylesParams> {}
