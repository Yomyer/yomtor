import { CSSProperties } from 'react'
import type { YomtorColor, YomtorTheme, YomtorThemeBase } from '../../../types'
import { MantineGradient } from '@mantine/styles'

export interface VariantInput {
  variant: string
  color?: YomtorColor
  gradient?: MantineGradient
  primaryFallback?: boolean
  actived?: boolean
  withFocus?: boolean
  withPrimaryColor?: boolean
}

export interface VariantOutput {
  border?: CSSProperties['borderColor']
  background?: CSSProperties['backgroundColor']
  color?: CSSProperties['color']
  hover?: VariantOutput | CSSProperties['backgroundColor']
  active?: VariantOutput | CSSProperties['backgroundColor']
  focus?: VariantOutput | CSSProperties['backgroundColor']
}

let OLD_VARIANT = null

interface ColorInfo {
  isSplittedColor: boolean
  key?: string
  shade?: number
}

function getColorIndexInfo(color: string, theme: YomtorThemeBase): ColorInfo {
  if (typeof color === 'string' && color.includes('.')) {
    const [splittedColor, _splittedShade] = color.split('.')
    const splittedShade = parseInt(_splittedShade, 10)

    if (
      splittedColor in theme.colors &&
      splittedShade >= 0 &&
      splittedShade < 10
    ) {
      return { isSplittedColor: true, key: splittedColor, shade: splittedShade }
    }
  }

  return { isSplittedColor: false }
}

export function variant(theme: YomtorTheme) {
  const getThemeColor = theme.fn.themeColor
  const getPrimaryShade = theme.fn.primaryShade
  const getGradient = theme.fn.gradient
  const rgba = theme.fn.rgba

  if (!OLD_VARIANT) {
    OLD_VARIANT = theme.fn.variant
  }
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return ({
    variant,
    color,
    gradient,
    primaryFallback,
    withPrimaryColor = true
  }: VariantInput): VariantOutput => {
    const variants = OLD_VARIANT({
      variant,
      color,
      gradient,
      primaryFallback
    })

    switch (variant) {
      case 'filled':
        if (!withPrimaryColor) {
          return {
            border: 'transparent',
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.dark[9],
            hover: {
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1]
            }
          }
        }
        return OLD_VARIANT({ variant: 'filled', color })

      case 'toggle':
        return {
          border: 'transparent',
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[0]
              : theme.colors.dark[9],
          background: 'transparent',
          hover: {
            border:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
          },

          active: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
          },
          focus: theme.colors.primary[5]
        }

      case 'transparent':
        return {
          border: 'transparent',
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[0]
              : theme.colors.dark[9],
          background: 'transparent',
          hover: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1]
          },
          focus: theme.colors.primary[5]
        }
    }

    return variants
  }
}
