import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/core'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Input as BaseInput } from '@mantine/core'
import { InputProps } from './Input.props'
import useStyles from './Input.styles'

const defaultProps: Partial<InputProps> = {
  size: 'xs',
  radius: 'xs',
  compact: true
}

export const _Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { unstyled, compact, ...others } = useComponentDefaultProps(
    'Input',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles(
    { compact, ...others },
    { name: 'Input', unstyled }
  )

  return <BaseInput {...others} ref={ref} classNames={classes} />
}) as any

_Input.displayName = '@yomtor/ui/Input'
_Input.Wrapper = BaseInput.Wrapper
_Input.Label = BaseInput.Label
_Input.Description = BaseInput.Description
_Input.Error = BaseInput.Error

export const Input = createPolymorphicComponent<
  'input',
  InputProps,
  {
    Wrapper: typeof BaseInput.Wrapper
    Label: typeof BaseInput.Label
    Description: typeof BaseInput.Description
    Error: typeof BaseInput.Error
  }
>(_Input)
