import { ReactElement } from 'react'
import {
  DraggableEvent,
  DraggableProps as ReactDraggableProps
} from 'react-draggable'

export type {
  DraggableEvent,
  DraggableData,
  DraggableEventHandler
} from 'react-draggable'

export type DraggableProps = Partial<ReactDraggableProps> & {
  phantom?: boolean
  move?: boolean
  data?: object
  disabled?: boolean
  throttle?: number
  distance?: number
  children: ReactElement
  stop?: boolean
  onMouseUp?: (event: DraggableEvent) => void
}
