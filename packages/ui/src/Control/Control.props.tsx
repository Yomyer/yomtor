import { Selectors, DefaultProps } from '@yomtor/styles'
import useStyles, { ControlStylesParams } from './Control.styles'
import { ReactNode } from 'react'

type ControlStylesNames = Selectors<typeof useStyles>

export interface ControlProps
  extends DefaultProps<ControlStylesNames, ControlStylesParams> {
  children?: ReactNode
}
