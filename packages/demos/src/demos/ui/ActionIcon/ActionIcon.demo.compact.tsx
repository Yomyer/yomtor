import { ArtboardIcon } from '@yomtor/icons'
import { ActionIcon, Group } from '@yomtor/ui'
import React from 'react'

const code = `
import { ActionIcon, ArtboardIcon } from '@mantine/core';
function Demo() {
  return (
    <ActionIcon>
      <ArtboardIcon />
    </ActionIcon>
}
`

function Demo() {
  return (
    <Group position='center'>
      <ActionIcon>
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
