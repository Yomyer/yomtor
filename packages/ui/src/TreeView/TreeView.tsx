import React, {
  forwardRef,
  useReducer,
  useRef,
  useState,
  MouseEvent,
  useEffect
} from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import {
  TreeViewDropInfo,
  TreeViewPositions,
  TreeViewProps
} from './TreeView.props'

import { TreeViewContainer } from './TreeViewContainer'
import { NodeData } from './Node'
import { useNodeTree } from './use-node-tree'
import { isUndefined } from 'lodash'
import { TreeViewContext } from './TreeViewContext'

const defaultProps: Partial<TreeViewProps> = {
  indent: 16
}

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const {
      data,
      collapsed,
      className,
      indent,
      sortabled: isSortabled,
      ...others
    } = useComponentDefaultProps('TreeView', defaultProps, props)

    const rerender = useReducer(() => ({}), {})[1]

    const [sortabled, setSortabled] = useState<boolean>(isSortabled)
    const [dragging, setDragging] = useState(false)
    const [items, setItems] = useState<number[]>([])
    const [target, setTarget] = useState<Element>()
    const [parentHighlighted, setParentHighlighted] = useState<number>()
    const [info, setInfo] = useState<TreeViewDropInfo>()

    const position = useRef<TreeViewPositions>()
    const index = useRef<number>()
    const distance = useRef<number>(0)
    const activeds = useRef<Record<number, NodeData>>({})

    useEffect(() => {
      if (!info) return
      console.log(info)
    }, [info])

    const cache = useNodeTree({
      data,
      collapsed,
      position: position.current,
      items: activeds.current
    })

    activeds.current = cache.activeds

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
      node.collapsed = !isUndefined(node.collapsed)
        ? !node.collapsed
        : !collapsed
      event.stopPropagation()
      rerender()
    }

    const values = {
      ...cache,
      indent,
      collapsed,
      setActive,
      setDeactive,
      setHighligth,
      setCollapse,
      sortabled,
      setSortabled,
      dragging,
      setDragging,
      position,
      rerender,
      items,
      setItems,
      index,
      target,
      setTarget,
      parentHighlighted,
      setParentHighlighted,
      info,
      setInfo,
      distance
    }

    return (
      <TreeViewContext.Provider value={values}>
        <TreeViewContainer
          {...{ ...others, sortabled }}
          nodes={values.nodes}
          ref={ref}
        />
      </TreeViewContext.Provider>
    )
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
