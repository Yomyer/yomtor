import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Box as BaseBox } from '@mantine/core'
import { BoxProps } from './Box.props'
import useStyles from './Box.styles'

const defaultProps: Partial<BoxProps> = {}

export const _Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Box',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Box', unstyled })

  return (
    <BaseBox
      {...others}
      ref={ref}
      className={cx(classes.root, others.className)}
    />
  )
}) as any

_Box.displayName = '@yomtor/ui/Box'

export const Box = createPolymorphicComponent<'div', BoxProps>(_Box)
