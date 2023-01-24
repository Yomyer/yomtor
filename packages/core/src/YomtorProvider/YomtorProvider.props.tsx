import { DefaultProps } from '@yomtor/styles'
import { ReactNode } from 'react'

export interface YomtorProviderProps {
  compact?: boolean
  actived?: boolean
  children: ReactNode
}
