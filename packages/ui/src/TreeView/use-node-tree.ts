import { isArray, isUndefined } from 'lodash'
import { MouseEvent, useReducer } from 'react'
import { NodeData } from './Node/Node.props'
import { TreeViewPositions } from './TreeView.props'

type UseNodeTreeProps = {
  data: NodeData[]
  collapsed?: boolean
  position?: TreeViewPositions
  items?: { [key: number]: NodeData }
}

export const useRecursive = ({
  data,
  collapsed,
  position,
  items = {}
}: UseNodeTreeProps) => {
  let index = -1
  const nodes: NodeData[] = []
  const depths: number[] = []
  const parents: Record<number, NodeData> = {}
  const previous: Record<number, NodeData> = {}
  const next: Record<number, NodeData> = {}
  const activeds: Record<number, NodeData> = {}
  const childActiveds: Record<number, NodeData> = {}
  const highlighteds: Record<number, NodeData> = {}
  const disableDrops: Record<number, NodeData> = {}

  const recursive = (
    data: NodeData[] = [],
    depth = 0,
    parent?: NodeData,
    actived?: boolean,
    disableDrop?: boolean
  ) => {
    data.forEach((node, i) => {
      index++
      nodes[index] = node
      depths[index] = depth
      previous[index] = data[i - 1]
      next[index] = data[i + 1]

      if (node.active) {
        activeds[index] = node
      }
      if (actived) {
        childActiveds[index] = node
      }
      if (disableDrop) {
        disableDrops[index] = node
      }

      if (
        node.highlight &&
        !node.active &&
        !['below', 'above'].includes(position)
      ) {
        highlighteds[index] = node
      }

      if (parent) {
        parents[index] = parent
      }

      if (
        isArray(node.children) && !isUndefined(node.collapse)
          ? !node.collapse
          : !collapsed
      ) {
        recursive(
          node.children,
          depth + 1,
          node,
          actived || (node.active as boolean),
          disableDrop || Object.keys(items).includes(index.toString())
        )
      }
    })
  }
  recursive(data)

  return {
    nodes,
    depths,
    parents,
    activeds,
    childActiveds,
    highlighteds,
    next,
    previous,
    disableDrops
  }
}

export const useNodeTree = ({
  data,
  collapsed,
  position,
  items
}: UseNodeTreeProps) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const collapser = (node: NodeData, event: MouseEvent) => {
    node.collapse = !isUndefined(node.collapse) ? !node.collapse : !collapsed

    event.stopPropagation()

    forceUpdate()
  }

  return {
    ...useRecursive({
      data,
      collapsed,
      position,
      items
    }),
    collapser
  }
}
