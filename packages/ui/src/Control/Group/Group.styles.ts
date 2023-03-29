import { createStyles } from '@yomtor/styles'
import { GroupProps } from './Group.props'

export interface GroupStylesParams {
  gap: number
  rowGap: number
  columnGap: number
  columns: number
}

export default createStyles(
  (theme, { gap, rowGap, columnGap, columns }: GroupStylesParams) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns},1fr)`,
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
