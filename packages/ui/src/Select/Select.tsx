import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Select as BaseSelect } from '@mantine/core'
import { SelectProps } from './Select.props'
import useStyles from './Select.styles'

const defaultProps: Partial<SelectProps> = {
  variant: 'toggle',
  compact: true
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'Select',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'Select', unstyled }
    )

    return (
      <BaseSelect
        {...others}
        ref={ref}
        className={className}
        classNames={classes}
      />
    )
  }
)

Select.displayName = '@yomtor/ui/Select'
