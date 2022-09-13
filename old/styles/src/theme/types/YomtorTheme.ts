import { CSSObject } from '../../tss'
import { BreakpointsOptions } from '../createBreakpoints'
import { HeadingOptions } from '../createHeadings'
import { YomtorPalette, YomtorPaletteColor } from '../createPalete'
import { RadiusOptions } from '../createRadius'
import { ShadowOptions } from '../createShadows'
import { SizesOptions } from '../createSizes'
import { SpacingOptions } from '../createSpacing'
import { TypographyOptions } from '../createTypography'
import { rgba, Size, YomtorColorVariant } from '../fns'

export type YomtorThemeComponents = Record<string, ThemeComponent>

export type Modes = 'light' | 'dark'

export type YomtorTheme = {
    palette: YomtorPalette
    breakpoints: BreakpointsOptions
    type: Modes
    shadows: ShadowOptions
    spacing: SpacingOptions
    sizes: SizesOptions
    radius: RadiusOptions
    debug: boolean
    headings: HeadingOptions
    typography: TypographyOptions
    vars: { [key: string]: string }
    components: YomtorThemeComponents
    fn: {
        size: Size
        rgba: typeof rgba
        colorVariant: YomtorColorVariant
        getContrastText?: (
            background: string,
            contrastThreshold?: number
        ) => string
        augmentColor?: (
            color: YomtorPaletteColor | string,
            tonalOffset?: number,
            contrastThreshold?: number
        ) => YomtorPaletteColor
    }
}

interface ThemeComponent {
    defaultProps?: Record<string, any>
    classNames?: Record<string, string>
    styles?:
        | Record<string, CSSObject>
        | ((theme: YomtorTheme, params: any) => Record<string, CSSObject>)
}
