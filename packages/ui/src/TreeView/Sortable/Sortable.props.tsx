import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps, Selectors } from '@yomtor/styles'
import useStyles, { SortableStylesParams } from './Sortable.styles'

type SortableStylesNames = Selectors<typeof useStyles>

export interface SortableProps
  extends DefaultProps<SortableStylesNames, SortableStylesParams> {
  children: React.ReactElement
  item: VirtualItem
  offset?: number
}
