import type { CSSProperties } from 'react'
import { CSSObject } from '../../tss/types'
import { YomtorStyleSystemProps } from './YomtorStyleSystem'
import { YomtorTheme } from './YomtorTheme'

export type Sx = CSSObject | ((theme: YomtorTheme) => CSSObject)

export type ClassNames<StylesNames extends string> = Partial<
    Record<StylesNames, string>
>
export type Styles<
    StylesNames extends string,
    StylesParams extends Record<string, any> = never
> =
    | Partial<Record<StylesNames, CSSObject>>
    | ((
          theme: YomtorTheme,
          params: StylesParams
      ) => Partial<Record<StylesNames, CSSObject>>)

export type DefaultProps<
    StylesNames extends string = never,
    StylesParams extends Record<string, any> = never
> = YomtorStyleSystemProps & {
    className?: string
    style?: CSSProperties
    sx?: Sx
    classNames?: ClassNames<StylesNames>
    styles?: Styles<StylesNames, StylesParams>
    unstyled?: boolean
}
