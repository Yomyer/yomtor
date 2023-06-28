import React, { forwardRef, useEffect, useRef } from 'react'
import { TreeViewProps } from './TreeView.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node } from './Node'
import useStyles from './TreeView.styles'
import { Sortable } from './Sortable'
import { useTreeViewContext } from './TreeViewContext'
import { useMergedRef } from '@mantine/hooks'

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
      position,
      target,
      items,
      current,
      depths,
      indent,
      viewportRef: wrapperRef
    } = useTreeViewContext()

    const lineRef = useRef<HTMLDivElement>()
    const viewportRef = useRef<HTMLElement>()
    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    const handlerScrolling = (status: boolean) => {
      isSortabled && setSortabled(!status)
    }

    useEffect(() => {
      if (target) {
        const rect = target.getBoundingClientRect()
        if (lineRef.current) {
          const top =
            (position === 'above' ? rect.top : rect.bottom) +
            viewportRef.current.scrollTop -
            viewportRef.current.getBoundingClientRect().top

          lineRef.current.style.top = `${top}px`
          lineRef.current.style.left = `${indent * (depths[current] + 1)}px`
        }
      }
    }, [current, position])

    return (
      <Component
        {...others}
        className={cx(className, classes.root)}
        size={size}
        count={nodes.length}
        ref={ref}
        viewportRef={useMergedRef(viewportRef, wrapperRef)}
        forced={items}
        onScrolling={handlerScrolling}
        classNames={{ viewport: classes.viewport }}
        node={(item) =>
          sortabled || items.includes(item.index) ? (
            <Sortable item={item}>
              <Wrapper item={item} children={children} />
            </Sortable>
          ) : (
            <Wrapper item={item} children={children} />
          )
        }
      >
        {position && position !== 'in' && (
          <div ref={lineRef} className={classes.line} />
        )}
      </Component>
    )
  }
)

TreeViewContainer.displayName = '@yomtor/ui/TreeViewContainer'
