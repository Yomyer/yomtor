import type { CSSProperties } from 'react'
import { CSSObject } from '../../tss/types'
import { YomtorStyleSystemProps } from './YomtorStyleSystem'
import { YomtorTheme } from './YomtorTheme'

export type Sx = CSSObject | ((theme: YomtorTheme) => CSSObject)

export type DefaultProps<
    StylesNames extends string = never,
    StylesParams extends Record<string, any> = never
> = YomtorStyleSystemProps & {
    className?: string
    style?: CSSProperties
    sx?: Sx
    classNames?: Partial<Record<StylesNames, string>>
    styles?:
        | Partial<Record<StylesNames, CSSObject>>
        | ((theme: YomtorTheme) => Partial<Record<StylesNames, StylesParams>>)
    unstyled?: boolean
}
