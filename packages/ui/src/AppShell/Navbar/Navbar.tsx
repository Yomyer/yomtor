import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Navbar as BaseNavbar } from '@mantine/core'
import { NavbarProps } from './Navbar.props'
import useStyles from './Navbar.styles'

const defaultProps: Partial<NavbarProps> = {}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Navbar',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Navbar', unstyled })

  return (
    <BaseNavbar {...others} ref={ref} className={cx(className, classes.root)} />
  )
}) as any

Navbar.Section = BaseNavbar.Section
Navbar.displayName = '@yomtor/ui/Navbar'
