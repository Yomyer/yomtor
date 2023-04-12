import { CursorIcon } from '../../types'
import { setClass } from '../../utils/set-class'
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  random,
  sampleSize
} from 'lodash'
import { useHash, randomId } from '@yomtor/hooks'
import { useEffect } from 'react'

export function useGlobalCursor(cursors: CursorIcon | CursorIcon[]) {
  const hash = useHash()

  function showCursor(persist?: boolean): void
  function showCursor(rotation?: number): void
  function showCursor(rotation?: number, persist?: boolean): void
  function showCursor(...args: any[]) {
    const persist = args.find(isBoolean)
    const rotation = args.find(isNumber)

    cursors = !isArray(cursors) ? [cursors] : cursors

    setClass({
      cursor: cursors[0],
      action: cursors[1],
      rotation: rotation,
      global: true,
      id: persist ? hash : ''
    })
  }

  function hideCursor(persist?: boolean): void
  function hideCursor(rotation?: number): void
  function hideCursor(rotation?: number, persist?: boolean): void
  function hideCursor(...args: any[]) {
    const persist = args.find(isBoolean)
    const rotation = args.find(isNumber)

    cursors = !isArray(cursors) ? [cursors] : cursors

    setClass(
      {
        cursor: cursors[0],
        action: cursors[1],
        rotation: rotation,
        global: true,
        clear: true,
        id: persist ? hash : ''
      },
      true
    )
  }

  return [showCursor, hideCursor]
}
