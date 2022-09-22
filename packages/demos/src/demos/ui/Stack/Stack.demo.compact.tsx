import React from 'react'
import { Button, Stack } from '@yomtor/ui'

const code = `
import { Stack, Button } from '@mantine/core';
function Demo() {
  return (
    <Stack>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
    </Stack>
}
`

function Demo() {
  return (
    <Stack>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
    </Stack>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
