import { createStyles } from '@yomtor/styles'
import { GroupProps } from './Group.props'

export interface GroupStylesParams {
  gap: number
  rowGap: number
  columnGap: number
}

export default createStyles(
  (theme, { gap, rowGap, columnGap }: GroupStylesParams) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(32,1fr)',
      gap,
      rowGap,
      columnGap,
      paddingLeft: 8,
      paddingRight: 8,
      alignItems: 'center',
      position: 'relative'
    }
  })
)
