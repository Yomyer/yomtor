import { createStyles } from '@yomtor/styles'

export interface VirtualScrollStylesParams {
  events: boolean
}

export default createStyles((theme, { events }: VirtualScrollStylesParams) => ({
  root: {
    maxHeight: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  viewport: {
    width: '100%',
    position: 'relative',
    pointerEvents: events ? 'all' : 'none !important'
  },
  node: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
}))
