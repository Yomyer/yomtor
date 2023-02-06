import React, { forwardRef, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Header as BaseHeader } from '@mantine/core'
import { HeaderProps } from './Header.props'
import useStyles from './Header.styles'

const defaultProps: Partial<HeaderProps> = {}

export const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { ...others } = useComponentDefaultProps('Header', defaultProps, props)

  const { classes, cx } = useStyles(
    { ...others },
    { name: 'Header', unstyled: others.unstyled }
  )

  return <BaseHeader {...others} />
}) as any

Header.displayName = '@yomtor/ui/Header'
