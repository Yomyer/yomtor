import React from 'react'
import { ActionIcon, Group } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { ActionIcon, Group } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

function Demo() {
  return (
    <Group>
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
}
`

function Demo() {
  return (
    <Group>
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

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
