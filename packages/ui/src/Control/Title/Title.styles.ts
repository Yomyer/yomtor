import { createStyles } from '@yomtor/styles'
import { TitleProps } from './Title.props'

export interface TitleStylesParams {}

export default createStyles((theme, {}: TitleStylesParams) => ({
  root: {
    paddingBottom: 5
  },
  title: {
    height: 32,
    flexGrow: 2,
    display: 'flex',
    alignItems: 'center'
  }
}))
