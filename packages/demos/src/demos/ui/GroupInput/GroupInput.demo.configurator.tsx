import React from 'react'
import {
  ActionIcon,
  GroupInputProps,
  GroupInput,
  NumberInput
} from '@yomtor/ui'
import { YomtorDemo, PropsType } from '@yomtor/ds'
import { ArtboardIcon, CodeIcon, HideIcon, RadiusIcon } from '@yomtor/icons'

const codeTemplate = (props: PropsType<GroupInputProps>, children: string) => `
import { Button, Group } from '@yomtor/ui'

function Demo() {
  return (
    <Button.Group>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Button.Group>
  );
}
`

function Wrapper(props: GroupInputProps) {
  return (
    <GroupInput {...props}>
      <ActionIcon actived>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon>
        <CodeIcon />
      </ActionIcon>
    </GroupInput>
  )
}

export const group: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'color',
      type: 'color',
      initialValue: 'primary',
      defaultValue: 'primary'
    },
    {
      name: 'variant',
      type: 'select',
      initialValue: 'toggle',
      defaultValue: 'toggle',
      data: [
        { label: 'transparent', value: 'transparent' },
        { label: 'toggle', value: 'toggle' },
        { label: 'subtle', value: 'subtle' },
        { label: 'filled', value: 'filled' },
        { label: 'light', value: 'light' },
        { label: 'outline', value: 'outline' },
        { label: 'default', value: 'default' }
      ]
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'md',
      defaultValue: 'md'
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'xs',
      defaultValue: 'xs'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    },
    {
      name: 'draggable',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    }
  ]
}
