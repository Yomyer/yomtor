import { DEFAULT_THEME as MANTINE_DEFAULT_THEME, rem } from '@mantine/styles'
import { YomtorThemeBase } from './types'

import { DEFAULT_COLORS } from './default-colors'

export const YOMTOR_COLORS = Object.keys(DEFAULT_COLORS)

export const DEFAULT_THEME: YomtorThemeBase = {
  ...MANTINE_DEFAULT_THEME,
  colors: DEFAULT_COLORS,
  primaryColor: 'primary',
  headings: {
    ...MANTINE_DEFAULT_THEME.headings,
    sizes: {
      h1: { fontSize: rem(26), lineHeight: 1.35, fontWeight: undefined },
      h2: { fontSize: rem(22), lineHeight: 1.4, fontWeight: undefined },
      h3: { fontSize: rem(18), lineHeight: 1.45, fontWeight: undefined },
      h4: { fontSize: rem(16), lineHeight: 1.5, fontWeight: undefined },
      h5: { fontSize: rem(14), lineHeight: 1.5, fontWeight: undefined },
      h6: { fontSize: rem(11), lineHeight: 1.5, fontWeight: undefined }
    }
  },
  icons: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(20),
    xl: rem(26)
  }
}
