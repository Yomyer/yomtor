import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ControlProps } from './Control.props'
import useStyles from './Control.styles'

const defaultProps: Partial<ControlProps> = {}

export const Control = forwardRef<HTMLDivElement, ControlProps>(
  (props, ref) => {
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
  }
)

Control.displayName = '@yomtor/ui/Control'
