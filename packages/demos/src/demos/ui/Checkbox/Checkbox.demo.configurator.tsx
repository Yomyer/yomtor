import React from 'react'
import { Checkbox, CheckboxProps, Group } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: PropsType<CheckboxProps>, children: string) => `
import { Checkbox } from '@yomtor/ui';
function Demo() {
  return (
    <Checkbox${props}>
      ${children}
    </Checkbox>
  );
}
`

function Wrapper(props: CheckboxProps) {
  return (
    <Group position='center'>
      <Checkbox {...props} />
    </Group>
  )
}

export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'labelPosition',
      type: 'segmented',
      initialValue: 'right',
      defaultValue: 'right',
      data: [
        { label: 'Rigth', value: 'right' },
        { label: 'Left', value: 'left' }
      ]
    },
    {
      name: 'label',
      type: 'string',
      initialValue: 'I agree to sell my privacy'
    },
    {
      name: 'description',
      type: 'string',
      initialValue: 'I agree to sell my privacy'
    },
    {
      name: 'color',
      type: 'color',
      initialValue: 'blue',
      defaultValue: 'blue'
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'xs',
      defaultValue: 'xs'
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'xs',
      defaultValue: 'xs'
    },
    {
      name: 'label',
      type: 'string',
      initialValue: 'I agree to sell my privacy'
    },
    {
      name: 'disabled',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    }
  ]
}
