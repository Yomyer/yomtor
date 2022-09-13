import { DEFAULT_THEME as MANTINE_DEFAULT_THEME } from '@mantine/styles'
import { YomtorThemeBase } from './types'

import { DEFAULT_COLORS } from './default-colors'

export const YOMTOR_COLORS = Object.keys(DEFAULT_COLORS)

export const DEFAULT_THEME: YomtorThemeBase = {
    ...MANTINE_DEFAULT_THEME,
    secondaryShade: {
        light: 6,
        dark: 8
    },
    warningShade: {
        light: 6,
        dark: 8
    },
    errorShade: {
        light: 6,
        dark: 8
    },
    successShade: {
        light: 6,
        dark: 8
    },
    secondaryColor: 'blue',
    warningColor: 'orange',
    errorColor: 'red',
    successColor: 'green'
}
