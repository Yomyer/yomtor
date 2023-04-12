import { useRef } from 'react'
import { CursorConfig, CursorProps } from '../types'
import { clearAllCursors } from './clear-all-cursors'
import { createStyleTag } from './create-style-tag'

export const CURSOR_CONFIG: CursorConfig = {
  default: null,
  scope: null,
  styles: {}
}

export async function setClass(
  { cursor, action, rotation, clear, global, id = '' }: CursorProps,
  all?: boolean,
  ref?: HTMLElement
) {
  const name =
    cursor.id +
    ((action && action.id) || '') +
    (rotation || '') +
    (id ? '-' + id : '')

  if (global) {
    clear && all
      ? clearAllCursors(document.body.classList, cursor.id)
      : document.body.classList[clear ? 'remove' : 'add'](name)
  } else {
    clear && all
      ? clearAllCursors((ref || CURSOR_CONFIG.scope).classList, cursor.id)
      : (ref || CURSOR_CONFIG.scope).classList[clear ? 'remove' : 'add'](name)
  }

  if (!CURSOR_CONFIG.styles[name] && !clear) {
    const tag = await createStyleTag(name, {
      cursor,
      action,
      rotation,
      id
    })
    if (tag) {
      CURSOR_CONFIG.styles[name] = tag
    }
  }
}
