import { isFunction, isUndefined } from 'lodash'
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
  padding?: number
  setActive: (node: NodeData, event?: MouseEvent) => void
  setHighligth: (node: NodeData, event?: MouseEvent) => void
  setCollapse: (node: NodeData, event?: MouseEvent) => void
}

const TreeViewContext = createContext<Partial<TreeViewProviderContextType>>({})

interface TreeViewProviderProps<T = NodeData> {
  data: NodeData<T>[]
  collapsed?: boolean
  scrollRef?: React.MutableRefObject<HTMLElement>
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
  scrollRef,
  children
}: TreeViewProviderProps) => {
  const rerender = useReducer(() => ({}), {})[1]
  const [position, setPosition] = useState<TreeViewPositions>()

  const setActive = (node: NodeData) => {
    node.actived = !node.actived
    rerender()
  }

  const setHighligth = (node: NodeData) => {
    node.highlighted = !node.highlighted
    rerender()
  }

  const setCollapse = (node: NodeData, event: MouseEvent) => {
    node.collapsed = !isUndefined(node.collapsed) ? !node.collapsed : !collapsed
    event.stopPropagation()

    console.log(scrollRef.current.scrollHeight)

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
    setHighligth,
    setCollapse
  }

  console.log(scrollRef?.current?.scrollHeight)

  return (
    <>
      <TreeViewContext.Provider value={props}>
        {isFunction(children) ? children(props) : children}
      </TreeViewContext.Provider>
    </>
  )
}

TreeViewProvider.displayName = '@yomtor/ui/TreeViewProvider'
