import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Group as BaseGroup } from '@mantine/core'
import { GroupProps } from './Group.props'
import useStyles from './Group.styles'

const defaultProps: Partial<GroupProps> = {}

export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Group',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Group', unstyled })

  return <BaseGroup {...others} ref={ref} className={classes.root} />
}) as any

Group.displayName = '@yomtor/ui/Group'
