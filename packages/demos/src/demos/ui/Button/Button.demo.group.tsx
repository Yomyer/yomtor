import React from 'react'
import { ActionIcon, Button, ButtonProps } from '@yomtor/ui'
import { YomtorDemo, PropsType } from '@yomtor/ds'

const codeTemplate = (props: PropsType<ButtonProps>, children: string) => `
import { Button, Group } from '@yomtor/ui'

function Demo() {
  return (
    <Button.Group>
      <Button >First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Button.Group>
  );
}
`

function Demo() {
  return (
    <Button.Group>
      <ActionIcon actived>First</ActionIcon>
      <ActionIcon>Second</ActionIcon>
      <ActionIcon>Third</ActionIcon>
    </Button.Group>
  )
}

export const group: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Demo,
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
