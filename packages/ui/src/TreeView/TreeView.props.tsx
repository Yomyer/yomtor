import React from 'react'
import { VirtualItem } from '@yomtor/hooks'
import { DefaultProps } from '@yomtor/styles'
import { NodeData, NodeProps } from './Node/Node.props'

export type TreeViewPositions = 'below' | 'above' | 'in'

export interface TreeViewProps<T = NodeData> extends DefaultProps {
  data?: NodeData<T>[]
  component?:
    | React.ReactNode
    | ((node: NodeData, row: VirtualItem<Element>) => React.ReactNode)
  size?: number
  collapsed?: boolean
  indentWitdh?: number
  sortable?: boolean
  draggable?: boolean
  multiple?: boolean
}
