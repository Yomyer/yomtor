import { Selectors, DefaultProps } from '@yomtor/styles'
import { ReactNode } from 'react'
import useStyles, { TitleStylesParams } from './Title.styles'

type TitleStylesNames = Selectors<typeof useStyles>

export interface TitleProps
  extends DefaultProps<TitleStylesNames, TitleStylesParams> {
  children?: ReactNode
  title?: ReactNode
  start?: number
  end?: number
}
