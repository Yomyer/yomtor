import { DefaultProps, Variants, YomtorColor, YomtorSize } from '@yomtor/styles'
import { GroupInputStylesParams } from './GroupInput.styles'

export interface GroupInputProps
  extends DefaultProps<never, GroupInputStylesParams>,
    React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  buttonBorderWidth?: number | string
  compact?: boolean
  disabled?: boolean
  color?: YomtorColor
  radius?: YomtorSize
  size?: YomtorSize
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
