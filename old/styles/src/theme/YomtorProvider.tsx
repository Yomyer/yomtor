import React, { createContext, useContext } from 'react'
import type { Options as EmotionCacheOptions } from '@emotion/cache'
import { Global } from '@emotion/react'
import type { CSSObject } from '../tss/types'
import { YomtorTheme } from './types'
import { NormalizeCSS } from './NormalizeCSS'
import { createTheme } from './theme'
import { Modes } from '.'
import { ThemeProvider } from '@emotion/react'

type ProviderStyles = Record<
    string,
    | Record<string, CSSObject>
    | ((theme: YomtorTheme) => Record<string, CSSObject>)
>

interface YomtorThemeContextType {
    theme: YomtorTheme
    styles: ProviderStyles
    mode: Modes
    emotionOptions: EmotionCacheOptions
}

export const YomtorThemeContext = createContext<YomtorThemeContextType>({
    theme: null,
    styles: {},
    mode: 'light',
    emotionOptions: { key: 'yomtor', prepend: true }
})

export function useYomtorTheme() {
    return useContext(YomtorThemeContext)?.theme
}

export function useYomtorProviderStyles(component: string | string[]) {
    const theme = useYomtorTheme()

    const getStyles = (name: string) => ({
        styles: theme.components[name]?.styles || {},
        classNames: theme.components[name]?.classNames || {}
    })

    if (Array.isArray(component)) {
        return component.map(getStyles)
    }

    return [getStyles(component)]
}

export function useYomtorThemeStyles() {
    return useContext(YomtorThemeContext)?.styles || {}
}

export function useYomtorMode() {
    return useContext(YomtorThemeContext)?.mode || 'light'
}

export function useYomtorEmotionOptions(): EmotionCacheOptions {
    return (
        useContext(YomtorThemeContext)?.emotionOptions || {
            key: 'yomtor',
            prepend: true
        }
    )
}

export interface YomtorProviderProps {
    theme?: Partial<YomtorTheme>
    styles?: ProviderStyles
    emotionOptions?: EmotionCacheOptions
    withNormalizeCSS?: boolean
    withGlobalStyles?: boolean
    children: React.ReactNode
}

function GlobalStyles() {
    const theme = useYomtorTheme()

    return (
        <Global
            styles={{
                '*, *::before, *::after': {
                    boxSizing: 'border-box'
                },

                ':root': theme.vars,
                'body, html': {
                    height: '100%'
                },
                body: {
                    background: theme.palette.background.main,
                    color: theme.palette.text.main,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.fontSizes.md,
                    lineHeight: theme.typography.lineHeight
                }
            }}
        />
    )
}

export function YomtorProvider({
    theme,
    styles = {},
    emotionOptions,
    withNormalizeCSS = false,
    withGlobalStyles = true,
    children
}: YomtorProviderProps) {
    theme = theme && theme.vars ? theme : createTheme(theme)

    return (
        <ThemeProvider theme={theme}>
            <YomtorThemeContext.Provider
                value={{
                    theme: theme as YomtorTheme,
                    styles,
                    mode: theme.type,
                    emotionOptions
                }}
            >
                {withNormalizeCSS && <NormalizeCSS />}
                {withGlobalStyles && <GlobalStyles />}
                {children}
            </YomtorThemeContext.Provider>
        </ThemeProvider>
    )
}

YomtorProvider.displayName = 'YomtorProvider'
