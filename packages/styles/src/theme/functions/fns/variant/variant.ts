import { CSSProperties } from 'react'
import type { YomtorColor, YomtorTheme } from '../../../types'
import { MantineGradient } from '@mantine/styles'

export interface VariantInput {
  variant: string
  color?: YomtorColor
  gradient?: MantineGradient
  primaryFallback?: boolean
  actived?: boolean
  withFocus?: boolean
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
    primaryFallback
  }: VariantInput): VariantOutput => {
    const variants = OLD_VARIANT({
      variant,
      color,
      gradient,
      primaryFallback
    })

    switch (variant) {
      case 'transparent':
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
    }

    return variants
  }
}
