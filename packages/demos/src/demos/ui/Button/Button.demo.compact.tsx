import React from 'react'
import { Button, Group } from '@yomtor/ui'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { Button } from '@yomtor/ui';

function Demo() {
  return <Button compact>My compact button</Button>;
}
`

function Demo() {
  return (
    <Group position='center'>
      <Button compact>Compact filled button</Button>
      <Button compact variant='light'>
        Compact light button
      </Button>
      <Button compact variant='outline'>
        Compact outline button
      </Button>
    </Group>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
