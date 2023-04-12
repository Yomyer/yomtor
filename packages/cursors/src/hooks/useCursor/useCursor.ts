import { useRef } from 'react'
import { CursorIcon } from '../../types'

export function useCursor() {
  const ref = useRef<HTMLElement>()

  const showCursor = (cursors: CursorIcon[], rotation: number) => {}

  const hideCursor = (cursors: CursorIcon[], rotation: number) => {}

  return { showCursor, hideCursor, ref }
}
