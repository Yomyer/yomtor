import React from 'react'
import { Button, Group, Tooltip } from '@yomtor/ui'

const code = `
import { Tooltip, Button } from '@yomtor/ui';

function Demo() {
  return (
    <Tooltip label="Hey!">
      <Button>Hover me</Button>
    </Tooltop>
}
`

function Demo() {
  return (
    <Group position='center'>
      <Tooltip label='Hey!'>
        <Button>Hover me</Button>
      </Tooltip>
    </Group>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}