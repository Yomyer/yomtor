import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'

const defaultProps: Partial<SortableProps> = {}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'Sortable',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Sortable', unstyled }
    )

    return <div {...others} ref={ref} className={cx(className, classes.root)} />
  }
)

Sortable.displayName = '@yomtor/ui/Sortable'
