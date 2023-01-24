import type { YomtorTheme, YomtorThemeBase } from '../types'
import { fns } from './fns'

export function attachFunctions(themeBase: YomtorTheme): YomtorTheme {
  return {
    ...themeBase,
    fn: {
      ...themeBase.fn,
      variant: fns.variant(themeBase),
      getVariant: fns.getVariant(themeBase)
    }
  }
}
