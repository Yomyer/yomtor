import type { YomtorTheme } from '@yomtor/styles'

export function getFontSizeValue(size: any, theme: YomtorTheme) {
  return theme.fn.size({ size, sizes: theme.fontSizes })
}
