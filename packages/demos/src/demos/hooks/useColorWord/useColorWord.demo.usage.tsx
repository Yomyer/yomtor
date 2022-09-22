import React from 'react'
import { Button, Group, ActionIcon } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

const code = `
import { useColorWord } from '@yomtor/hooks';

function Demo() {
  return <Button compact>My compact button</Button>;
}
`

function Demo() {
  return (
    <Group position='center'>
      <ActionIcon>
        <ArtboardIcon></ArtboardIcon>
      </ActionIcon>
    </Group>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
