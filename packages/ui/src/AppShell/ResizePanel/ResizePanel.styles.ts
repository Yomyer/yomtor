import { createStyles } from '@yomtor/styles'
import { ResizeDirections, ResizePanelProps } from './ResizePanel.props'

export interface ResizePanelStylesParams {
  isH: boolean
  direction: ResizeDirections
}
const getPosition = (direction: ResizeDirections) => {
  switch (direction) {
    case 'e':
      return {
        right: 0,
        top: 0,
        bottom: 0,
        transform: 'translateX(5px)'
      }
    case 'w':
      return {
        left: 0,
        top: 0,
        bottom: 0,
        transform: 'translateX(-5px)'
      }
    case 'n':
      return {
        left: 0,
        right: 0,
        top: 0,
        transform: 'translateY(-5px)'
      }
    case 's':
      return {
        left: 0,
        right: 0,
        bottom: 0,
        transform: 'translateY(5px)'
      }
  }
}

export default createStyles(
  (theme, { isH, direction }: ResizePanelStylesParams) => ({
    root: {},
    handler: {
      position: 'absolute',
      width: isH && 10,
      height: !isH && 10,
      background: 'red',
      opacity: 0.2,
      ...getPosition(direction)
    }
  })
)
