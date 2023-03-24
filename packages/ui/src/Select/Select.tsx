import React, { forwardRef, useEffect, useRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Select as BaseSelect } from '@mantine/core'
import { SelectProps } from './Select.props'
import useStyles from './Select.styles'
import { useMergedRef } from '@yomtor/hooks'

const defaultProps: Partial<SelectProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  variant: 'toggle',
  initiallyOpened: true
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { unstyled, compact, className, ...others } =
      useComponentDefaultProps('Select', defaultProps, props)
    const select = useRef<HTMLElement>()

    const { classes, cx } = useStyles(
      { compact, ...others },
      { name: 'Select', unstyled }
    )

    return (
      <BaseSelect
        {...others}
        ref={useMergedRef(ref, select)}
        className={className}
        classNames={classes}
      />
    )
  }
)

Select.displayName = '@yomtor/ui/Select'
