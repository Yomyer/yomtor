import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Center as BaseCenter } from '@mantine/core'
import { CenterProps } from './Center.props'
import useStyles from './Center.styles'

const defaultProps: Partial<CenterProps> = {}

export const _Center = forwardRef<HTMLDivElement, CenterProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Center',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Center', unstyled })

  return (
    <BaseCenter {...others} ref={ref} className={cx(className, classes.root)} />
  )
}) as any

_Center.displayName = '@yomtor/ui/Center'

export const Center = createPolymorphicComponent<'div', CenterProps>(_Center)
