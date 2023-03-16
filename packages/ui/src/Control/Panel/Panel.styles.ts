import { createStyles } from '@yomtor/styles'
import { PanelProps } from './Panel.props'

export interface PanelStylesParams {}

export default createStyles((theme, {}: PanelStylesParams) => ({
  root: {
    overflow: 'hidden'
  }
}))
