import { createStyles } from '@yomtor/styles'
import { RowProps } from './Row.props'

export interface RowStylesParams {}

export default createStyles((theme, {}: RowStylesParams) => ({
  root: {
    overflow: 'hidden'
  }
}))
