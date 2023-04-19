import { createStyles, getSize, rem, getStylesRef } from '@yomtor/styles'

export interface SelectScrollAreaStylesParams {}

export default createStyles((theme, {}: SelectScrollAreaStylesParams) => {
  return {
    arrows: {
      position: 'absolute',
      background: 'black',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1,
      height: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottom: {
      bottom: 0,
      top: 'unset'
    }
  }
})
