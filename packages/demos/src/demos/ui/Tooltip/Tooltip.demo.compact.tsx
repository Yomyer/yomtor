import React from 'react'
import { Button, Group, Tooltip } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

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

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
