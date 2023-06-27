import React from 'react'
import { TreeView, TreeViewProps, Group } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { Data } from './_data'

const codeTemplate = (props: PropsType<TreeViewProps>, children: string) => `
import { TreeView } from '@yomtor/ui';git pu
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
        onSort={(info) => console.log(info)}
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
      initialValue: true,
      defaultValue: true,
      name: 'sortabled',
      type: 'boolean'
    },
    {
      initialValue: true,
      defaultValue: true,
      name: 'multiple',
      type: 'boolean'
    }
  ]
}
