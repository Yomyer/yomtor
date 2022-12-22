import { ScrollAreaProps as BaseScrollAreaProps } from '@mantine/core'

export type ScrollAreaTypes = 'auto' | 'always' | 'scroll' | 'hover' | 'never'

export interface ScrollAreaProps extends BaseScrollAreaProps {
  type?: ScrollAreaTypes
}
