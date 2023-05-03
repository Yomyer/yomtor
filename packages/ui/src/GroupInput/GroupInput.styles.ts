import { createStyles, getStylesRef, CSSObject } from '@yomtor/styles'

export interface GroupInputStylesParams {
  orientation: 'vertical' | 'horizontal'
  buttonBorderWidth: number | string
  variant: string
}

export default createStyles(
  (
    theme,
    { orientation, variant, buttonBorderWidth }: GroupInputStylesParams
  ) => {
    const variants = theme.fn.getVariant({
      variant,
      withFocus: true,
      withPrimaryColor: false
    })

    console.log(variants)

    return {
      root: {
        display: 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...(variant === 'toggle' && {
          '&:hover': {
            [`& .${getStylesRef('input')}:not(div):not(:focus)`]: {
              border: (variants['&:hover'] as CSSObject)?.border
            }
          }
        })
        /*
        '& [data-button]': {
          '&:first-of-type:not(:last-of-type)': {
            borderBottomRightRadius: 0,
            [orientation === 'vertical'
              ? 'borderBottomLeftRadius'
              : 'borderTopRightRadius']: 0,
            [orientation === 'vertical'
              ? 'borderBottomWidth'
              : 'borderRightWidth']: `calc(${rem(buttonBorderWidth)} / 2)`
          },
  
          '&:last-of-type:not(:first-of-type)': {
            borderTopLeftRadius: 0,
            [orientation === 'vertical'
              ? 'borderTopRightRadius'
              : 'borderBottomLeftRadius']: 0,
            [orientation === 'vertical'
              ? 'borderTopWidth'
              : 'borderLeftWidth']: `calc(${rem(buttonBorderWidth)} / 2)`
          },
  
          '&:not(:first-of-type):not(:last-of-type)': {
            borderRadius: 0,
            [orientation === 'vertical'
              ? 'borderTopWidth'
              : 'borderLeftWidth']: `calc(${rem(buttonBorderWidth)} / 2)`,
            [orientation === 'vertical'
              ? 'borderBottomWidth'
              : 'borderRightWidth']: `calc(${rem(buttonBorderWidth)} / 2)`
          },
  
          '& + [data-button]': {
            [orientation === 'vertical'
              ? 'marginTop'
              : 'marginLeft']: `calc(${buttonBorderWidth} * -1)`,
            '@media (min-resolution: 192dpi)': {
              [orientation === 'vertical' ? 'marginTop' : 'marginLeft']: 0
            }
          }
        }
        */
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
