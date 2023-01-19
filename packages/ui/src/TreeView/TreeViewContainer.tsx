import React, { forwardRef, useEffect, useRef } from 'react'
import { TreeViewProps } from './TreeView.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { VirtualScroll } from '../VirtualScroll'
import { Node } from './Node'
import useStyles from './TreeView.styles'
import { Sortable } from './Sortable'
import { useMergedRef } from '@yomtor/hooks'
import { isUndefined } from 'lodash'
import { useTreeViewContext } from './TreeViewContext'

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
      disableDrops
    } = useTreeViewContext()

    const lineRef = useRef<HTMLDivElement>()
    const scrollRef = useRef<HTMLElement>()
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
            scrollRef.current.scrollTop -
            scrollRef.current.getBoundingClientRect().top

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
        ref={useMergedRef(ref, scrollRef)}
        forced={items}
        onScrolling={handlerScrolling}
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
        {position && position !== 'in' && !disableDrops[current] && (
          <div ref={lineRef} className={classes.line} />
        )}
      </Component>
    )
  }
)

TreeViewContainer.displayName = '@yomtor/ui/TreeViewContainer'
