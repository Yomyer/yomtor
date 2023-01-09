import { Tuple } from '@mantine/styles'

export type DefaultYomtorColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning'
  | 'success'
  | 'dark'
  | 'light'
  | 'gray'
  | (string & {})

export type YomtorThemeColorsOverride = {}

export type YomtorThemeColors = YomtorThemeColorsOverride extends {
  colors: Record<infer CustomColors, Tuple<string, 10>>
}
  ? Record<CustomColors, Tuple<string, 10>>
  : Record<DefaultYomtorColor, Tuple<string, 10>>

export type YomtorColor = keyof YomtorThemeColors
