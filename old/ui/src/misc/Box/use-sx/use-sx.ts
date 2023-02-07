import {
  YomtorStyleSystemProps,
  YomtorTheme,
  Sx,
  useCss,
  useYomtorTheme
} from '@yomtor/styles'
import { getSystemStyles } from '../style-system-props/get-system-styles'

function extractSx(sx: Sx, theme: YomtorTheme) {
  return typeof sx === 'function' ? sx(theme) : sx
}

export function useSx(
  sx: Sx | Sx[],
  systemProps: YomtorStyleSystemProps,
  className: string
) {
  const theme = useYomtorTheme()
  const { css, cx } = useCss()

  if (Array.isArray(sx)) {
    return cx(
      className,
      css(getSystemStyles(systemProps, theme)),
      sx.map((partial) => css(extractSx(partial, theme)))
    )
  }

  return cx(
    className,
    css(extractSx(sx, theme)),
    css(getSystemStyles(systemProps, theme))
  )
}
