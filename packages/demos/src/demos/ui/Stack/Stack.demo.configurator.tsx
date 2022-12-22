import React from 'react'
import { Button, StackProps, Stack } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string) => `
import { Button, Stack } from '@yomtor/ui'

function Demo() {
  return (
    <Stack${props} style={{ height: '300px' }}>
      <Button variant='gradient'>1</Button>
      <Button variant='filled'>2</Button>
      <Button variant='light'>3</Button>
    </Stack>
  );
}
`
function Wrapper(props: StackProps) {
  return (
    <Stack {...props} style={{ height: '300px' }}>
      <Button variant='gradient'>1</Button>
      <Button variant='filled'>2</Button>
      <Button variant='light'>3</Button>
    </Stack>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'align',
      type: 'select',
      initialValue: 'stretch',
      data: [
        { label: 'stretch', value: 'stretch' },
        { label: 'center', value: 'center' },
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' }
      ]
    },
    {
      name: 'justify',
      type: 'select',
      initialValue: 'center',
      data: [
        { label: 'center', value: 'center' },
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'space-around', value: 'space-around' },
        { label: 'space-between', value: 'space-between' }
      ]
    },
    {
      name: 'spacing',
      type: 'size',
      defaultValue: 'md',
      initialValue: 'md'
    }
  ]
}
