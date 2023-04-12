import { CursorIcon, CursorProps } from '../types'
import { clearAll } from './clear-all'
import { createStyleTag } from './create-style-tag'

export const CURSOR_DEFAULT: CursorIcon = null
export const CURSOR_SCOPE: HTMLElement = null
export const CURSOR_STYLES: { [key: string]: HTMLStyleElement } = {}

export async function setClass(
  { cursor, action, rotation, clear, global, id = '' }: CursorProps,
  all?: boolean
) {
  const name = cursor.id + ((action && action.id) || '') + (rotation || '') + id

  if (global) {
    clear && all
      ? clearAll(document.body.classList, cursor.id)
      : document.body.classList[clear ? 'remove' : 'add'](name)
  } else {
    clear && all
      ? clearAll(CURSOR_SCOPE.classList, cursor.id)
      : CURSOR_SCOPE.classList[clear ? 'remove' : 'add'](name)
  }

  if (!CURSOR_STYLES[name] && !clear) {
    const tag = await createStyleTag(name, {
      cursor,
      action,
      rotation,
      id
    })
    if (tag) {
      CURSOR_STYLES[name] = tag
    }
  }
}
