import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import {
  YomtorProvider,
  YomtorTheme,
  ColorSchemeProvider
} from '@yomtor/styles'

export const Container: React.FC = ({ children }) => {
  const darkMode = useDarkMode()
  const theme = { colorScheme: darkMode ? 'dark' : 'light' } as YomtorTheme

  return (
    <ColorSchemeProvider
      colorScheme={darkMode ? 'dark' : 'light'}
      toggleColorScheme={() => {}}
    >
      <YomtorProvider theme={theme}>
        <div>{children}</div>
      </YomtorProvider>
    </ColorSchemeProvider>
  )
}
