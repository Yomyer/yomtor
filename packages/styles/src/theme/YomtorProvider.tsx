import React, { useContext } from 'react'

import { MantineProvider, MantineProviderProps } from '@mantine/styles'
import { YomtorThemeOverride } from './types'
import { mergeDeep } from './utils/merge-deep'
import { DEFAULT_THEME } from './default-theme'
import createCache from '@emotion/cache'

export interface YomtorProviderProps extends MantineProviderProps {
    theme?: YomtorThemeOverride
}

const YomtorCache = createCache({ key: 'yomtor', prepend: true })

export function YomtorProvider({
    children,
    theme,
    withGlobalStyles = true,
    withNormalizeCSS = true,
    ...others
}: YomtorProviderProps) {
    theme = mergeDeep(DEFAULT_THEME, theme)

    return (
        <MantineProvider
            theme={theme}
            withGlobalStyles
            withNormalizeCSS
            {...others}
            emotionCache={YomtorCache}
        >
            {children}
        </MantineProvider>
    )
}