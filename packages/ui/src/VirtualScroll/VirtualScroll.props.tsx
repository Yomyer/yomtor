import useStyles from './VirtualScroll.styles'
import { Selectors, YomtorStyleSystemSize, DefaultProps } from '@yomtor/styles'
import { ScrollAreaTypes } from '../ScrollArea/ScrollArea.props'
import { VirtualItem, UseVirtualizer } from '@yomtor/hooks'

type VirtualScrollStylesNames = Selectors<typeof useStyles>

export interface VirtualScrollProps
  extends Omit<DefaultProps<VirtualScrollStylesNames>, YomtorStyleSystemSize> {
  component?: any
  size?: number
  count: number
  type?: ScrollAreaTypes
  horizontal?: boolean
  virtualizerRef?: React.MutableRefObject<UseVirtualizer<Element, Element>>
  behavior?: boolean
  forced?: number[]
  wrapper?:
    | React.ReactNode
    | ((
        item: VirtualItem,
        node: React.ReactNode | ((item: VirtualItem) => React.ReactNode),
        className: string
      ) => React.ReactNode)
  node?: React.ReactNode | ((item: VirtualItem) => React.ReactNode)
  onScrolling?: (status: boolean) => void
  children?: React.ReactNode
}
