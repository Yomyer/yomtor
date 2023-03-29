import { CheckIcon } from '@yomtor/icons'
import React, { forwardRef } from 'react'
import { SelectItemProps } from './SelectItem.props'
import useStyles from './SelectItem.styles'
import { Group } from '../../Group'

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, selected, className, ...others }, ref) => {
    const { classes, cx } = useStyles({ selected }, { name: 'Select' })

    return (
      <div ref={ref} className={cx(className, classes.root)} {...others}>
        <CheckIcon size='md' className={classes.check} />
        <div className={classes.ellipsis}>{label}</div>
      </div>
    )
  }
)
