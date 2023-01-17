import React, {
  forwardRef,
  useRef,
  useState,
  useReducer,
  useEffect
} from 'react'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'
import useStyles from './TreeView.styles'

import { TreeViewProps } from './TreeView.props'
import { VirtualScroll } from '../VirtualScroll'
import { Node } from './Node'
import { TreeViewProvider } from './TreeViewProvider'
import { Sortable } from './Sortable'
import { useDetectionScrollEnd } from '@yomtor/hooks'
import { useMergedRef } from '@mantine/hooks'

const list = Array.from(Array(500).keys())

const defaultProps: Partial<TreeViewProps> = {
  component: VirtualScroll,
  wrapper: Node,
  size: 30
}

export const _TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const {
      component: Component,
      wrapper: Wrapper,
      unstyled,
      data,
      size,
      children,
      collapsed,
      className,
      sortabled,
      ...others
    } = useComponentDefaultProps('TreeView', defaultProps, props)

    const scrollRef = useRef()
    console.log(scrollRef.current)
    const events = useDetectionScrollEnd(scrollRef.current)
    console.log(events)
    const { classes, cx } = useStyles(
      { ...others },
      { name: 'TreeView', unstyled }
    )

    return (
      <TreeViewProvider {...{ data, collapsed, sortabled }}>
        {({ nodes }) => (
          <Component
            {...others}
            className={cx(className, classes.root)}
            size={size}
            count={nodes.length}
            ref={useMergedRef(ref, scrollRef)}
            node={(item) => {
              return sortabled && events ? (
                <Sortable>
                  <Wrapper item={item} children={children} />
                </Sortable>
              ) : (
                <Wrapper item={item} children={children} />
              )
            }}
          />
        )}
      </TreeViewProvider>
    )
  }
) as any

_TreeView.displayName = '@yomtor/ui/TreeView'

export const TreeView: ForwardRefWithStaticComponents<TreeViewProps, {}> =
  _TreeView
