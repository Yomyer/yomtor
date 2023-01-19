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
      {(node, item) => <div>{node.label}</div>}
    </TreeView>
  );
}
`
function Wrapper(props: TreeViewProps) {
  return (
    <Group position='center'>
      <TreeView
        {...props}
        data={Data}
        style={{ height: 300 }}
        onSort={(info) => alert(JSON.stringify(info))}
      >
        {(node, item) => <div>{node.label}</div>}
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
      name: 'collapsed',
      type: 'boolean'
    },
    {
      name: 'sortabled',
      type: 'boolean'
    }
  ]
}
