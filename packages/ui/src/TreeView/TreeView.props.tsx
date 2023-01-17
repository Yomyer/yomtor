import React from 'react'
import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps } from '@yomtor/styles'
import { NodeData, NodeProps } from './Node/Node.props'

export type TreeViewPositions = 'below' | 'above' | 'in'

export interface TreeViewProps<T = NodeData> extends DefaultProps {
  data?: NodeData<T>[]
  component?: any
  wrapper?: React.ForwardRefExoticComponent<NodeProps>
  children?:
    | React.ReactNode
    | ((node: NodeData, item: VirtualItem<Element>) => React.ReactNode)
  size?: number
  collapsed?: boolean
  indentWitdh?: number
  sortabled?: boolean
  draggable?: boolean
  multiple?: boolean
}
