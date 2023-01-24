import React, { useContext, useEffect } from 'react'

import {
  MantineProvider,
  MantineProviderProps,
  useMantineTheme
} from '@mantine/styles'
import { YomtorThemeOverride } from './types'
import { mergeDeep } from './utils/merge-deep'
import { DEFAULT_THEME } from './default-theme'
import createCache from '@emotion/cache'
import { Overwrite } from './Overwrite'

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
      {...others}
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={YomtorCache}
    >
      <Overwrite />
      {children}
    </MantineProvider>
  )
}
