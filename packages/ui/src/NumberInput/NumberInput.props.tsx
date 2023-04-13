import { NumberInputProps as BaseNumberInputProps } from '@mantine/core'
import { DraggableEventHandler } from '../Draggable'

export type NumberInputVariants =
  | 'default'
  | 'filled'
  | 'toggle'
  | 'transparent'

export interface NumberInputProps
  extends Omit<BaseNumberInputProps, 'variant' | 'value'> {
  compact?: boolean
  variant?: NumberInputVariants
  draggable?: boolean
  blur?: boolean
  onStart?: DraggableEventHandler
  onStop?: DraggableEventHandler
  draggingRef?: React.MutableRefObject<boolean>
  value?: number | 'mixed'
}
