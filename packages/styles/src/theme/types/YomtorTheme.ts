import { MantineTheme } from '@mantine/styles'

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export interface YomtorTheme extends MantineTheme {}

export type YomtorThemeBase = Omit<YomtorTheme, 'fn'>

export type YomtorThemeOverride = DeepPartial<
    Omit<YomtorThemeBase, 'other' | 'components'>
> &
    Partial<Pick<YomtorThemeBase, 'other' | 'components'>>
