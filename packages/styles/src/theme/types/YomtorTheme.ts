import { MantineThemeColors, MantineTheme } from '@mantine/styles'
import { YomtorThemeColors } from './YomtorColor'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>
}

export type YomtorTheme = Omit<MantineTheme, 'colors'> & {
  colors: YomtorThemeColors
  primaryColor: keyof YomtorThemeColors
}

export type YomtorThemeBase = Omit<YomtorTheme, 'fn'>

export type YomtorThemeOverride = DeepPartial<
  Omit<YomtorThemeBase, 'other' | 'components'>
> &
  Partial<Pick<YomtorThemeBase, 'other' | 'components'>>
