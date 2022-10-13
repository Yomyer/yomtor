import { ReactElement } from 'react'
import { createStyles } from '@yomtor/styles'
import { DraggableProps } from './Draggable.props'

type Classes = 'phantom' | 'handler' | 'start'

type DraggableStyeProps = DraggableProps & {
  dragging: boolean
  animated: boolean
}

export default createStyles<Classes, Partial<DraggableStyeProps>>(
  (theme, { dragging, animated, move, phantom, disabled }) => {
    return {
      phantom: {
        pointerEvents: 'none',
        position: 'absolute !important' as 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        opacity: '1 !important'
      },
      handler: {
        pointerEvents: (move && (dragging || animated) && 'none') || 'all',
        opacity: move && !phantom && (animated || dragging) && 0,
        userSelect: !disabled ? 'none' : null
      },
      start: {}
    }
  }
)
