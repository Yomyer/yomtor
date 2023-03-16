import { createStyles } from '@yomtor/styles'
import { PanelProps } from './Panel.props'

export interface PanelStylesParams {
  span: number
}

export default createStyles((theme, { span }: PanelStylesParams) => ({
  root: {
    gridColumnEnd: `span ${span}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))
