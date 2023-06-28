import React, {
  forwardRef,
  useRef,
  useState,
  MouseEvent,
  useEffect
} from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import {
  TreeViewComponent,
  TreeViewDropInfo,
  TreeViewPositions,
  TreeViewProps
} from './TreeView.props'

import { TreeViewContainer } from './TreeViewContainer'
import { NodeData } from './Node'
import { UseNodeTreeData, useNodeTree } from './use-node-tree'
import { isUndefined, range } from 'lodash'
import { TreeViewContext } from './TreeViewContext'
import { useForceUpdate } from '@mantine/hooks'

const defaultProps: Partial<TreeViewProps> = {
  indent: 16
}

export const TreeView: TreeViewComponent = forwardRef<
  HTMLDivElement,
  TreeViewProps<unknown>
>((props, ref) => {
  const {
    data,
    collapsed,
    className,
    indent,
    onSort,
    sortabled: isSortabled,
    overflowed: isOverflowed,
    multiple,
    reverse,
    ...others
  } = useComponentDefaultProps('TreeView', defaultProps, props)

  const rerender = useForceUpdate()
  const [position, setPosition] = useState<TreeViewPositions>()
  const [sortabled, setSortabled] = useState<boolean>(isSortabled)
  const [overflowed, setOverflowed] = useState<boolean>(isOverflowed)
  const [dragging, setDragging] = useState(false)
  const [items, setItems] = useState<number[]>([])
  const [current, setCurrent] = useState<number>()
  const [target, setTarget] = useState<Element>()
  const [parentHighlighted, setParentHighlighted] = useState<number>()
  const [info, setInfo] = useState<TreeViewDropInfo>()
  const distance = useRef<number>(0)
  const activeds = useRef<Record<number, NodeData>>({})
  const prev = useRef<number>()
  // const [cache, setCache] = useState<Partial<UseNodeTreeData>>({ nodes: [] })

  useEffect(() => {
    if (!info) return
    onSort && onSort(info)
  }, [info])

  useEffect(() => {
    setSortabled(isSortabled)
  }, [isSortabled])

  useEffect(() => {
    setOverflowed(isOverflowed)
  }, [isOverflowed])

  useEffect(() => {
    // setCache(cache)
  }, [data])

  const cache = useNodeTree({
    data,
    collapsed,
    position,
    items: activeds.current,
    reverse
  })
  activeds.current = cache.activeds

  const setActive = (node: NodeData, event: MouseEvent) => {
    const ctrl = event.ctrlKey || event.metaKey
    const shift = event.shiftKey
    const index = cache.nodes.findIndex((n) => n === node)

    if (
      (!ctrl && !shift && !Object.values(cache.activeds).includes(node)) ||
      !multiple
    ) {
      Object.values(cache.activeds).forEach((n) => (n.actived = false))
    }

    if (!Object.values(cache.activeds).includes(node) || ctrl) {
      node.actived = !node.actived
    }

    if (shift && !ctrl && multiple) {
      const ranges = [prev.current, index]
      const indexes = range(Math.min(...ranges), Math.max(...ranges) + 1)
      indexes.forEach((i) => (cache.nodes[i].actived = true))
    }

    node.highlighted = false
    prev.current = index
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

  const values = {
    ...cache,
    indent,
    collapsed,
    multiple,
    setActive,
    setDeactive,
    setHighligth,
    setCollapse,
    sortabled,
    setSortabled,
    overflowed,
    setOverflowed,
    dragging,
    setDragging,
    position,
    setPosition,
    items,
    setItems,
    current,
    setCurrent,
    target,
    setTarget,
    parentHighlighted,
    setParentHighlighted,
    info,
    setInfo,
    distance,
    reverse,
    viewportRef: useRef<Element>()
  }

  return (
    <TreeViewContext.Provider value={values}>
      <TreeViewContainer
        {...{ ...others, sortabled }}
        data={data}
        nodes={values.nodes}
        ref={ref}
      />
    </TreeViewContext.Provider>
  )
}) as any

TreeView.displayName = '@yomtor/ui/TreeView'
