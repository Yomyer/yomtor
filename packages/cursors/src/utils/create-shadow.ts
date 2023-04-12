import { createNode } from './create-node'

export const createShadow = (): SVGElement => {
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
