import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps, Selectors, YomtorStyleSystemSize } from '@yomtor/styles'
import useStyles from './Node.styles'

type NodeStylesNames = Selectors<typeof useStyles>

export type NodeData<T = { [key: string]: unknown }> = T & {
  [key: string]: unknown
} & {
  label?: string
  children?: NodeData[]
  collapsed?: boolean
  actived?: boolean
  highlighted?: boolean
}

export interface NodeProps
  extends Omit<DefaultProps<NodeStylesNames>, YomtorStyleSystemSize> {
  item: VirtualItem
  onMouseDown?: (event) => void
  children?:
    | React.ReactNode
    | ((node: NodeData, item: VirtualItem) => React.ReactNode)
}
