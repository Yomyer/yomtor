import { createStyles } from '@yomtor/styles'

export interface NodeStylesParams {
  indent: number
}

export default createStyles((theme, { indent }: NodeStylesParams) => {
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
      width: indent,
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
      cursor: 'pointer'
    },
    actived: {
      background: theme.fn.rgba(theme.colors.primary[5], 0.2),
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    },
    parentActived: {
      background: theme.fn.rgba(theme.colors.primary[3], 0.2),
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    },
    highlighted: {
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0',
        right: '0',
        border: `1px solid ${theme.fn.rgba(theme.colors.primary[3], 0.2)}`,
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
