import React, { forwardRef, useState } from 'react'
import { TreeViewProps } from './TreeView.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node } from './Node'
import useStyles from './TreeView.styles'
import { useTreeViewContext } from './TreeViewProvider'
import { Sortable } from './Sortable'
import { VirtualItem } from '@yomtor/hooks'

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
      className,
      sortabled: isSortabled,
      ...others
    } = useComponentDefaultProps('TreeView', defaultProps, props)

    const {
      setSortabled,
      sortabled,
      setActive,
      setDeactive,
      dragging,
      setDragging
    } = useTreeViewContext()
    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    const handlerScrolling = (status: boolean) => {
      isSortabled && setSortabled(!status)
    }

    const mouseDownHandler = (
      item: VirtualItem<Element>,
      event: React.MouseEvent
    ) => {
      setActive(nodes[item.index], event)
    }

    const mouseUpHandler = (
      item: VirtualItem<Element>,
      event: React.MouseEvent
    ) => {
      setDeactive(nodes[item.index], event)
      setDragging(false)
    }

    const startHandler = () => {
      setDragging(true)
    }

    return (
      <Component
        {...others}
        className={cx(className, classes.root)}
        size={size}
        count={nodes.length}
        ref={ref}
        onScrolling={handlerScrolling}
        node={(item) =>
          sortabled ? (
            <Sortable
              onMouseDown={(event: MouseEvent) =>
                mouseDownHandler(item, event as unknown as React.MouseEvent)
              }
              onStart={(event: MouseEvent) => startHandler()}
              onMouseUp={(event: MouseEvent) =>
                mouseUpHandler(item, event as unknown as React.MouseEvent)
              }
            >
              <Wrapper item={item} children={children} />
            </Sortable>
          ) : (
            <Wrapper item={item} children={children} />
          )
        }
      />
    )
  }
)

TreeViewContainer.displayName = '@yomtor/ui/TreeViewContainer'
