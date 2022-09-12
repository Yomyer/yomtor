import type { CSSObject } from './types'
import { useCss } from './use-css'
import {
    useYomtorTheme,
    useYomtorThemeStyles,
    useYomtorProviderStyles
} from '../theme/YomtorProvider'
import { mergeClassNames } from './merge-class-names'
import { YomtorTheme } from '../theme/types'

type ContextStyles = ReturnType<typeof useYomtorProviderStyles>

export interface UseStylesOptions<Key extends string> {
    classNames?: Partial<Record<Key, string>>
    styles?:
        | Partial<Record<Key, CSSObject>>
        | ((
              theme: YomtorTheme,
              params: unknown
          ) => Partial<Record<Key, CSSObject>>)
    name: string
    unstyled?: boolean
}

function createRef(refName: string) {
    return `__yomtor-ref-${refName || ''}`
}

function getStyles<Key extends string>(
    styles: UseStylesOptions<Key>['styles'] | ContextStyles,
    theme: YomtorTheme,
    params: unknown
): CSSObject {
    const extractStyles = (stylesPartial: UseStylesOptions<Key>['styles']) =>
        typeof stylesPartial === 'function'
            ? stylesPartial(theme, params || {})
            : stylesPartial || {}

    if (Array.isArray(styles)) {
        return styles
            .map((item) => extractStyles(item.styles))
            .reduce<Record<string, CSSObject>>((acc, item) => {
                Object.keys(item).forEach((key) => {
                    if (!acc[key]) {
                        acc[key] = { ...item[key] }
                    } else {
                        acc[key] = { ...acc[key], ...item[key] }
                    }
                })
                return acc
            }, {})
    }

    return extractStyles(styles)
}

export function createStyles<
    Key extends string = string,
    Params = Record<string, object>
>(
    getCssObjectOrCssObject:
        | ((
              theme: YomtorTheme,
              params: Params,
              createRef: (refName: string) => string
          ) => Record<Key, CSSObject>)
        | Record<Key, CSSObject>
) {
    const getCssObject =
        typeof getCssObjectOrCssObject === 'function'
            ? getCssObjectOrCssObject
            : () => getCssObjectOrCssObject

    function useStyles(params?: Params, options?: UseStylesOptions<Key>) {
        const theme = useYomtorTheme()
        const context = useYomtorProviderStyles(options?.name)

        const { css, cx } = useCss()

        const cssObject = getCssObject(theme, params, createRef)
        const componentStyles = getStyles(options?.styles, theme, params)
        const providerStyles = getStyles(context, theme, params)

        const classes = Object.fromEntries(
            Object.keys(cssObject).map((key) => {
                const mergedStyles = cx(
                    { [css(cssObject[key])]: !options?.unstyled },
                    css(providerStyles[key]),
                    css(componentStyles[key])
                )
                return [key, mergedStyles]
            })
        ) as Record<Key, string>

        return {
            classes: mergeClassNames(
                cx,
                classes,
                options?.classNames,
                options?.name
            ),
            cx,
            theme
        }
    }

    return useStyles
}
