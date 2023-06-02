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

    console.log(focus)

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
            [`& .${getStylesRef('input')}:not(div)`]: {
              border: '1px solid red'
            }
          })
      },
      input: {
        ref: getStylesRef('input'),
        transition: 'none',
        borderRightWidth: '0 !important',
        '&:active': {
          transform: 'none',
          '& svg': {
            transform: 'translateY(0.0625rem)'
          }
        }
      },
      center: {
        borderRadius: 0
      },
      first: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      last: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderRightWidth: '1px !important'
      }
    }
  }
)
