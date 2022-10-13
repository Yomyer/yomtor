import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Badge as BaseBadge } from '@mantine/core'
import { BadgeProps } from './Badge.props'
import useStyles from './Badge.styles'

const defaultProps: Partial<BadgeProps> = {}

export const _Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Badge',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Badge', unstyled })

  return (
    <BaseBadge {...others} ref={ref} className={cx(className, classes.root)} />
  )
}) as any

_Badge.displayName = '@yomtor/ui/Badge'

export const Badge = createPolymorphicComponent<'div', BadgeProps>(_Badge)
