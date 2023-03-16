import { createStyles } from '@yomtor/styles'
import { TitleProps } from './Title.props'

export interface TitleStylesParams {}

export default createStyles((theme, {}: TitleStylesParams) => ({
  root: {
    overflow: 'hidden'
  }
}))
