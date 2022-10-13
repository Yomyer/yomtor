import React from 'react'
import { Paper, Text } from '@yomtor/ui'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { Paper, Text } from '@yomtor/ui'

function Demo() {
  return (
 <Paper>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
}
`

function Demo() {
  return (
    <Paper shadow='md' p='md'>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
      </Text>
    </Paper>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
