import { DEFAULT_THEME as MANTINE_DEFAULT_THEME } from '@mantine/styles'
import { YomtorThemeBase } from './types'

import { DEFAULT_COLORS } from './default-colors'

export const YOMTOR_COLORS = Object.keys(DEFAULT_COLORS)

export const DEFAULT_THEME: YomtorThemeBase = {
    ...MANTINE_DEFAULT_THEME,
    colors: DEFAULT_COLORS,
    primaryColor: 'primary'
}
