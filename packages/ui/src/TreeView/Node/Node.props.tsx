import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps, Selectors } from '@yomtor/styles'
import useStyles, { NodeStylesParams } from './Node.styles'

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

export interface NodeProps<T = unknown>
  extends DefaultProps<NodeStylesNames, NodeStylesParams> {
  item: VirtualItem
  onMouseDown?: (event) => void
  children?:
    | React.ReactNode
    | ((node: NodeData<T>, item: VirtualItem) => React.ReactNode)
}
