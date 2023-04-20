import { createStyles, getSize, rem, getStylesRef } from '@yomtor/styles'

export interface SelectScrollAreaStylesParams {
  arrows: { top: boolean; bottom: boolean }
}

export default createStyles(
  (theme, { arrows }: SelectScrollAreaStylesParams) => {
    return {
      arrows: {
        position: 'absolute',
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        height: 15,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center'
      },
      top: {
        display: arrows.top && 'flex'
      },
      bottom: {
        display: arrows.bottom && 'flex',
        bottom: 0,
        top: 'unset'
      }
    }
  }
)
