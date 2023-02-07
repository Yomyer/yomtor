import React, { forwardRef } from 'react'
import { BoxProps } from './Box.props'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useSx } from './use-sx/use-sx'
import { extractSystemStyles } from './style-system-props/extract-system-styles'

export const _Box = forwardRef<HTMLDivElement, BoxProps & { component: any }>(
  ({ className, component, style, sx, ...others }, ref) => {
    const { systemStyles, rest } = extractSystemStyles(others)
    const Element = component || 'div'
    return (
      <Element
        ref={ref}
        className={useSx(sx, systemStyles, className)}
        style={style}
        {...rest}
      />
    )
  }
)

_Box.displayName = 'Box'

export const Box = createPolymorphicComponent<'div', BoxProps>(_Box)
