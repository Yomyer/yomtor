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
import { useMergedRef, useVirtualizer } from '@yomtor/hooks'
import { isFunction } from 'lodash'
import { useHeight } from './use-height'

const defaultProps: Partial<VirtualScrollProps> = {
  size: 30,
  component: ScrollArea,
  type: 'always',
  behavior: false,
  forced: [],
  wrapper: (item, node, className) => (
    <div
      key={item.index}
      className={className}
      data-index={item.index}
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
      children,
      classNames,
      styles,
      node,
      forced,
      viewportRef: externalvieportRef,
      onScrolling,
      ...others
    } = useComponentDefaultProps('VirtualScroll', defaultProps, props)

    const scrollRef = useRef<HTMLElement>(null)
    const viewportRef = useRef(null)
    const timeOut = useRef(null)
    const [scrolling, setScrolling] = useState(false)

    const virtualizer = useVirtualizer({
      count,
      estimateSize: useCallback(() => size, []),
      getScrollElement: () => viewportRef.current,
      enableSmoothScroll: behavior,
      horizontal
    })

    const { classes, cx } = useStyles(
      { ...others, events: !scrolling },
      { name: 'VirtualScroll', unstyled, classNames, styles }
    )

    if (virtualizerRef) {
      virtualizerRef.current = virtualizer
    }

    const height = useHeight({
      height: virtualizer.getTotalSize(),
      element: viewportRef.current
    })

    useEffect(() => {
      if (!scrollRef.current) return

      const event = () => {
        clearTimeout(timeOut.current)
        setScrolling(true)
        onScrolling && onScrolling(true)
        timeOut.current = setTimeout(() => {
          setScrolling(false)
          onScrolling && onScrolling(false)
        }, 50)
      }
      scrollRef.current?.addEventListener('scroll', event)
      return () => scrollRef.current?.removeEventListener('scroll', event)
    }, [scrollRef.current, timeOut])

    return (
      <Element
        {...others}
        ref={useMergedRef(ref, scrollRef)}
        viewportRef={useMergedRef(viewportRef, externalvieportRef)}
        className={cx(className, classes.root)}
        type='hover'
      >
        <Box
          style={{
            height: `${height}px`
          }}
          className={classes.viewport}
        >
          <>
            {virtualizer
              .getForcedVirtualItems(forced)
              .filter((row) => row)
              .map((row) =>
                isFunction(wrapper) ? wrapper(row, node, classes.node) : wrapper
              )}
            {children}
          </>
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
