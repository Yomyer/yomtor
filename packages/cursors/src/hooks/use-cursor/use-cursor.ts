import { isArray } from 'lodash'
import { useRef } from 'react'
import { setClass } from '../../utils/set-class'
import { CursorIcon } from '../../types'

export function useCursor<T extends HTMLElement>() {
  const ref = useRef<T>()

  const showCursor = (
    cursors: CursorIcon | CursorIcon[],
    rotation?: number
  ) => {
    cursors = !isArray(cursors) ? [cursors] : cursors

    setClass(
      {
        cursor: cursors[0],
        action: cursors[1],
        rotation: rotation
      },
      false,
      ref.current
    )
  }

  const hideCursor = (
    cursors: CursorIcon | CursorIcon[],
    rotation?: number
  ) => {
    cursors = !isArray(cursors) ? [cursors] : cursors

    setClass(
      {
        cursor: cursors[0],
        action: cursors[1],
        rotation: rotation,
        clear: true
      },
      false,
      ref.current
    )
  }

  const hideCursors = (
    cursors: CursorIcon[] | CursorIcon[][],
    rotation?: number
  ) => {
    cursors.forEach((cursor) => {
      cursor = !isArray(cursor) ? [cursor] : cursor

      setClass(
        {
          cursor: cursor[0],
          action: cursor[1],
          rotation: rotation,
          clear: true
        },
        true,
        ref.current
      )
    })
  }

  return { showCursor, hideCursor, hideCursors, ref }
}
