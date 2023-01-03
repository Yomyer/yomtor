import React from 'react'
import { TreeView, TreeViewProps, Group } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'
import { Data } from './_data'

const codeTemplate = (props: string, children: string) => `
import { TreeView } from '@mantine/core';
import { Data } from './_data'

function Demo() {
  return (
    <TreeView${props} data={Data}>
      ${children}
    </TreeView>
  );
}
`
function Wrapper(props: TreeViewProps) {
  return (
    <Group position='center'>
      <TreeView {...props} data={Data}>
        {(node, item) => (
          <div>
            {node.label} - Actived: {node.actived ? 'a' : 'o'}
          </div>
        )}
      </TreeView>
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
    },
    {
      name: 'collapsed',
      type: 'boolean'
    }
  ]
}
