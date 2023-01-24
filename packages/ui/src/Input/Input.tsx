import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Input as BaseInput } from '@mantine/core'
import { InputProps } from './Input.props'
import useStyles from './Input.styles'

const defaultProps: Partial<InputProps> = {
  size: 'sm',
  radius: 'xs',
  compact: true,
  variant: 'transparent'
}

export const _Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { unstyled, compact, variant, ...others } = useComponentDefaultProps(
    'Input',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles(
    { compact, variant, ...others },
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
