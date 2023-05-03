import React, { forwardRef, UIEvent, useEffect, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ScrollArea as BaseScrollArea } from '@mantine/core'
import { ScrollAreaProps } from './ScrollArea.props'
import useStyles from './ScrollArea.styles'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'
import { useMergedRef } from '@yomtor/hooks'

const defaultProps: Partial<ScrollAreaProps> = {}

const _ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (props, ref) => {
    const { unstyled, viewportRef, className, onScroll, ...others } =
      useComponentDefaultProps('ScrollArea', defaultProps, props)

    const scrollRef = useRef<HTMLElement>()
    const { classes, cx } = useStyles(
      { ...others },
      { name: 'ScrollArea', unstyled }
    )

    useEffect(() => {
      if (!onScroll) return

      scrollRef.current?.addEventListener('scroll', (event) =>
        onScroll(event as unknown as UIEvent)
      )

      return () =>
        scrollRef.current?.removeEventListener('scroll', (event) =>
          onScroll(event as unknown as UIEvent)
        )
    }, [scrollRef])

    return (
      <BaseScrollArea
        {...others}
        viewportRef={useMergedRef(viewportRef, scrollRef)}
        className={cx(className, classes.root)}
        ref={ref}
      />
    )
  }
) as any

_ScrollArea.AutoSize = BaseScrollArea.Autosize
_ScrollArea.displayName = '@yomtor/ui/ScrollArea'

export const ScrollArea: ForwardRefWithStaticComponents<
  ScrollAreaProps,
  {
    Autosize: typeof BaseScrollArea.Autosize
  }
> = _ScrollArea
