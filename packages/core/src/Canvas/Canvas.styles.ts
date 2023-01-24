import { createStyles } from '@yomtor/styles'
import { CanvasProps } from './Canvas.props'

export interface CanvasStylesParams {
  hasArtboards: boolean
}

export default createStyles((theme, { hasArtboards }: CanvasStylesParams) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  tools: {
    position: 'absolute',
    bottom: 0,
    right: 0
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
