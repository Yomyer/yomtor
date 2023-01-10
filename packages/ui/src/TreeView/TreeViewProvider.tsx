import { isFunction } from 'lodash'
import React, {
  createContext,
  MouseEvent,
  useContext,
  useReducer,
  useState
} from 'react'
import { NodeData } from './Node'
import { TreeViewPositions } from './TreeView.props'
import { useNodeTree, UseNodeTreeData } from './use-node-tree'

interface TreeViewProviderContextType extends UseNodeTreeData {
  collapsed?: boolean
  setActive: (node: NodeData, event?: MouseEvent) => void
  setHighligth: (node: NodeData, status: boolean, event?: MouseEvent) => void
}

const TreeViewContext = createContext<Partial<TreeViewProviderContextType>>({})

interface TreeViewProviderProps<T = NodeData> {
  data: NodeData<T>[]
  collapsed?: boolean
  children:
    | React.ReactNode
    | ((data: TreeViewProviderContextType) => React.ReactNode)
}

export function useTreeViewContext() {
  return useContext(TreeViewContext)
}

export const TreeViewProvider = ({
  data,
  collapsed,
  children
}: TreeViewProviderProps) => {
  const rerender = useReducer(() => ({}), {})[1]
  const [position, setPosition] = useState<TreeViewPositions>()

  const setActive = (node: NodeData) => {
    node.actived = !node.actived
    rerender()
  }

  const setHighligth = (node: NodeData, status: boolean) => {
    node.highlighted = status
    rerender()
  }

  const props = {
    ...useNodeTree({
      data,
      collapsed,
      position
      // items: items.current
    }),
    collapsed,
    setActive,
    setHighligth
  }

  return (
    <>
      <TreeViewContext.Provider value={props}>
        {isFunction(children) ? children(props) : children}
      </TreeViewContext.Provider>
    </>
  )
}

TreeViewProvider.displayName = '@yomtor/ui/TreeViewProvider'
