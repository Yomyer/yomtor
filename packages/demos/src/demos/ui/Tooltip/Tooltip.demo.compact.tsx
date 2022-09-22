import React from 'react'
import { Button, Group, Tooltip } from '@yomtor/ui'

const code = `
import { Tooltip, Button } from '@mantine/core';
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
