import { createStyles } from '@yomtor/styles'
import { ResizeDirections, ResizePanelProps } from './ResizePanel.props'

export interface ResizePanelStylesParams {
  isH: boolean
  direction: ResizeDirections
  dragging: boolean
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
  (theme, { isH, direction, dragging }: ResizePanelStylesParams) => ({
    root: {},
    handler: {
      position: 'absolute',
      width: isH && 10,
      height: !isH && 10,
      ...getPosition(direction),
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        bottom: 0,
        width: 5,
        transform: 'translateX(-50%)',
        background: theme.colors.cyan[5]
      }
    }
  })
)
