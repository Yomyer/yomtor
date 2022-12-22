import React from 'react'
import { ActionIconProps, ActionIcon, Group } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string) => `
import { ArtboardIcon } from '@yomtor/icons'
import { ActionIcon } from '@yomtor/ui'

function Demo() {
  return (
    <ActionIcon${props}>
      <ArtboardIcon size={props.size}/>
    </ActionIcon>
  );
}
`
function Wrapper(props: ActionIconProps) {
  return (
    <Group position='center'>
      <ActionIcon {...props}>
        <ArtboardIcon size={props.size} />
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
      initialValue: 'subtle',
      defaultValue: 'subtle',
      data: [
        { label: 'transparent', value: 'transparent' },
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
      initialValue: 'sm',
      defaultValue: 'sm'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
