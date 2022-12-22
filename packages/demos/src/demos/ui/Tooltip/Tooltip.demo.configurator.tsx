import React from 'react'
import { Button, TooltipProps, Group, Tooltip } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string) => `
import { Tooltip, Button } from '@yomtor/ui';

function Demo() {
  return (
    <Tooltip${props}>
      <Button>Hover me</Button>
    </Tooltop>
  );
}
`
function Wrapper(props: TooltipProps) {
  return (
    <Group position='center'>
      <Tooltip label='Hey!' {...props}>
        <Button>Hover me</Button>
      </Tooltip>
    </Group>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'color',
      type: 'color',
      initialValue: 'primary',
      defaultValue: 'primary'
    },
    {
      name: 'position',
      type: 'select',
      initialValue: 'top',
      data: [
        { label: 'top', value: 'top' },
        { label: 'top-start', value: 'top-start' },
        { label: 'top-end', value: 'top-end' },
        { label: 'left', value: 'left' },
        { label: 'left-start', value: 'left-start' },
        { label: 'left-end', value: 'left-end' },
        { label: 'right', value: 'right' },
        { label: 'right-start', value: 'right-start' },
        { label: 'right-end', value: 'right-end' },
        { label: 'bottom', value: 'bottom' },
        { label: 'bottom-start', value: 'bottom-start' },
        { label: 'bottom-end', value: 'bottom-end' }
      ]
    },
    {
      name: 'withArrow',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    },
    {
      name: 'label',
      type: 'string',
      initialValue: 'Hey!'
    }
  ]
}
