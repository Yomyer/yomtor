import { MantineThemeColors, MantineTheme, CSSObject } from '@mantine/styles'
import { YomtorThemeColors } from './YomtorColor'
import { VariantInput, VariantOutput } from '../functions/fns/variant/variant'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>
}

type YomtorThemeFunctionsType = MantineTheme['fn']

interface YomtorThemeFunctions
  extends Omit<YomtorThemeFunctionsType, 'variant'> {
  variant(payload: VariantInput): VariantOutput
  getVariant(playload: VariantInput): CSSObject
}

export type YomtorTheme = Omit<MantineTheme, 'colors' | 'fn'> & {
  colors: YomtorThemeColors
  primaryColor: keyof YomtorThemeColors
  fn: YomtorThemeFunctions
}

export type YomtorThemeBase = Omit<YomtorTheme, 'fn'>

export type YomtorThemeOverride = DeepPartial<
  Omit<YomtorThemeBase, 'other' | 'components'>
> &
  Partial<Pick<YomtorThemeBase, 'other' | 'components'>>
