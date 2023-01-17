import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { SortableProps } from './Sortable.props'
import useStyles from './Sortable.styles'
import { Droppable } from '../../Droppable'
import { Draggable } from '../../Draggable'

const defaultProps: Partial<SortableProps> = {}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>(
  (props, ref) => {
    const { unstyled, children, className, ...others } =
      useComponentDefaultProps('Sortable', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Sortable', unstyled }
    )

    return (
      <Droppable>{() => <Draggable phantom>{children}</Draggable>}</Droppable>
    )
  }
)

Sortable.displayName = '@yomtor/ui/Sortable'
