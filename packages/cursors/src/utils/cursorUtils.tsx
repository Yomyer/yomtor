import { isNumber, omitBy } from 'lodash'

export type Cursor = {
  id: string
  d: string
  paths: string[]
  fill?: string
  x?: string
  y?: string
  stroke?: string
}

type Props = {
  cursor?: Cursor
  rotation: number
  action?: Cursor
  global?: boolean
  clear?: boolean
}

const styles: { [key: string]: HTMLStyleElement } = {}
let target: HTMLElement

export const cursorWithScope = (element: HTMLElement) => {
  target = element
}

export const setCursor = (
  cursor: Cursor,
  rotation?: number,
  action?: Cursor
) => {
  setAction({ cursor, rotation, action, global: false, clear: false })
}

export const setGlobalCursor = (
  cursor: Cursor,
  rotation?: number,
  action?: Cursor
) => {
  setAction({ cursor, rotation, action, global: true, clear: false })
}

export const clearCursor = (
  cursors: Cursor | Cursor[],
  rotation?: number,
  action?: Cursor
) => {
  setAction({ cursors, rotation, action, global: false, clear: true })
}

export const clearGlobalCursor = (
  cursors: Cursor | Cursor[],
  rotation?: number,
  action?: Cursor
) => {
  setAction({ cursors, rotation, action, global: true, clear: true })
}

const setAction = ({
  cursor,
  cursors,
  ...others
}: Props & { cursors?: Cursor | Cursor[] }): void => {
  cursors instanceof Array
    ? cursors.forEach((a) => setClass({ cursor: a, ...others }, true))
    : setClass({ cursor: cursor || cursors, ...others })
}

async function setClass(
  { cursor, action, rotation, clear, global }: Props,
  all?: boolean
) {
  const name = cursor.id + ((action && action.id) || '') + (rotation || '')

  if (global) {
    clear && all
      ? clearAll(document.body.classList, cursor.id)
      : document.body.classList[clear ? 'remove' : 'add'](name)
  } else {
    clear && all
      ? clearAll(target.classList, cursor.id)
      : target.classList[clear ? 'remove' : 'add'](name)
  }

  if (!styles[name] && !clear) {
    const tag = await generateStyleTag(name, {
      cursor,
      action,
      rotation
    })
    if (tag) {
      styles[name] = tag
    }
  }
}

const clearAll = (classList: DOMTokenList, find: string) => {
  classList.forEach((c: string) => {
    try {
      if (c.startsWith(find)) {
        classList.remove(c)
      }
    } catch (error) {}
  })
}

const toBase64SVG = (svg: SVGElement) => {
  return `data:image/svg+xml;base64,${toBase64(
    new XMLSerializer().serializeToString(svg)
  )}`
}

const toBase64 = (string: string) => {
  return window.btoa(string)
}
const createNode = (tag: string, values?: { [key: string]: string }) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  for (const key in values) node.setAttributeNS(null, key, values[key])
  return node
}

const generateShadow = (): SVGElement => {
  const filter = createNode('filter', {
    id: 'shadow',
    height: '200%',
    width: '200%',
    x: '-50.9%',
    y: '-41.4%'
  })
  filter.appendChild(
    createNode('feGaussianBlur', {
      stdDeviation: '2',
      in: 'SourceAlpha'
    })
  )
  filter.appendChild(createNode('feOffset', { dy: '2', result: 'offsetblur' }))
  const transfer = createNode('feComponentTransfer')
  transfer.appendChild(createNode('feFuncA', { type: 'linear', slope: '0.5' }))
  filter.appendChild(transfer)

  const merge = createNode('feMerge')
  merge.appendChild(createNode('feMergeNode'))
  merge.appendChild(createNode('feMergeNode', { in: 'SourceGraphic' }))

  filter.appendChild(merge)

  return filter
}

export const generateSVGCursor = (
  { cursor: cursorData, action: actionData, rotation }: Props,
  scale = 1
): SVGElement => {
  const svg = createNode('svg', {
    width: `64px`,
    height: '64px'
  })
  svg.appendChild(generateShadow())

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
    generatePath(subCrusor, actionData)

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
  generatePath(cursor, cursorData)

  g.appendChild(cursor)

  svg.appendChild(g)

  return svg
}

const generatePath = (svg: SVGElement, { paths, ...others }: Cursor) => {
  if (paths.length > 1) {
    svg.innerHTML = paths.join('')
  } else {
    svg.appendChild(createNode('path', { ...others }))
  }
}

const generateStyle = async (className: string, props: Props) => {
  let data = {
    x: '16',
    y: '16',
    ...omitBy(props.cursor, (val) => !val && !isNumber(val))
  }

  if (props.action) {
    data = { ...data, x: (+data.x - 4).toString(), y: (+data.y - 4).toString() }
  }

  const svg64 = toBase64SVG(generateSVGCursor(props, 0.5))
  const png64 = toBase64SVG(generateSVGCursor(props))

  return `body.${className} *, .${className}{
        cursor: url(${png64})${data.x} ${data.y},auto !important;
        cursor: url(${svg64})${data.x} ${data.y},auto !important;
        cursor: -webkit-image-set(url(${png64})2x,url(${png64})1x)${data.x} ${data.y},auto !important;`
}

const generateStyleTag = async (
  name: string,
  props: Props
): Promise<HTMLStyleElement> => {
  if (document.querySelector(`style[cursor="${name}"]`)) {
    return null
  }

  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style') as HTMLStyleElement
  style.setAttribute('cursor', name)
  style.appendChild(document.createTextNode(await generateStyle(name, props)))

  head.appendChild(style)

  return style
}

export default Cursor
