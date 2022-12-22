import React from 'react'
import { VirtualScroll, VirtualScrollProps, Group } from '@yomtor/ui'
import { MantineDemo } from '@yomtor/ds'

const codeTemplate = (props: string, children: string) => `
import { VirtualScroll } from '@yomyer/ui';
function Demo() {
  return (
    <VirtualScroll${props} style={{ height: 300 }} />
  );
}
`
function Wrapper(props: VirtualScrollProps) {
  return <VirtualScroll {...props} style={{ height: 300 }} />
}
export const configurator: MantineDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'type',
      type: 'select',
      data: [
        { label: 'Auto', value: 'Auto' },
        { label: 'Always', value: 'always' },
        { label: 'Scroll', value: 'scroll' },
        { label: 'Hover', value: 'hover' },
        { label: 'Never', value: 'never' }
      ],
      initialValue: 'always',
      defaultValue: 'always'
    },
    {
      name: 'count',
      type: 'number',
      initialValue: 300,
      defaultValue: 0
    }
  ]
}
