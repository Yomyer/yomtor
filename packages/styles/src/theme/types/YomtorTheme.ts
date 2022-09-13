import { MantineTheme, MantineThemeColors } from '@mantine/styles'
import { MantinePrimaryShade } from '@mantine/styles/lib/theme/types/MantineTheme'

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export interface YomtorTheme extends MantineTheme {
    secondaryColor: keyof MantineThemeColors
    warningColor: keyof MantineThemeColors
    errorColor: keyof MantineThemeColors
    successColor: keyof MantineThemeColors
    secondaryShade: Shade | MantinePrimaryShade
    warningShade: Shade | MantinePrimaryShade
    errorShade: Shade | MantinePrimaryShade
    successShade: Shade | MantinePrimaryShade
}

export type YomtorThemeBase = Omit<YomtorTheme, 'fn'>

export type YomtorThemeOverride = DeepPartial<
    Omit<YomtorThemeBase, 'other' | 'components'>
> &
    Partial<Pick<YomtorThemeBase, 'other' | 'components'>>
