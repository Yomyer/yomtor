import { createStyles } from '@yomtor/styles'
import { SvgIconProps } from './SvgIcon.props'

type Classes = 'root'

const sizes = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44
}

export const SvgIconStyles = createStyles<Classes, SvgIconProps>(
  (theme, { hidden, rotate, size, style }) => ({
    ...style,
    root: {
      color: 'inherit',
      boxSizing: 'content-box',
      fill: 'currentcolor',
      fillOpacity: 1,
      stroke: 'currentcolor',
      strokeOpacity: 0,
      width: sizes[size],
      height: sizes[size],
      display: hidden ? 'none' : 'inline-block',
      flexShrink: 0,
      userSelect: 'none',
      transform: rotate && `rotate(${rotate}deg)`
    }
  })
)
