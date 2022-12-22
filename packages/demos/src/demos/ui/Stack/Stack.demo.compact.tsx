import React from 'react'
import { Button, Stack } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { Button, Stack } from '@yomtor/ui'

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

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
