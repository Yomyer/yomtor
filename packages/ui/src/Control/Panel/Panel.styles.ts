import { createStyles } from '@yomtor/styles'
import { isString } from 'lodash'
import { PanelProps } from './Panel.props'

export interface PanelStylesParams {
  columns: number | 'auto'
  rows: number | 'auto'
  gap: number
}

export default createStyles(
  (theme, { columns, rows, gap }: PanelStylesParams) => ({
    root: {
      gridColumn: isString(columns) ? columns : `span ${columns}`,
      gridRow: isString(rows) ? rows : `span ${rows}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap,
      '& > *': {
        flexGrow: 1
      }
    }
  })
)
