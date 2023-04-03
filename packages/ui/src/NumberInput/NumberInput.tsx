import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { NumberInput as BaseNumberInput } from '@mantine/core'
import { NumberInputProps } from './NumberInput.props'
import { Draggable } from '../Draggable'
import useStyles from './NumberInput.styles'

const defaultProps: Partial<NumberInputProps> = {
  size: 'md',
  radius: 'xs',
  compact: true,
  variant: 'toggle',
  hideControls: true,
  draggable: true
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      unstyled,
      icon,
      draggable,
      className,
      compact,
      variant,
      ...others
    } = useComponentDefaultProps('NumberInput', defaultProps, props)

    const { classes, cx } = useStyles(
      { compact, draggable, variant, ...others },
      { name: 'NumberInput', unstyled }
    )

    return (
      <BaseNumberInput
        {...others}
        ref={ref}
        className={className}
        classNames={classes}
        icon={
          <Draggable>
            <div className={classes.drggable}>{icon}</div>
          </Draggable>
        }
      />
    )
  }
)

NumberInput.displayName = '@yomtor/ui/NumberInput'
