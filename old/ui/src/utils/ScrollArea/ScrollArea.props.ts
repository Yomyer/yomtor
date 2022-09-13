import { DefaultProps } from '@yomtor/styles'
import { MouseEvent, SyntheticEvent } from 'react'

export type ScrollAreaProps = DefaultProps & {
    scrollbarSize?: number
    type?: 'auto' | 'always' | 'scroll' | 'hover'
    scrollHideDelay?: number
    dir?: 'ltr' | 'rtl'
    offsetScrollbars?: boolean
    viewportRef?: React.ForwardedRef<HTMLDivElement>
    onScroll?: (event: SyntheticEvent<HTMLDivElement>) => void
    onScrollStop?: (event: SyntheticEvent<HTMLDivElement>) => void
    onClick?: (event: MouseEvent) => void
    children: React.ReactNode
}
