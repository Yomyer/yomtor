import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { GroupProps } from './Group.props'
import useStyles from './Group.styles'

const defaultProps: Partial<GroupProps> = {}

export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { unstyled, className, ...others } = useComponentDefaultProps(
    'Group',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Group', unstyled })

  return <div {...others} ref={ref} className={cx(className, classes.root)} />
})

Group.displayName = '@yomtor/ui/Group'
