import { Input } from '@mantine/core'
import React, { forwardRef } from 'react'
import { InputLabelProps } from './InputLabel.props'
import useStyles from './InputLabel.styles'

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ __staticSelector, position, below, unstyled, ...others }, ref) => {
    const { classes, cx } = useStyles(
      { position, below },
      {
        name: ['InputWrapper', __staticSelector],
        unstyled
      }
    )

    return (
      <Input.Label
        {...{
          ...others,
          unstyled,
          __staticSelector,
          classNames: classes
        }}
      />
    )
  }
)

InputLabel.displayName = '@mantine/core/InputLabel'
