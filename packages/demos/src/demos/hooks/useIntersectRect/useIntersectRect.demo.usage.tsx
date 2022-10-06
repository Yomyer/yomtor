import React from 'react'
import { useIntersectRect } from '@yomtor/hooks'

const code = `
import { useIntersectRect } from '@yomtor/hooks'

const a = new DOMRect(10, 5, 40, 40)
const b = new DOMRect(60, 5, 40, 40)
const c = new DOMRect(90, 15, 40, 40)

function Demo() {
  return (
    <svg width='100%' height='80px' id='svg'>
      <rect
        width={a.width}
        height={a.height}
        x={a.x}
        y={a.y}
        style={{ fill: useIntersectRect(a, b) ? '#f7735c' : '#97d164', stroke: 'black' }}
      />
      <rect
        width={b.width}
        height={b.height}
        x={b.x}
        y={b.y}
        style={{ fill: (useIntersectRect(a, b) || useIntersectRect(b, c)) ? '#f7735c' : '#97d164', stroke: 'black' }}
      />
      <rect
        width={c.width}
        height={c.height}
        x={c.x}
        y={c.y}
        style={{ fill: useIntersectRect(b, c) ? '#f7735c' : '#97d164', stroke: 'black' }}
      />
    </svg>
  );
}
`

function Demo() {
  const a = new DOMRect(10, 5, 40, 40)
  const b = new DOMRect(60, 5, 40, 40)
  const c = new DOMRect(90, 15, 40, 40)

  return (
    <svg width='100%' height='80px' id='svg'>
      <rect
        width={a.width}
        height={a.height}
        x={a.x}
        y={a.y}
        style={{
          fill: useIntersectRect(a, b) ? '#f7735c' : '#97d164',
          stroke: 'black'
        }}
      />
      <rect
        width={b.width}
        height={b.height}
        x={b.x}
        y={b.y}
        style={{
          fill:
            useIntersectRect(a, b) || useIntersectRect(b, c)
              ? '#f7735c'
              : '#97d164',
          stroke: 'black'
        }}
      />
      <rect
        width={c.width}
        height={c.height}
        x={c.x}
        y={c.y}
        style={{
          fill: useIntersectRect(b, c) ? '#f7735c' : '#97d164',
          stroke: 'black'
        }}
      />
    </svg>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
