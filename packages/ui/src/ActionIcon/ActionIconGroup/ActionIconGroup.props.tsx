import { DefaultProps, Variants } from '@yomtor/styles'
import { ActionIconGroupStylesParams } from './ActionIconGroup.styles'

export interface ActionIconGroupProps
  extends DefaultProps<never, ActionIconGroupStylesParams>,
    React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  buttonBorderWidth?: number | string
  compact?: boolean
  variant?: Variants<
    | 'subtle'
    | 'filled'
    | 'outline'
    | 'light'
    | 'default'
    | 'transparent'
    | 'gradient'
    | 'toggle'
  >
}
