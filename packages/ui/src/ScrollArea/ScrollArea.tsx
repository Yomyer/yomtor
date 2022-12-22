import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ScrollArea as BaseScrollArea } from '@mantine/core'
import { ScrollAreaProps } from './ScrollArea.props'
import useStyles from './ScrollArea.styles'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'

const defaultProps: Partial<ScrollAreaProps> = {}

const _ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'ScrollArea',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'ScrollArea', unstyled }
    )

    return (
      <BaseScrollArea
        {...others}
        viewportRef={ref}
        className={cx(className, classes.root)}
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
