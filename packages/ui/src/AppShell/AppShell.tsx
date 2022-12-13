import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { AppShell as BaseAppShell } from '@mantine/core'
import { AppShellProps } from './AppShell.props'
import useStyles from './AppShell.styles'

const defaultProps: Partial<AppShellProps> = {}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'AppShell',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'AppShell', unstyled }
    )

    return (
      <BaseAppShell
        {...others}
        ref={ref}
        className={cx(className, classes.root)}
      />
    )
  }
)

AppShell.displayName = '@yomtor/ui/AppShell'
