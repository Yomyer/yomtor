import { NumberInputProps as BaseNumberInputProps } from '@mantine/core'

export type NumberInputVariants =
  | 'default'
  | 'filled'
  | 'toggle'
  | 'transparent'

export interface NumberInputProps
  extends Omit<BaseNumberInputProps, 'variant'> {
  compact?: boolean
  variant?: NumberInputVariants
  draggable?: boolean
}
