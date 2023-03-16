import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TitleProps } from './Title.props'
import useStyles from './Title.styles'

const defaultProps: Partial<TitleProps> = {}

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Title',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Title', unstyled })

  return (
    <div {...others} ref={ref} className={cx(className, classes.root)}>
      Title
    </div>
  )
})

Title.displayName = '@yomtor/ui/Title'
