import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Navbar as BaseNavbar } from '@mantine/core'
import { NavbarProps } from './Navbar.props'
import useStyles from './Navbar.styles'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'

const defaultProps: Partial<NavbarProps> = {}

type NavbarComponent = ForwardRefWithStaticComponents<
  NavbarProps,
  { Section: typeof BaseNavbar.Section }
>

export const Navbar: NavbarComponent = forwardRef<HTMLDivElement, NavbarProps>(
  (props, ref) => {
    const { unstyled, className, children, width, ...others } =
      useComponentDefaultProps('Navbar', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others, children },
      { name: 'Navbar', unstyled }
    )

    width.base = 400

    return (
      <BaseNavbar
        {...others}
        ref={ref}
        width={width}
        className={cx(className, classes.root)}
      >
        {children}
        <div className={classes.handler} />
      </BaseNavbar>
    )
  }
) as any

Navbar.Section = BaseNavbar.Section
Navbar.displayName = '@yomtor/ui/Navbar'
