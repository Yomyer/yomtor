import { createStyles, getStylesRef, CSSObject } from '@yomtor/styles'

export interface GroupInputStylesParams {
  orientation: 'vertical' | 'horizontal'
  buttonBorderWidth: number | string
  variant: string
  focus: boolean
}

export default createStyles(
  (
    theme,
    { orientation, variant, focus, buttonBorderWidth }: GroupInputStylesParams
  ) => {
    const variants = theme.fn.getVariant({
      variant,
      withFocus: true,
      withPrimaryColor: false
    })

    return {
      root: {
        display: 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...(variant === 'toggle' &&
          !focus && {
            '&:hover': {
              [`& .${getStylesRef('input')}:not(div)`]: {
                border: (variants['&:hover'] as CSSObject)?.border
              }
            }
          }),
        ...(variant === 'toggle' &&
          focus && {
            outline: (variants['&:focus, &:focus-within'] as CSSObject)?.border,
            [`& .${getStylesRef('input')}:not(div)`]: {
              border: (variants['&:hover'] as CSSObject)?.border
            }
          })
      },
      input: {
        ref: getStylesRef('input'),
        transition: 'none',
        borderRightWidth: '0 !important',
        '&:active:not(div)': {
          transform: 'none',
          '& svg': {
            transform: 'translateY(0.0625rem)'
          }
        }
      },
      center: {
        ref: getStylesRef('center'),
        borderRadius: 0
      },
      first: {
        ref: getStylesRef('first'),
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      last: {
        ref: getStylesRef('last'),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderRightWidth: '1px !important'
      }
    }
  }
)
