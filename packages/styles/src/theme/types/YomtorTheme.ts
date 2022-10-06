import { MantineTheme } from '@mantine/styles'

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>
}

export type YomtorTheme = MantineTheme

export type YomtorThemeBase = Omit<YomtorTheme, 'fn'>

export type YomtorThemeOverride = DeepPartial<
    Omit<YomtorThemeBase, 'other' | 'components'>
> &
    Partial<Pick<YomtorThemeBase, 'other' | 'components'>>
