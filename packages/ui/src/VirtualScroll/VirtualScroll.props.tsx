import useStyles from './VirtualScroll.styles'
import { Selectors, YomtorStyleSystemSize, DefaultProps } from '@yomtor/styles'
import { ScrollAreaTypes } from '../ScrollArea/ScrollArea.props'
import { VirtualItem, Virtualizer } from '@yomtor/hooks'

type VirtualScrollStylesNames = Selectors<typeof useStyles>

export interface VirtualScrollProps
  extends Omit<DefaultProps<VirtualScrollStylesNames>, YomtorStyleSystemSize> {
  component?: any
  size?: number
  count: number
  type?: ScrollAreaTypes
  horizontal?: boolean
  virtualizerRef?: React.MutableRefObject<Virtualizer<Element>>
  behavior?: boolean
  wrapper?:
    | React.ReactNode
    | ((
        item: VirtualItem<Element>,
        node:
          | React.ReactNode
          | ((item: VirtualItem<Element>) => React.ReactNode),
        className: string
      ) => React.ReactNode)
  node?: React.ReactNode | ((item: VirtualItem<Element>) => React.ReactNode)
  onScrolling?: (status: boolean) => void
}
