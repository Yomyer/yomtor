import React from 'react'
import { Button, Group } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { Button, Group } from '@yomtor/ui'

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
  );
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

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
