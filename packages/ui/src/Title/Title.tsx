import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Title as BaseTitle } from '@mantine/core'
import { TitleProps } from './Title.props'
import useStyles from './Title.styles'

const defaultProps: Partial<TitleProps> = {}

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Title',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Title', unstyled })

  return <BaseTitle {...others} ref={ref} className={classes.root} />
}) as any

Title.displayName = '@yomtor/ui/Title'
