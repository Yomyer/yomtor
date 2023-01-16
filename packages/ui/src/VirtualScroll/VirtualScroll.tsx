import React, {
  forwardRef,
  useRef,
  useCallback,
  useState,
  useEffect
} from 'react'
import { createPolymorphicComponent } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { VirtualScrollProps } from './VirtualScroll.props'
import useStyles from './VirtualScroll.styles'
import { Box } from '../Box'
import { ScrollArea } from '../ScrollArea'
import { usePrevious, useMergedRef, useVirtualizer } from '@yomtor/hooks'
import { isFunction } from 'lodash'
import { useDetectionScrollEnd } from '../../../hooks/src/use-detection-scroll-end/use-detection-scroll-end'

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

    const scrollRef = useRef<HTMLElement>(null)
    const viewportRef = useRef(null)
    const events = useDetectionScrollEnd(scrollRef.current)

    const virtualizer = useVirtualizer({
      count,
      estimateSize: useCallback(() => size, []),
      getScrollElement: () => scrollRef.current,
      enableSmoothScroll: behavior,
      horizontal
    })

    const { classes, cx } = useStyles(
      { ...others, events },
      { name: 'VirtualScroll', unstyled }
    )

    if (virtualizerRef) {
      virtualizerRef.current = virtualizer
    }

    const [height, setHeight] = useState<number>(virtualizer.getTotalSize())
    const previousHeight = usePrevious<number>(height)

    useEffect(() => {
      setHeight(previousHeight)
    }, [virtualizer.getTotalSize()])

    return (
      <Element
        {...others}
        ref={useMergedRef(ref, scrollRef)}
        className={cx(className, classes.root)}
      >
        <Box
          style={{
            height: `${height}px`
          }}
          ref={viewportRef}
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
