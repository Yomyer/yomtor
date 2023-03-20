import React from 'react'
import { Select, SelectProps, Group } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string, children: string) => `
import { Select } from '@yomtor/ui';
function Demo() {
  return (
    <Select${props}>
      ${children}
    </Select>
  );
}
`
function Wrapper(props: SelectProps) {
  return (
    <Group position='center'>
      <Select
        {...props}
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' }
        ]}
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
      initialValue: 'default',
      defaultValue: 'default',
      data: [
        { label: 'transparent', value: 'transparent' },
        { label: 'toggle', value: 'toggle' },
        { label: 'filled', value: 'filled' },
        { label: 'default', value: 'default' }
      ]
    }
  ]
}
