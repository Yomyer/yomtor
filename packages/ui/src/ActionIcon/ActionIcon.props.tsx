import { ActionIconProps as BaseActionIconProps } from '@mantine/core'
import { ReactNode } from 'react'

export interface ActionIconProps extends BaseActionIconProps {
  compact?: boolean
  actived?: boolean
  icon?: ReactNode
}
