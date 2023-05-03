import { ActionIconProps as BaseActionIconProps } from '@mantine/core'
import { ReactNode } from 'react'
import { Variants } from '@yomtor/styles'

export interface ActionIconProps extends BaseActionIconProps {
  compact?: boolean
  actived?: boolean
  icon?: ReactNode
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
