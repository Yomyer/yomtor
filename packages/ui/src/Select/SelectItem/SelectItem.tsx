import { CheckIcon } from '@yomtor/icons'
import React, { forwardRef } from 'react'
import { SelectItemProps } from './SelectItem.props'
import useStyles from './SelectItem.styles'

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, selected, right, className, ...others }, ref) => {
    const { classes, cx } = useStyles({ selected }, { name: 'Select' })

    return (
      <div ref={ref} className={cx(className, classes.root)} {...others}>
        <CheckIcon size='md' className={classes.check} />
        {right ? (
          <div className={classes.right}>
            <div>{label}</div>
            <div>
              <>{right}</>
            </div>
          </div>
        ) : (
          <div className={classes.ellipsis}>{label}</div>
        )}
      </div>
    )
  }
)
