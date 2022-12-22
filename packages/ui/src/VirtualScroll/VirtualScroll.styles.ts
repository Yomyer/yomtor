import { createStyles } from '@yomtor/styles'

export interface VirtualScrollStylesParams {}

export default createStyles((theme, {}: VirtualScrollStylesParams) => ({
  root: {
    maxHeight: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  viewport: {
    width: '100%',
    position: 'relative'
  },
  node: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
}))
