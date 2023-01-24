import { InputProps as BaseInputProps } from '@mantine/core'

export type InputVariant = 'default' | 'filled' | 'transparent'

export interface InputProps extends Omit<BaseInputProps, 'variant'> {
  compact?: boolean
  variant?: InputVariant
}
