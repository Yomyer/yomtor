import { createStyles, getSize, rem } from '@yomtor/styles'
import { SelectProps } from './Select.props'

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
  (theme, { variant, size, compact }: SelectProps) => {
    return {
      input: {
        ...theme.fn.getVariant({
          variant,
          withFocus: true,
          withPrimaryColor: false
        }),
        '&:focus-visible': {
          outline: 'none'
        },
        ...(compact && {
          ...compactSizes[`compact-${size}`],
          minHeight: 'unset',
          fontSize: getSize({ size, sizes }),
          '&[data-with-icon]': {
            paddingLeft: rem(getSize({ size, sizes: iconSizes }))
          }
        })
      },
      icon: {
        ...(compact && {
          width: rem(getSize({ size, sizes: iconSizes }))
        })
      },
      item: {
        ...(compact && {
          fontSize: getSize({ size, sizes }),
          padding: 0,
          ...compactSizes[`compact-${size}`],
          display: 'flex',
          alignItems: 'center',
          '&[data-hovered]': {
            backgroundColor: theme.fn.variant({
              variant: 'filled'
            }).background
          },
          '&[data-selected]': {
            backgroundColor: 'unset',
            color: 'unset'
          }
        })
      },
      separator: {},
      separatorLabel: {
        display: 'none'
      }
    }
  }
)
