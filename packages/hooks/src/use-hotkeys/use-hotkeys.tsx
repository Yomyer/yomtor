import hotkeys, { HotkeysEvent } from 'hotkeys-js'
import React, { useCallback, useEffect, useRef } from 'react'
import { intersectionWith } from 'lodash'

type AvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT'
type Point = { x: number; y: number }

export type HotKeysEvent = HotkeysEvent & {
  delta: Point
  isPressed: (keyCode: string) => boolean
}

export type HotKeysOptions = {
  keys: string
  down?: HotKeyHandler
  up?: HotKeyHandler
  options?: Options
  deps?: React.DependencyList
}

export interface HotKeyHandler {
  (keyboardEvent: KeyboardEvent, hotkeysEvent: HotKeysEvent): void | boolean
}

// We implement our own custom filter system.
hotkeys.filter = () => true

const tagFilter = (
  { target }: KeyboardEvent,
  enableOnTags?: AvailableTags[]
) => {
  const targetTagName = target && (target as HTMLElement).tagName

  return Boolean(
    targetTagName &&
      enableOnTags &&
      enableOnTags.includes(targetTagName as AvailableTags)
  )
}

const isKeyboardEventTriggeredByInput = (ev: KeyboardEvent) => {
  return tagFilter(ev, ['INPUT', 'TEXTAREA', 'SELECT'])
}

const getDeltaArrow = (ev: KeyboardEvent) => {
  const point: Point = { x: 0, y: 0 }
  switch (ev.code) {
    case 'ArrowUp':
      point.y = -1
      break
    case 'ArrowDown':
      point.y = 1
      break
    case 'ArrowLeft':
      point.x = -1
      break
    case 'ArrowRight':
      point.x = 1
      break
  }

  return point
}

export type Options = {
  enabled?: boolean
  filter?: typeof hotkeys.filter
  filterPreventDefault?: boolean
  enableOnTags?: AvailableTags[]
  enableOnContentEditable?: boolean
  splitKey?: string
  scope?: string
  keyup?: boolean
  keydown?: boolean
}

export function useHotkeys<T extends Element>({
  keys,
  down,
  up,
  options,
  deps
}: HotKeysOptions): React.MutableRefObject<T | null> {
  const {
    enableOnTags,
    filter,
    keyup,
    keydown,
    filterPreventDefault = true,
    enabled = true,
    enableOnContentEditable,
    splitKey = '+'
  } = (options as Options) || {}
  const ref = useRef<T | null>(null)
  const modifier: string[] = []
  let isArrows = false

  if (keys.startsWith(`*${splitKey}`)) {
    keys
      .split(',')
      .forEach((key) =>
        modifier.push(key.replace(`*${splitKey}`, '').replace(/\s/, ''))
      )

    keys = '*'
  }

  const keyArrows: string[] = []
  if (keys.includes('arrows')) {
    keys.split(',').forEach((key) => {
      if (key.endsWith('arrows')) {
        const meta = key.replace('arrows', '')
        keyArrows.push(`${meta}up,${meta}down,${meta}left,${meta}right`)
        isArrows = true
      } else {
        keyArrows.push(key)
      }
    })
    keys = keyArrows.join(',')
  }

  const memoisedCallback = useCallback(
    (keyboardEvent: KeyboardEvent, hotkeysEvent: HotKeysEvent) => {
      hotkeysEvent.isPressed = hotkeys.isPressed

      if (filter && !filter(keyboardEvent)) {
        return !filterPreventDefault
      }

      if (
        (isKeyboardEventTriggeredByInput(keyboardEvent) &&
          !tagFilter(keyboardEvent, enableOnTags)) ||
        ((keyboardEvent.target as HTMLElement)?.isContentEditable &&
          !enableOnContentEditable)
      ) {
        return true
      }

      if (isArrows) {
        const point = getDeltaArrow(keyboardEvent)
        hotkeysEvent.delta = point
      }

      if (ref.current === null || document.activeElement === ref.current) {
        if (keyboardEvent.type === 'keydown' && typeof down === 'function') {
          if (
            !modifier.length ||
            intersectionWith(modifier, Object.keys(hotkeys), (a) => {
              return hotkeys[a]
            }).length
          ) {
            const response = down(keyboardEvent, hotkeysEvent)

            if (filterPreventDefault) {
              keyboardEvent.preventDefault()
            }

            if (response !== undefined) {
              return response
            }
          }
        }
        if (keyboardEvent.type === 'keyup' && typeof up === 'function')
          if (
            !modifier.length ||
            intersectionWith(modifier, Object.keys(hotkeys), (a) => {
              return hotkeys[a]
            }).length
          ) {
            const response = up(keyboardEvent, hotkeysEvent)

            if (filterPreventDefault) {
              keyboardEvent.preventDefault()
            }

            if (response !== undefined) {
              return response
            }
          }

        return true
      }

      return false
    },
    deps ? [ref, enableOnTags, filter, ...deps] : [ref, enableOnTags, filter]
  )

  useEffect(() => {
    if (!enabled) return null

    options = options || {}

    if (keyup && keydown !== true) {
      options.keydown = false
    }

    if (down) {
      options.keydown = true
    }
    if (typeof up === 'function') {
      options.keyup = true
    }
    hotkeys(keys, (options as Options) || {}, memoisedCallback)

    return () => hotkeys.unbind(keys, memoisedCallback)
  }, [memoisedCallback, options, keys, enabled])

  return ref
}
