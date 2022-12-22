import React, { forwardRef, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Navbar as BaseNavbar } from '@mantine/core'
import { NavbarProps } from './Navbar.props'
import useStyles from './Navbar.styles'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'

import { ResizePanel } from '../ResizePanel'

const defaultProps: Partial<NavbarProps> = {}

export const _Navbar = forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {
  const { unstyled, width, ...others } = useComponentDefaultProps(
    'Navbar',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Navbar', unstyled })

  return (
    <ResizePanel
      {...others}
      sizes={width}
      direction='e'
      ref={ref}
      panel={BaseNavbar}
    />
  )
}) as any

_Navbar.Section = BaseNavbar.Section
_Navbar.displayName = '@yomtor/ui/Navbar'

export const Navbar: ForwardRefWithStaticComponents<
  NavbarProps,
  {
    Section: typeof BaseNavbar.Section
  }
> = _Navbar
