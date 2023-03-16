import { Selectors, DefaultProps } from '@yomtor/styles'
import { ReactNode } from 'react'
import useStyles, { PanelStylesParams } from './Panel.styles'

type PanelStylesNames = Selectors<typeof useStyles>

export interface PanelProps
  extends DefaultProps<PanelStylesNames, PanelStylesParams> {
  children: ReactNode
  span?: number
}
