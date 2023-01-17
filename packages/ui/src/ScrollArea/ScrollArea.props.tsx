import { ScrollAreaProps as BaseScrollAreaProps } from '@mantine/core'
import { UIEvent } from 'react'

export type ScrollAreaTypes = 'auto' | 'always' | 'scroll' | 'hover' | 'never'

export interface ScrollAreaProps extends BaseScrollAreaProps {
  type?: ScrollAreaTypes
  onScroll?: (event: UIEvent) => void
}
