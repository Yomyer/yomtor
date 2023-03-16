import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ControlProps } from './Control.props'
import useStyles from './Control.styles'
import { ForwardRefWithStaticComponents } from '@mantine/utils'
import { Title } from './Title'

const defaultProps: Partial<ControlProps> = {}

const _Control = forwardRef<HTMLDivElement, ControlProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Control',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles(
    { ...others },
    { name: 'Control', unstyled }
  )

  return <div {...others} ref={ref} className={cx(className, classes.root)} />
}) as any

_Control.Title = Title
_Control.displayName = '@yomtor/ui/Control'

export const Control: ForwardRefWithStaticComponents<
  ControlProps,
  {
    Title: typeof Title
  }
> = _Control
