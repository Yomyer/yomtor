import React, { forwardRef, useRef, useState, useReducer } from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TreeViewPositions, TreeViewProps } from './TreeView.props'
import useStyles from './TreeView.styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node, NodeData } from './Node'
import { VirtualItem } from '@yomtor/hooks'
import { useNodeTree } from './use-node-tree'
import { isUndefined } from 'lodash'
import { TreeViewProvider } from './TreeViewProvider'

const list = Array.from(Array(500).keys())

const defaultProps: Partial<TreeViewProps> = {
  component: VirtualScroll,
  wrapper: Node,
  size: 30
}

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const rerender = useReducer(() => ({}), {})[1]
    const items = useRef<{ [key: number]: VirtualItem<any> }>({})
    const [position, setPosition] = useState<TreeViewPositions>()

    const {
      component: Component,
      wrapper: Wrapper,
      unstyled,
      data,
      size,
      children,
      collapsed,
      className,
      ...others
    } = useComponentDefaultProps('TreeView', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    const {
      nodes,
      depths,
      parents,
      highlighteds,
      activeds,
      childActiveds,
      nexts,
      previous,
      disableDrops,
      collapser
    } = useNodeTree({
      data,
      collapsed,
      position
      // items: items.current
    })

    const clickHandler = (node: NodeData) => {
      node.actived = !node.actived
      rerender()
    }

    return (
      <TreeViewProvider>
        <Component
          size={size}
          count={nodes.length}
          style={{ height: 300 }}
          node={(item) => {
            const node = nodes[item.index]
            return (
              <Wrapper
                depth={depths[item.index]}
                item={item}
                node={node}
                children={children}
                onClick={clickHandler}
                onCollapse={collapser}
                collapsed={
                  !isUndefined(node.collapsed) ? !node.collapsed : !collapsed
                }
              />
            )
          }}
        />
      </TreeViewProvider>
    )
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
