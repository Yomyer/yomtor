import React from 'react'
import { Button, ButtonProps, Group } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string, children: string) => `
import { Button } from '@yomtor/ui';

function Demo() {
  return (
    <Button${props}>
      ${children}
    </Button>
  );
}
`
function Wrapper(props: ButtonProps) {
  return (
    <Group position='center'>
      <Button {...props} />
    </Group>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'variant',
      type: 'select',
      initialValue: 'default',
      defaultValue: 'default',
      data: [
        { label: 'filled', value: 'filled' },
        { label: 'light', value: 'light' },
        { label: 'outline', value: 'outline' },
        { label: 'default', value: 'default' },
        { label: 'subtle', value: 'subtle' }
      ]
    },
    {
      name: 'color',
      type: 'color',
      initialValue: '',
      defaultValue: ''
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'sm',
      defaultValue: 'sm'
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'sm',
      defaultValue: 'sm'
    },
    {
      name: 'compact',
      type: 'boolean',
      initialValue: true,
      defaultValue: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    },
    { name: 'children', type: 'string', initialValue: 'Settings' }
  ]
}
