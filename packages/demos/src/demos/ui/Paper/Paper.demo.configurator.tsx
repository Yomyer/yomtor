import React from 'react'
import { TooltipProps, Paper, Text } from '@yomtor/ui'

const codeTemplate = (props: string) => `
import { Tooltip, Button } from '@mantine/core';
function Demo() {
  return (
 <Paper${props}>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
}
`
function Wrapper(props: TooltipProps) {
  return (
    <Paper {...props}>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  )
}
export const configurator: MantineDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'shadow',
      type: 'size',
      initialValue: 'md',
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'sm',
    },
    {
      name: 'p',
      label: 'padding',
      type: 'size',
      initialValue: 'md',
    },
    {
      name: 'withBorder',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
  ]
}
