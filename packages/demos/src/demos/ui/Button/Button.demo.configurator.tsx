import React from 'react'
import { Button, ButtonProps, Group } from '@yomtor/ui'

const codeTemplate = (props: string, children: string) => `
import { Button } from '@mantine/core';
function Demo() {
  return (
    <Button${props}>
      ${children}
    </Button>
  );
}
`
function Wrapper(props: ButtonProps) {
    return (
        <Group position='center'>
            <Button {...props} />
        </Group>
    )
}
export const configurator: MantineDemo = {
    type: 'configurator',
    codeTemplate,
    component: Wrapper,
    configurator: [
        {
            name: 'variant',
            type: 'select',
            data: [{ label: 'filled', value: 'filled' }]
        },
        {
            name: 'color',
            type: 'color',
            initialValue: 'blue',
            defaultValue: 'blue'
        },
        {
            name: 'disabled',
            type: 'boolean',
            initialValue: false,
            defaultValue: false
        },
        { name: 'children', type: 'string', initialValue: 'Settings' }
    ]
}
