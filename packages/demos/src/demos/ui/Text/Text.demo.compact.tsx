import React from 'react'
import { Button, Group, Text, Tooltip } from '@yomtor/ui'

const code = `
import { Text } from '@mantine/core';
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
