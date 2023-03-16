import { DEFAULT_THEME as MANTINE_DEFAULT_THEME } from '@mantine/styles'
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
      h1: { fontSize: '1.625rem', lineHeight: 1.35, fontWeight: undefined },
      h2: { fontSize: '1.375rem', lineHeight: 1.4, fontWeight: undefined },
      h3: { fontSize: '1.125rem', lineHeight: 1.45, fontWeight: undefined },
      h4: { fontSize: '1rem', lineHeight: 1.5, fontWeight: undefined },
      h5: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: undefined },
      h6: { fontSize: '0.685rem', lineHeight: 1.5, fontWeight: undefined }
    }
  }
}
