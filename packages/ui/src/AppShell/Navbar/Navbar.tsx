import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Navbar as BaseNavbar } from '@mantine/core'
import { NavbarProps } from './Navbar.props'
import useStyles from './Navbar.styles'
import { ForwardRefWithStaticComponents } from '@yomtor/utils'
import { Draggable } from '../../Draggable'
import { setGlobalCursor, ResizePanel } from '@yomtor/cursors'

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

    const startHandler = () => {
      setGlobalCursor(ResizePanel)
    }

    // width.base = 400

    return (
      <BaseNavbar
        {...others}
        ref={ref}
        width={width}
        className={cx(className, classes.root)}
      >
        {children}
        <Draggable axis='x' onStart={startHandler}>
          <div className={classes.handler} />
        </Draggable>
      </BaseNavbar>
    )
  }
) as any

Navbar.Section = BaseNavbar.Section
Navbar.displayName = '@yomtor/ui/Navbar'
