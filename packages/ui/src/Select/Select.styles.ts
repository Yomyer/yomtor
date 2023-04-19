import { createStyles, getSize, rem, getStylesRef } from '@yomtor/styles'
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
  (
    theme,
    {
      variant,
      ticked,
      size,
      compact,
      inherit,
      searchable,
      disableDropdown
    }: SelectProps & { disableDropdown?: boolean }
  ) => {
    return {
      root: {
        ...(ticked && {
          position: 'relative'
        })
      },
      input: {
        ...theme.fn.getVariant({
          variant,
          withFocus: true,
          withPrimaryColor: false
        }),
        fontWeight: inherit && 'inherit',
        '&:focus-visible': {
          outline: 'none'
        },
        ...(compact && {
          ...compactSizes[`compact-${size}`],
          minHeight: 'unset',
          fontSize: inherit ? 'inherit' : getSize({ size, sizes }),
          '&[data-with-icon]': {
            paddingLeft: rem(getSize({ size, sizes: iconSizes }))
          }
        }),
        ...(ticked && {
          paddingRight: rem(getSize({ size, sizes: iconSizes })),
          paddingLeft: 7,
          [`&:hover + .${getStylesRef('rightSection')}`]: {
            opacity: 1,
            transform: 'scale(1)'
          }
        }),
        ...(!searchable && {
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        })
      },
      icon: {
        ...(compact && {
          width: rem(getSize({ size, sizes: iconSizes }))
        })
      },
      item: {
        pointerEvents: disableDropdown ? 'none' : 'all',
        ...(compact && {
          fontSize: getSize({ size, sizes }),
          padding: 0,
          ...compactSizes[`compact-${size}`],
          height: compactSizes[`compact-${size}`].height - 4,
          display: 'flex',
          alignItems: 'center'
        }),
        ...(ticked && {
          whiteSpace: 'nowrap',
          '&[data-selected]': {
            backgroundColor: 'unset',
            color: 'unset'
          },
          '&[data-hovered]': {
            backgroundColor: theme.fn.variant({
              variant: 'filled'
            }).background,
            color: theme.fn.variant({
              variant: 'filled'
            }).color,
            borderRadius: 0
          },
          '& svg': {
            width: rem(getSize({ size, sizes: iconSizes }))
          }
        })
      },
      rightSection: {
        ref: getStylesRef('rightSection'),
        pointerEvents: 'none',
        opacity: 0.3,
        transform: 'scale(0.7)'
      },
      separator: {
        ...(ticked && {
          height: 1,
          padding: 0,
          background: theme.fn.variant({
            variant: 'default'
          }).border,
          margin: '10px 0',
          '& > *': {
            display: 'none'
          },
          '&:first-of-type': {
            display: 'none'
          }
        })
      },
      itemsWrapper: {
        ...(ticked && {
          padding: '10px 0'
        })
      },
      dropdown: {
        overflow: 'hidden',
        ...(ticked && {
          width: 'auto !important',
          left: '0 !important',
          minWidth: '100%'
        })
      }
    }
  }
)
