import React from 'react'
import { TreeView, TreeViewProps, Group } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string, children: string) => `
import { TreeView } from '@mantine/core';
function Demo() {
  return (
    <TreeView${props}>
      ${children}
    </TreeView>
  );
}
`
function Wrapper(props: TreeViewProps) {
  return (
    <Group position='center'>
      <TreeView {...props} />
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
      data: [{ label: 'filled', value: 'filled' }]
    }
  ]
}
