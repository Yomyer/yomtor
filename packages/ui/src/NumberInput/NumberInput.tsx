import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { NumberInput as BaseNumberInput } from '@mantine/core'
import { NumberInputProps } from './NumberInput.props'
import useStyles from './NumberInput.styles'

const defaultProps: Partial<NumberInputProps> = {}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  (props, ref) => {
    const { unstyled, className, ...others } = useComponentDefaultProps(
      'NumberInput',
      defaultProps,
      props
    )

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'NumberInput', unstyled }
    )

    return (
      <BaseNumberInput
        {...others}
        ref={ref}
        className={cx(className, classes.root)}
      />
    )
  }
)

NumberInput.displayName = '@yomtor/ui/NumberInput'
