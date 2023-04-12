import { CursorIcon } from '../types'
import { createNode } from './create-node'

export const createPath = (
  svg: SVGElement,
  { paths, ...others }: CursorIcon
) => {
  if (paths.length > 1) {
    svg.innerHTML = paths.join('')
  } else {
    svg.appendChild(createNode('path', { ...others }))
  }
}
