import { CursorProps } from '../types'
import { createStyle } from './create-style'

export const createStyleTag = async (
  name: string,
  props: CursorProps
): Promise<HTMLStyleElement> => {
  if (document.querySelector(`style[cursor="${name}"]`)) {
    return null
  }

  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style') as HTMLStyleElement
  style.setAttribute('cursor', name)
  style.appendChild(document.createTextNode(await createStyle(name, props)))

  head.appendChild(style)

  return style
}
