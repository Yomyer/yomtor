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
        zIndex: 100000,
        visibility: 'visible !important' as 'visible'
      },
      handler: {
        pointerEvents: (move && (dragging || animated) && 'none') || 'all',
        visibility:
          (move && !phantom && (animated || dragging) && 'hidden') || 'visible',
        userSelect: !disabled ? 'none' : null
      },
      start: {}
    }
  }
)
