import { SelectProps as BaseSelectProps } from '@mantine/core'

export type SelectVariants = 'default' | 'filled' | 'toggle' | 'transparent'

export interface SelectProps extends Omit<BaseSelectProps, 'variant'> {
  compact?: boolean
  variant?: SelectVariants
  ticked?: boolean
}
