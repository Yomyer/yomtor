import { MouseEvent } from 'react'
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
  depth: number
  item: VirtualItem<Element>
  node: NodeData
  collapsed?: boolean
  actived?: boolean
  highlighted?: boolean
  onClick?: (node: NodeData) => void
  onMouseEnter?: (node: NodeData) => void
  onMouseLeave?: (node: NodeData) => void
  onCollapse?: (node: NodeData, event: MouseEvent) => void
  children?:
    | React.ReactNode
    | ((node: NodeData, item: VirtualItem<Element>) => React.ReactNode)
}
