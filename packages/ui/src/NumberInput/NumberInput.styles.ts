import { createStyles, rem, getSize, getStylesRef } from '@yomtor/styles'
import { NumberInputProps } from './NumberInput.props'

const compactSizes = {
  'compact-xs': { height: 22, paddingLeft: 7, paddingRight: 7 },
  'compact-sm': { height: 24, paddingLeft: 8, paddingRight: 8 },
  'compact-md': { height: 28, paddingLeft: 10, paddingRight: 10 },
  'compact-lg': { height: 34, paddingLeft: 12, paddingRight: 12 },
  'compact-xl': { height: 40, paddingLeft: 14, paddingRight: 14 }
}
const iconSizes = {
  xs: 20,
  sm: 25,
  md: 30,
  lg: 35,
  xl: 45
}

const sizes = {
  xs: rem(8),
  sm: rem(10),
  md: rem(12),
  lg: rem(14),
  xl: rem(16)
}

export default createStyles(
  (
    theme,
    {
      size,
      draggable,
      variant: inputVariant,
      compact,
      icon,
      disabled
    }: NumberInputProps
  ) => {
    const variant = theme.fn.getVariant({
      variant: inputVariant,
      withFocus: true,
      withPrimaryColor: false
    })

    return {
      root: {
        pointerEvents: disabled ? 'none' : undefined
      },
      input: {
        lineHeight: 'normal',
        ...variant,
        ...(compact && {
          ...compactSizes[`compact-${size}`],
          minHeight: 'unset',
          fontSize: getSize({ size, sizes }),
          '&[data-with-icon]': {
            paddingLeft: icon ? rem(getSize({ size, sizes: iconSizes })) : 10
          }
        })
      },
      icon: {
        ...(compact && {
          width: icon ? rem(getSize({ size, sizes: iconSizes })) : 5,
          ...(!icon && {
            '> div': {
              width: '100%',
              height: '100%'
            }
          })
        }),
        ...(draggable && {
          pointerEvents: 'inherit'
        }),
        '& > *': {
          display: 'flex'
        },
        '&:hover + input': variant['&:hover']
      }
    }
  }
)
