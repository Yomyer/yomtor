import { CursorProps } from '../types'
import { createNode } from './create-node'
import { createPath } from './create-path'
import { createShadow } from './create-shadow'

export const createSVGCursor = (
  { cursor: cursorData, action: actionData, rotation }: CursorProps,
  scale = 1
): SVGElement => {
  const svg = createNode('svg', {
    width: `64px`,
    height: '64px'
  })
  svg.appendChild(createShadow())

  const g = createNode('g', {
    transform: `scale(${scale})`,
    style: 'filter:url(#shadow)'
  })

  if (actionData) {
    const subCrusor = createNode('g', {
      'transform-origin': 'center',
      stroke: 'none',
      'stroke-width': '2',
      fill: 'none',
      'fill-rule': 'evenodd',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      transform: 'translate(10, 10)'
    })
    createPath(subCrusor, actionData)

    g.appendChild(subCrusor)
  }

  const cursor = createNode('g', {
    transform: `rotate(${rotation || 0}) ${
      actionData ? 'translate(-10, -10)' : ''
    }`,
    'transform-origin': actionData ? '22px 22px' : 'center',
    stroke: 'none',
    'stroke-width': '2',
    fill: 'none',
    'fill-rule': 'evenodd',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  })
  createPath(cursor, cursorData)

  g.appendChild(cursor)

  svg.appendChild(g)

  return svg
}
