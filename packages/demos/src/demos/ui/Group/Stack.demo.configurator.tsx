import React from 'react'
import { GroupProps, Group, ActionIcon } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

const codeTemplate = (props: string) => `
import { ActionIcon, Group } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

function Demo() {
  return (
    <Group${props}>
      <ActionIcon variant='filled'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='gradient'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='light'>
        <ArtboardIcon />
      </ActionIcon>
    </Group>
  );
}
`
function Wrapper(props: GroupProps) {
  return (
    <Group {...props}>
      <ActionIcon variant='filled'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='gradient'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='light'>
        <ArtboardIcon />
      </ActionIcon>
    </Group>
  )
}
export const configurator: MantineDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'position',
      type: 'select',
      initialValue: 'left',
      defaultValue: 'left',
      data: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
        { label: 'apart', value: 'apart' }
      ]
    },
    {
      name: 'spacing',
      type: 'size',
      defaultValue: 'md',
      initialValue: 'md'
    },
    {
      name: 'grow',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
