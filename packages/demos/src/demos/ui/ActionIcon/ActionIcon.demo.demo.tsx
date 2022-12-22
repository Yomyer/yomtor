import React from 'react'
import { ActionIcon } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { ActionIcon } from '@yomtor/ui';
function function Demo() {() {
  return <ActionIcon>My compact button</ActionIcon>;
}
`

function Demo() {
  return <ActionIcon>Compact filled button</ActionIcon>
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
