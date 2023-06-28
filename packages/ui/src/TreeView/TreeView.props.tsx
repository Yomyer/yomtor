import React from 'react'
import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps } from '@yomtor/styles'
import { NodeData, NodeProps } from './Node/Node.props'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'

export type TreeViewPositions = 'below' | 'above' | 'in'

export type TreeViewDropInfo<T = NodeData> = {
  drag: T[]
  drop: T
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
  overflowed?: boolean
  multiple?: boolean
  nodes?: NodeData[]
  indent?: number
  reverse?: boolean
  onSort?: (info: TreeViewDropInfo<T>) => void
}

export type TreeViewComponent =
  | ((<D = NodeData>(props: TreeViewProps<D>) => React.ReactElement) & {
      displayName?: string
    }) &
      ForwardRefWithStaticComponents<TreeViewProps, {}>
