import { DefaultProps } from '@yomtor/styles'
import { ReactNode } from 'react'

export interface EditorProviderProps {
  compact?: boolean
  actived?: boolean
  children: ReactNode
}
