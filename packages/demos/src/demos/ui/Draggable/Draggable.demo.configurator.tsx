import React from 'react'
import { Badge, DraggableProps, Group, Draggable } from '@yomtor/ui'
import { YomtorDemo, PropsType } from '@yomtor/ds'

const codeTemplate = (props: PropsType<DraggableProps>, children: string) => `
import { Draggable, Badge } from '@yomtor/ui';

function Demo() {
  return (
    <Draggable${props}>
      <Badge>DragMe</Badge>
    </Draggable>
  );
}
`
function Wrapper(props: DraggableProps) {
  return (
    <Group position='center'>
      <Draggable {...props}>
        <Badge>DragMe</Badge>
      </Draggable>
    </Group>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'axis',
      type: 'select',
      data: [
        { label: 'Both', value: 'both' },
        { label: 'X', value: 'x' },
        { label: 'Y', value: 'y' }
      ],
      defaultValue: 'both',
      initialValue: 'both'
    },
    {
      name: 'throttle',
      type: 'number',
      initialValue: 1,
      defaultValue: 1
    },
    {
      name: 'distance',
      type: 'number',
      initialValue: 5,
      defaultValue: 5
    },
    {
      name: 'disabled',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    },
    {
      name: 'phantom',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    },
    {
      name: 'move',
      type: 'boolean',
      initialValue: true,
      defaultValue: true
    }
  ]
}
