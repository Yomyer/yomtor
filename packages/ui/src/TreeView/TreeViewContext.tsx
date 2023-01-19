import { createContext, useContext, MouseEvent } from 'react'
import { NodeData } from './Node'
import { TreeViewDropInfo, TreeViewPositions } from './TreeView.props'
import { UseNodeTreeData } from './use-node-tree'

export interface TreeViewProviderContextType extends UseNodeTreeData {
  collapsed?: boolean
  padding?: number
  sortabled?: boolean
  dragging?: boolean
  items?: number[]
  info?: TreeViewDropInfo
  target?: Element
  indent?: number
  parentHighlighted?: number
  position?: React.MutableRefObject<TreeViewPositions>
  distance?: React.MutableRefObject<number>
  index?: React.MutableRefObject<number>

  setActive: (node: NodeData, event?: MouseEvent) => void
  setDeactive: (node: NodeData, event?: MouseEvent) => void
  setHighligth: (node: NodeData, status: boolean, event?: MouseEvent) => void
  setCollapse: (node: NodeData, event?: MouseEvent) => void
  setSortabled: (status: boolean) => void
  setDragging: (status: boolean) => void
  setItems: (items: number[]) => void
  setTarget: (target: Element) => void
  setParentHighlighted: (index: number) => void
  setInfo: (info: TreeViewDropInfo) => void
  rerender: React.DispatchWithoutAction
}

export const TreeViewContext = createContext<
  Partial<TreeViewProviderContextType>
>({})

export function useTreeViewContext() {
  return useContext(TreeViewContext)
}
