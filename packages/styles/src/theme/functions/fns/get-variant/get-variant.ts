import { CSSObject, MantineGradient } from '@mantine/styles'
import { YomtorTheme, YomtorColor } from '../../../types'
import { VariantInput, VariantOutput } from '../variant/variant'
import { isString } from 'lodash'

export function getVariant(theme: YomtorTheme) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return ({
    variant,
    color,
    gradient,
    actived,
    withFocus,
    withPrimaryColor = true,
    primaryFallback
  }: VariantInput): CSSObject => {
    const colors = theme.fn.variant({
      color,
      variant,
      gradient,
      actived,
      withPrimaryColor,
      primaryFallback
    })

    if (variant === 'gradient') {
      return {
        border: 0,
        backgroundImage: colors.background,
        color: colors.color,

        '&:hover': {
          backgroundSize: '200%'
        }
      }
    }

    let hover
    if (colors.hover) {
      if (!isString(colors.hover)) {
        hover = {
          '&:hover': {
            border: `1px solid ${colors.hover.border}`,
            backgroundColor: colors.hover.background,
            color: colors.hover.color
          }
        }
      } else {
        hover = {
          '&:hover': {
            backgroundColor: colors.hover
          }
        }
      }
    }

    let focus
    if (withFocus && colors.focus) {
      if (!isString(colors.focus)) {
        focus = {
          '&:focus, &:focus-within': {
            border: `1px solid ${colors.focus.border}`,
            backgroundColor: colors.focus.background,
            color: colors.focus.color
          }
        }
      } else {
        focus = {
          '&:focus, &:focus-within': {
            border: `1px solid ${colors.focus}`
          }
        }
      }
    }

    let active
    if (actived && colors.active) {
      const global = {
        content: '""',
        position: 'absolute',
        width: '85%',
        height: '85%'
        // borderRadius: '2px'
      }
      if (!isString(colors.active)) {
        if (colors.active.size) {
          global.width = colors.active.size.toString()
          global.height = colors.active.size.toString()
        }

        active = {
          color: colors.active.color,
          border: `1px solid ${colors.active.border}`,
          '&:before': {
            backgroundColor: colors.active.background,
            ...global
          }
        }
      } else {
        active = {
          '&:before': {
            backgroundColor: colors.active,
            ...global
          }
        }
      }
    }

    const disabled = {
      '&[data-disabled]': {
        background: 'unset',
        border: 'unset',
        opacity: 0.5
      }
    }

    return {
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.background,
      color: colors.color,
      ...active,
      ...hover,
      ...focus,
      ...disabled
    }
  }
}
