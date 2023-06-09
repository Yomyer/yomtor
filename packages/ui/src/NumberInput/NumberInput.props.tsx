import { NumberInputProps as BaseNumberInputProps } from '@mantine/core'
import { DraggableEventHandler } from '../Draggable'

export type NumberInputVariants =
  | 'default'
  | 'filled'
  | 'toggle'
  | 'transparent'

export interface NumberInputProps
  extends Omit<BaseNumberInputProps, 'variant' | 'onChange'> {
  compact?: boolean
  variant?: NumberInputVariants
  draggable?: boolean
  blur?: boolean
  onStart?: DraggableEventHandler
  onStop?: DraggableEventHandler
  onMix?(value: number | ''): void
  onChange?(value: number | '', mixed?: boolean): void
  mixed?: boolean
  mixedLabel?: string
  empty?: boolean
}
