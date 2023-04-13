import { createStyles, getSize } from '@yomtor/styles'
import { SvgIconProps } from './SvgIcon.props'

type Classes = 'root'

const getTransform = ({ flipX, flipY, rotate }) => {
  const transforms = []

  rotate && transforms.push(`rotate(${rotate}deg)`)
  flipX && transforms.push(`scaleX(-1)`)
  flipY && transforms.push(`scaleY(-1)`)

  return transforms.join(' ')
}

export default createStyles<Classes, SvgIconProps>(
  (theme, { hidden, rotate, size, flipX, flipY, style }) => {
    return {
      ...style,
      root: {
        color: 'inherit',
        boxSizing: 'content-box',
        fill: 'currentcolor',
        fillOpacity: 1,
        stroke: 'currentcolor',
        strokeOpacity: 0,
        width: getSize({ sizes: theme.icons, size }),
        height: getSize({ sizes: theme.icons, size }),
        display: hidden ? 'none' : 'inline-block',
        flexShrink: 0,
        userSelect: 'none',
        transform: getTransform({ rotate, flipX, flipY })
      }
    }
  }
)
