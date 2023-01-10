import { createStyles } from '@yomtor/styles'

export interface NodeStylesParams {
  depth: number
  actived: boolean
}

export default createStyles((theme, { actived }: NodeStylesParams) => {
  console.log(theme.primaryColor)
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      letterSpacing: '.005em',
      fontSize: 13
    },
    indents: {
      display: 'flex',
      position: 'relative',
      height: '100%',
      flexShrink: 0
    },
    indent: {
      width: 16,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      flexShrink: 0
    },
    first: {
      marginRight: 0
    },
    collapser: {
      position: 'absolute',
      right: 0,
      fontSize: 8,
      opacity: 0.5,
      visibility: 'hidden',
      cursor: 'pointer'
    },
    actived: {
      background: actived && theme.colors.primary[5],
      color: actived && theme.white
    },
    parentActived: {
      background: 'blue'
    },
    highlighted: {
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0',
        right: '0',
        border: `1px solid yellow`,
        pointerEvents: 'none'
      }
    },
    line: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 3,
      background: 'white',
      pointerEvents: 'none'
    }
  }
})
