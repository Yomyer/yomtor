import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Checkbox as BaseCheckbox } from '@mantine/core'
import { CheckboxProps } from './Checkbox.props'
import useStyles from './Checkbox.styles'

const defaultProps: Partial<CheckboxProps> = {
  size: 'xs',
  radius: 'xs'
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'Checkbox',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Checkbox', unstyled }
    )

    return (
      <BaseCheckbox
        {...others}
        ref={ref}
        className={cx(className, classes.root)}
        classNames={classes}
      />
    )
  }
)

Checkbox.displayName = '@yomtor/ui/Checkbox'
