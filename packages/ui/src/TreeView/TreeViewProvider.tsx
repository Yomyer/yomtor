import { isFunction, isUndefined } from 'lodash'
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  MouseEvent,
  useRef,
  useState
} from 'react'
import { NodeData } from './Node'
import { TreeViewPositions } from './TreeView.props'
import { useNodeTree, UseNodeTreeData } from './use-node-tree'

interface TreeViewProviderContextType extends UseNodeTreeData {
  collapsed?: boolean
  padding?: number
  sortabled?: boolean
  dragging?: boolean
  position?: TreeViewPositions
  items?: number[]
  current?: number
  target?: Element
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
}

const TreeViewContext = createContext<Partial<TreeViewProviderContextType>>({})

interface TreeViewProviderProps<T = NodeData> {
  data: NodeData<T>[]
  collapsed?: boolean
  sortabled?: boolean
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
  children,
  sortabled: isSortabled
}: TreeViewProviderProps) => {
  const rerender = useReducer(() => ({}), {})[1]
  const [position, setPosition] = useState<TreeViewPositions>()
  const [sortabled, setSortabled] = useState<boolean>(isSortabled)
  const [dragging, setDragging] = useState(false)
  const [items, setItems] = useState<number[]>([])
  const [current, setCurrent] = useState<number>()
  const [target, setTarget] = useState<Element>()

  const cache = useNodeTree({
    data,
    collapsed,
    position
    // items: items.current
  })

  const setActive = (node: NodeData, event: MouseEvent) => {
    const ctrl = event.ctrlKey || event.metaKey
    if (!ctrl && !Object.values(cache.activeds).includes(node)) {
      Object.values(cache.activeds).forEach((n) => (n.actived = false))
    }

    if (!Object.values(cache.activeds).includes(node) || ctrl) {
      node.actived = !node.actived
    }

    rerender()
  }

  const setDeactive = (node: NodeData, event: MouseEvent) => {
    const ctrl = event.ctrlKey || event.metaKey

    if (!dragging && !ctrl) {
      Object.values(cache.activeds)
        .filter((n) => n !== node)
        .forEach((n) => (n.actived = false))

      rerender()
    }
  }

  const setHighligth = (node: NodeData, status: boolean) => {
    node.highlighted = status
    rerender()
  }

  const setCollapse = (node: NodeData, event: MouseEvent) => {
    node.collapsed = !isUndefined(node.collapsed) ? !node.collapsed : !collapsed
    event.stopPropagation()
    rerender()
  }

  const props = {
    ...cache,
    collapsed,
    setActive,
    setDeactive,
    setHighligth,
    setCollapse,
    sortabled,
    setSortabled,
    setDragging,
    position,
    setPosition,
    items,
    setItems,
    current,
    setCurrent,
    target,
    setTarget
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
