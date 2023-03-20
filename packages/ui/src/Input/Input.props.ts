import { InputProps as BaseInputProps } from '@mantine/core'

export type InputVariants = 'default' | 'filled' | 'toggle' | 'transparent'

export interface InputProps extends Omit<BaseInputProps, 'variant'> {
  compact?: boolean
  variant?: InputVariants
}
