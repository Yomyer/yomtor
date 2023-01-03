import React, { forwardRef, useRef, useCallback } from 'react'
import { createPolymorphicComponent } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { VirtualScrollProps } from './VirtualScroll.props'
import useStyles from './VirtualScroll.styles'
import { Box } from '../Box'
import { ScrollArea } from '../ScrollArea'
import { useMergedRef, useVirtualizer } from '@yomtor/hooks'
import { isFunction } from 'lodash'

const defaultProps: Partial<VirtualScrollProps> = {
  size: 30,
  component: ScrollArea,
  type: 'always',
  behavior: false,
  wrapper: (item, node, className) => (
    <div
      key={item.index}
      className={className}
      style={{
        height: `${item.size}px`,
        transform: `translateY(${item.start}px)`
      }}
    >
      {isFunction(node) ? node(item) : node}
    </div>
  ),
  node: (item) => <div>Row: {item.index}</div>
}

export const _VirtualScroll = forwardRef<HTMLDivElement, VirtualScrollProps>(
  (props, ref) => {
    const {
      unstyled,
      component: Element,
      className,
      size,
      count,
      behavior,
      horizontal,
      virtualizerRef,
      wrapper,
      node,
      ...others
    } = useComponentDefaultProps('VirtualScroll', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'VirtualScroll', unstyled }
    )

    const scrollRef = useRef()

    const virtualizer = useVirtualizer({
      count,
      estimateSize: useCallback(() => size, []),
      getScrollElement: () => scrollRef.current,
      enableSmoothScroll: behavior,
      horizontal
    })

    if (virtualizerRef) {
      virtualizerRef.current = virtualizer
    }

    return (
      <Element
        {...others}
        ref={useMergedRef(ref, scrollRef)}
        className={cx(className, classes.root)}
      >
        <Box
          style={{
            height: `${virtualizer.getTotalSize()}px`
          }}
          className={classes.viewport}
        >
          {virtualizer
            .getVirtualItems()
            .map((row) =>
              isFunction(wrapper) ? wrapper(row, node, classes.node) : wrapper
            )}
        </Box>
      </Element>
    )
  }
) as any

_VirtualScroll.displayName = '@yomtor/ui/VirtualScroll'

export const VirtualScroll = createPolymorphicComponent<
  'div',
  VirtualScrollProps
>(_VirtualScroll)
