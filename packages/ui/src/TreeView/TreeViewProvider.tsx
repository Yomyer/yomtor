import React, { createContext, useContext, useReducer } from 'react'
import { NodeData } from './Node'

interface TreeViewProviderContextType {
  collapsed?: boolean
  setActive: (node: NodeData) => void
  setHighligth: (node: NodeData) => void
}

const TreeViewContext = createContext<Partial<TreeViewProviderContextType>>({})

export function useTreeViewContext() {
  return useContext(TreeViewContext)
}

export function TreeViewProvider({ children }) {
  const rerender = useReducer(() => ({}), {})[1]

  const setActive = (node: NodeData) => {
    node.actived = !node.actived
    rerender()
  }

  const setHighligth = (node: NodeData) => {}

  return (
    <>
      <TreeViewContext.Provider value={{ setActive, setHighligth }}>
        {children}
      </TreeViewContext.Provider>
    </>
  )
}

TreeViewProvider.displayName = '@yomtor/ui/TreeViewProvider'
