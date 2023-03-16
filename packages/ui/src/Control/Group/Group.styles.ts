import { createStyles } from '@yomtor/styles'
import { GroupProps } from './Group.props'

export interface GroupStylesParams {}

export default createStyles((theme, {}: GroupStylesParams) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(32,1fr)',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    position: 'relative'
  }
}))
