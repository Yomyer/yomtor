import { createContext, useContext, MouseEvent } from 'react'
import { NodeData } from './Node'
import { TreeViewDropInfo, TreeViewPositions } from './TreeView.props'
import { UseNodeTreeData } from './use-node-tree'

export interface TreeViewProviderContextType extends UseNodeTreeData {
  collapsed?: boolean
  padding?: number
  sortabled?: boolean
  dragging?: boolean
  position?: TreeViewPositions
  items?: number[]
  current?: number
  target?: Element
  indent?: number
  multiple?: boolean
  parentHighlighted?: number
  distance?: React.MutableRefObject<number>
  info?: TreeViewDropInfo
  reverse?: boolean

  setActive: (node: NodeData, event?: MouseEvent) => void
  setDeactive: (node: NodeData, event?: MouseEvent) => void
  setHighligth: (node: NodeData, status: boolean, event?: MouseEvent) => void
  setCollapse: (node: NodeData, event?: MouseEvent) => void
  setSortabled: (status: boolean) => void
  setDragging: (status: boolean) => void
  setPosition: (position: TreeViewPositions) => void
  setItems: (items: number[]) => void
  setCurrent: (index: number) => void
  setTarget: (target: Element) => void
  setParentHighlighted: (index: number) => void
  setInfo: (info: TreeViewDropInfo) => void
}

export const TreeViewContext = createContext<
  Partial<TreeViewProviderContextType>
>({})

export function useTreeViewContext() {
  return useContext(TreeViewContext)
}
