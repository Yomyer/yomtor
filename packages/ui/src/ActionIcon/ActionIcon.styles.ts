import { INPUT_SIZES } from '@mantine/core'
import { createStyles, CSSObject, YomtorNumberSize } from '@yomtor/styles'
import { ActionIconProps } from './ActionIcon.props'

export const sizes = {
  xs: { height: INPUT_SIZES.xs, width: INPUT_SIZES.xs },
  sm: { height: INPUT_SIZES.sm, width: INPUT_SIZES.sm },
  md: { height: INPUT_SIZES.md, width: INPUT_SIZES.md },
  lg: { height: INPUT_SIZES.lg, width: INPUT_SIZES.lg },
  xl: { height: INPUT_SIZES.xl, width: INPUT_SIZES.xl },
  'compact-xs': { height: 22, width: 22 },
  'compact-sm': { height: 26, width: 26 },
  'compact-md': { height: 30, width: 30 },
  'compact-lg': { height: 34, width: 34 },
  'compact-xl': { height: 40, width: 40 }
}

interface GetSizeStyles {
  compact: boolean
  size: YomtorNumberSize
}

function getSizeStyles({ compact, size }: GetSizeStyles): CSSObject {
  if (compact) {
    return sizes[`compact-${size}`]
  }

  const _sizes = sizes[size]

  return {
    ..._sizes
  }
}

export default createStyles(
  (
    theme,
    { compact, size, color, variant, gradient, actived }: ActionIconProps
  ) => {
    return {
      root: {
        ...theme.fn.getVariant({ color, variant, gradient, actived }),
        ...getSizeStyles({
          compact,
          size
        }),
        '& svg': {
          position: 'relative',
          width: theme.icons[size],
          height: theme.icons[size]
        }
      }
    }
  }
)
