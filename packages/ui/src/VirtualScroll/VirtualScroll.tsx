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
  node: (node, className) => (
    <div
      key={node.index}
      className={className}
      style={{
        height: `${node.size}px`,
        transform: `translateY(${node.start}px)`
      }}
    >
      Row: {node.index}
    </div>
  )
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
            .map((row) => (isFunction(node) ? node(row, classes.node) : node))}
        </Box>
      </Element>
    )
  }
) as any

_VirtualScroll.displayName = '@yomtor/ui/VirtualScroll'

export const VirtualScroll =
  createPolymorphicComponent<'div', VirtualScrollProps>(_VirtualScroll)
