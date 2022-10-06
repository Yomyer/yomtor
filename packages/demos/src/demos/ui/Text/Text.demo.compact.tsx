import React from 'react'
import { Text } from '@yomtor/ui'

const code = `
import { Text } from '@yomtor/ui'

function Demo() {
  return (
    <Text align='center' weight={700}>This is a text</Text>
}
`

function Demo() {
  return (
    <Text align='center' weight={700}>
      This is a text
    </Text>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
