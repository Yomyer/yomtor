import React from 'react'
import { ActionIconProps, ActionIcon, Group, Input } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { YomtorDemo, PropsType } from '@yomtor/ds'

const codeTemplate = (props: PropsType<ActionIconProps>) => `
import { ArtboardIcon } from '@yomtor/icons'
import { ActionIcon } from '@yomtor/ui'

function Demo() {
  return (
    <ActionIcon${props}>
      <ArtboardIcon/>
    </ActionIcon>
  );
}
`
function Wrapper(props: ActionIconProps) {
  return (
    <Group position='center'>
      <ActionIcon {...props}>
        <ArtboardIcon />
      </ActionIcon>
    </Group>
  )
}
export const configurator: YomtorDemo = {
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
      initialValue: 'transparent',
      defaultValue: 'transparent',
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
      name: 'loading',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
