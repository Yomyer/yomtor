import { isNumber, omitBy } from 'lodash'
import { CursorProps } from '../types'
import { createSVGCursor } from './create-svg-cursor'
import { toBase64SVG } from './to-base-64-svg'

export const createStyle = async (className: string, props: CursorProps) => {
  let data = {
    x: '16',
    y: '16',
    ...omitBy(props.cursor, (val) => !val && !isNumber(val))
  }

  if (props.action) {
    data = { ...data, x: (+data.x - 4).toString(), y: (+data.y - 4).toString() }
  }

  const svg64 = toBase64SVG(createSVGCursor(props, 0.5))
  const png64 = toBase64SVG(createSVGCursor(props))

  const events =
    props.id &&
    `
      body.${className} *{
        pointer-events: none;
      }
    `

  return `
      body.${className} *, .${className}{
          cursor: url(${png64})${data.x} ${data.y},auto !important;
          cursor: url(${svg64})${data.x} ${data.y},auto !important;
          cursor: -webkit-image-set(url(${png64})2x,url(${png64})1x)${data.x} ${data.y},auto !important;
      }
      ${events}
      `
}
