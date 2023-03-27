import { createStyles } from '@yomtor/styles'
import { SvgIconProps } from './SvgIcon.props'

type Classes = 'root'

export default createStyles<Classes, SvgIconProps>(
  (theme, { hidden, rotate, size, style }) => ({
    ...style,
    root: {
      color: 'inherit',
      boxSizing: 'content-box',
      fill: 'currentcolor',
      fillOpacity: 1,
      stroke: 'currentcolor',
      strokeOpacity: 0,
      width: theme.icons[size],
      height: theme.icons[size],
      display: hidden ? 'none' : 'inline-block',
      flexShrink: 0,
      userSelect: 'none',
      transform: rotate && `rotate(${rotate}deg)`
    }
  })
)
