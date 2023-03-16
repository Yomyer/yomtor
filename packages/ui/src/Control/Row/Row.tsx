import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { RowProps } from './Row.props'
import useStyles from './Row.styles'

const defaultProps: Partial<RowProps> = {}

export const Row = forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Row',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Row', unstyled })

  return <div {...others} ref={ref} className={cx(className, classes.root)} />
})

Row.displayName = '@yomtor/ui/Row'
