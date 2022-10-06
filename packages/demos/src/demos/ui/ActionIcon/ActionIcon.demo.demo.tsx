import React from 'react'
import { ActionIcon } from '@yomtor/ui'

const code = `
import { ActionIcon } from '@yomtor/ui';
function function Demo() {() {
  return <ActionIcon>My compact button</ActionIcon>;
}
`

function Demo() {
  return (
      <ActionIcon>Compact filled button</ActionIcon>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
