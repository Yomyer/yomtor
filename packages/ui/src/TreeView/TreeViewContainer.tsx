import React, { forwardRef } from 'react'
import { TreeViewProps } from './TreeView.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node, NodeData } from './Node'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import useStyles from './TreeView.styles'

const defaultProps: Partial<TreeViewProps> = {
  component: VirtualScroll,
  wrapper: Node,
  size: 30
}

export const TreeViewContainer = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const {
      component: Component,
      wrapper: Wrapper,
      unstyled,
      data,
      size,
      nodes,
      children,
      collapsed,
      className,
      sortabled,
      ...others
    } = useComponentDefaultProps('TreeView', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    return (
      <Component
        {...others}
        className={cx(className, classes.root)}
        size={size}
        count={nodes.length}
        ref={ref}
        node={(item) => <Wrapper item={item} children={children} />}
      />
    )
  }
)

TreeViewContainer.displayName = '@yomtor/ui/TreeViewContainer'
