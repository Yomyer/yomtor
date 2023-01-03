import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'
import { Box } from '../../Box'
import { NodeProps } from './Node.props'
import useStyles from './Node.styles'

const defaultProps: Partial<NodeProps> = {}

export const Node = forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Aside',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Aside', unstyled })

  return <Box {...others} ref={ref} className={cx(className, classes.root)} />
})

Node.displayName = '@yomtor/ui/TreeViewNode'
