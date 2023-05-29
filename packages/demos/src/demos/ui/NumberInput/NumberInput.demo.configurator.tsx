import React from 'react'
import { NumberInput, NumberInputProps, Group } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { CodeIcon } from '@yomtor/icons'
import { NumberInput as TextNumberInput } from '@mantine/core'

const codeTemplate = (props: PropsType<NumberInputProps>, children: string) => `
import { NumberInput } from '@yomtor/ui';
import { CodeIcon } from '@yomtor/icons';
function Demo() {
  return (
    <NumberInput${props} icon={<CodeIcon />} />
  );
}
`

function Wrapper(props: NumberInputProps) {
  return (
    <Group position='center'>
      <NumberInput
        label='Your age'
        description='From 0 to 120, step is 1'
        placeholder='Your age'
        parser={(value) => value.replace(/%\s?|(,*)/g, '')}
        formatter={(value) => {
          console.log(value)
          return !Number.isNaN(parseFloat(value)) ? `${value}%` : '%'
        }}
        /*
        formatter={(value) =>
          !Number.isNaN(parseFloat(value)) ? `${value} %` : ' %'
        }
        */
      />
      <TextNumberInput
        label='Your age'
        description='From 0 to 120, step is 1'
        placeholder='Your age'
        onChange={(value) => console.log(value)}
        parser={(value) => value.replace(/%\s?|(,*)/g, '')}
        formatter={(value) => {
          console.log(value)
          return !Number.isNaN(parseFloat(value)) ? `${value}%` : '%'
        }}
      />
    </Group>
  )
}

export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'variant',
      type: 'select',
      initialValue: 'toggle',
      defaultValue: 'defautogglelt',
      data: [
        { label: 'transparent', value: 'transparent' },
        { label: 'toggle', value: 'toggle' },
        { label: 'filled', value: 'filled' },
        { label: 'default', value: 'default' }
      ]
    },
    {
      name: 'placeholder',
      type: 'string',
      initialValue: 'Enter text'
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'xs',
      defaultValue: 'xs'
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'md',
      defaultValue: 'md'
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
