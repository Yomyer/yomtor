import React from 'react'
import { __component__, __component__Props, Group } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: PropsType<__component__Props>, children: string) => `
import { __component__ } from '@yomtor/ui';
function Demo() {
  return (
    <__component__${props}>
      ${children}
    </__component__>
  );
}
`

function Wrapper(props: __component__Props) {
  return (
    <Group position='center'>
      <__component__ {...props} />
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
      initialValue: 'filled',
      defaultValue: 'filled',
      data: [{ label: 'filled', value: 'filled' }]
    },
    {
      name: 'color',
      type: 'color',
      initialValue: 'blue',
      defaultValue: 'blue'
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
