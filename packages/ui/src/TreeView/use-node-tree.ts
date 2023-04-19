import { isArray, isUndefined } from 'lodash'
import { NodeData } from './Node/Node.props'
import { TreeViewPositions } from './TreeView.props'

type UseNodeTreeProps = {
  data: NodeData[]
  collapsed?: boolean
  position?: TreeViewPositions
  items?: Record<number, NodeData>
}

export interface UseNodeTreeData {
  nodes: NodeData[]
  depths: number[]
  parents: Record<number, NodeData>
  previous: Record<number, NodeData>
  nexts: Record<number, NodeData>
  activeds: Record<number, NodeData>
  childActiveds: Record<number, NodeData>
  highlighteds: Record<number, NodeData>
  disableDrops: Record<number, NodeData>
}

export const useNodeTree = ({
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
  const nexts: Record<number, NodeData> = {}
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
      nexts[index] = data[i + 1]

      if (node.actived) {
        activeds[index] = node
      }
      if (actived) {
        childActiveds[index] = node
      }
      if (disableDrop || Object.keys(items).includes(index.toString())) {
        disableDrops[index] = node
      }

      if (
        node.highlighted &&
        !node.actived &&
        !['below', 'above'].includes(position)
      ) {
        highlighteds[index] = node
      }

      if (parent) {
        parents[index] = parent
      }

      if (
        isArray(node.children) && !isUndefined(node.collapsed)
          ? !node.collapsed
          : !collapsed
      ) {
        recursive(
          node.children,
          depth + 1,
          node,
          actived || (node.actived as boolean),
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
    nexts,
    previous,
    disableDrops
  }
}
