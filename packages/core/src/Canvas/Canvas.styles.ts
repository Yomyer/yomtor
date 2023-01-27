import { createStyles } from '@yomtor/styles'

export interface CanvasStylesParams {
  hasArtboards: boolean
}

export default createStyles((theme, { hasArtboards }: CanvasStylesParams) => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  tools: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    '& > *': {
      pointerEvents: 'all'
    }
  },
  canvas: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    width: '100%',
    height: '100%'
  }
}))
