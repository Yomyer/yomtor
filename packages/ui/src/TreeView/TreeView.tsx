import React, { forwardRef, useRef, useState } from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TreeViewPositions, TreeViewProps } from './TreeView.props'
import useStyles from './TreeView.styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node } from './Node'
import { VirtualItem } from '@yomtor/hooks'
import { useNodeTree } from './use-node-tree'

const list = Array.from(Array(500).keys())

const defaultProps: Partial<TreeViewProps> = {
  size: 30
}

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const items = useRef<{ [key: number]: VirtualItem<any> }>({})
    const [position, setPosition] = useState<TreeViewPositions>()

    const { unstyled, data, size, collapsed, className, ...others } =
      useComponentDefaultProps('TreeView', defaultProps, props)

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
      next,
      disableDrops,
      collapser
    } = useNodeTree({
      data,
      collapsed,
      position
      // items: items.current
    })

    return (
      <VirtualScroll
        size={size}
        count={nodes.length}
        style={{ height: 300 }}
        node={(item) => <Node depth={0}>{item.index}</Node>}
      />
    )
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
