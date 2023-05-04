import React from 'react'
import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps } from '@yomtor/styles'
import { NodeData, NodeProps } from './Node/Node.props'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'

export type TreeViewPositions = 'below' | 'above' | 'in'

export type TreeViewDropInfo = {
  drag: NodeData[]
  drop: NodeData
  position: TreeViewPositions
}

export interface TreeViewProps<T = NodeData> extends DefaultProps {
  data: NodeData<T>[]
  component?: any
  wrapper?: React.ForwardRefExoticComponent<NodeProps>
  children?:
    | React.ReactNode
    | ((node: NodeData<T>, item: VirtualItem) => React.ReactNode)
  size?: number
  collapsed?: boolean
  indentWitdh?: number
  sortabled?: boolean
  draggable?: boolean
  multiple?: boolean
  nodes?: NodeData[]
  indent?: number
  reverse?: boolean
  onSort?: (info: TreeViewDropInfo) => void
}

export type TreeViewComponent =
  | ((<D = NodeData>(props: TreeViewProps<D>) => React.ReactElement) & {
      displayName?: string
    }) &
      ForwardRefWithStaticComponents<TreeViewProps, {}>
