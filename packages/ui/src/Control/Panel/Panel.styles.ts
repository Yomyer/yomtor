import { createStyles } from '@yomtor/styles'
import { isString } from 'lodash'
import { PanelProps } from './Panel.props'

export interface PanelStylesParams {
  columns: number | 'auto'
  rows: number | 'auto'
  gap: number
  start: number | 'none'
  end: number | 'none'
}

export default createStyles(
  (theme, { columns, rows, gap, start, end }: PanelStylesParams) => ({
    root: {
      gridColumn:
        !start && !end
          ? isString(columns)
            ? columns
            : `span ${columns}`
          : undefined,
      gridColumnStart: (start && start) || (end && 'none'),
      gridColumnEnd: (end && end) || (start && 'none'),
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
