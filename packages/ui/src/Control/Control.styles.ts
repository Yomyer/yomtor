import { createStyles } from '@yomtor/styles'
import { ControlProps } from './Control.props'

export interface ControlStylesParams {}

export default createStyles((theme, {}: ControlStylesParams) => ({
  root: {
    overflow: 'hidden'
  }
}))
