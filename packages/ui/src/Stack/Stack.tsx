import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Stack as BaseStack } from '@mantine/core'
import { StackProps } from './Stack.props'
import useStyles from './Stack.styles'

const defaultProps: Partial<StackProps> = {}

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Stack',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Stack', unstyled })

  return <BaseStack {...others} ref={ref} className={classes.root} />
}) as any

Stack.displayName = '@yomtor/ui/Stack'
