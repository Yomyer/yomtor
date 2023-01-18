import { DefaultProps, Selectors, YomtorStyleSystemSize } from '@yomtor/styles'
import useStyles from './Sortable.styles'

type SortableStylesNames = Selectors<typeof useStyles>

export interface SortableProps
  extends Omit<DefaultProps<SortableStylesNames>, YomtorStyleSystemSize> {
  children: React.ReactElement
  onMouseDown?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onStart?: (event: MouseEvent) => void
}
