import { INPUT_SIZES } from '@mantine/core'
import {
  createStyles,
  CSSObject,
  getSize,
  rem,
  YomtorNumberSize
} from '@yomtor/styles'
import { ActionIconProps } from './ActionIcon.props'

export const sizes = {
  xs: { height: INPUT_SIZES.xs, width: INPUT_SIZES.xs },
  sm: { height: INPUT_SIZES.sm, width: INPUT_SIZES.sm },
  md: { height: INPUT_SIZES.md, width: INPUT_SIZES.md },
  lg: { height: INPUT_SIZES.lg, width: INPUT_SIZES.lg },
  xl: { height: INPUT_SIZES.xl, width: INPUT_SIZES.xl },
  'compact-xs': { height: rem(22), width: rem(22) },
  'compact-sm': { height: rem(24), width: rem(26) },
  'compact-md': { height: rem(28), width: rem(30) },
  'compact-lg': { height: rem(34), width: rem(34) },
  'compact-xl': { height: rem(40), width: rem(40) }
}

const icons = {
  xs: rem(13),
  sm: rem(16),
  md: rem(20),
  lg: rem(25),
  xl: rem(30)
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
    {
      compact,
      size,
      color,
      variant,
      gradient,
      actived,
      radius
    }: ActionIconProps
  ) => {
    const { [`&:focus, &:focus-within`]: focus, ...others } =
      theme.fn.getVariant({
        color,
        variant,
        gradient,
        actived,
        withFocus: true
      })

    return {
      root: {
        ...others,
        ...getSizeStyles({
          compact,
          size
        }),
        '&:focus-visible': {
          ...(focus as object),
          borderRadius: theme.fn.radius(radius)
        },
        '& svg': {
          pointerEvents: 'none',
          position: 'relative',
          width: getSize({ sizes: icons, size }),
          height: getSize({ sizes: icons, size })
        },
        '&:active': {
          transform: 'none',
          '& svg': {
            marginTop: '0.1rem'
          }
        }
      }
    }
  }
)
