import React from 'react'
import {
  DroppableProps,
  Droppable,
  Draggable,
  Paper,
  Center,
  Text,
  Badge,
  DEFAULT_THEME,
  DroppableStatus,
  DropEvent
} from '@yomtor/ui'
import { MantineDemo } from '@yomtor/ds'

const codeTemplate = (props: string, children: string) => `
import { Button } from '@mantine/core';
function Demo() {
  return (
    <Droppable${props}>
      <Paper shadow='sm' radius='xs' p='sm' withBorder>
        <Text align='center'>Dropme</Text>
      </Paper>
    </Droppable>
  );
}
`
function Wrapper(props: DroppableProps) {
  return (
    <>
      <Center style={{ height: 200 }}>
        <Draggable>
          <Badge>DragMe</Badge>
        </Draggable>
        <Draggable data={{ not: true }}>
          <Badge>Dont'Drag</Badge>
        </Draggable>
      </Center>
      <Droppable
        {...props}
        accept={{ not: (event: DropEvent<any>) => !event.props.data?.not }}
      >
        {(status: DroppableStatus) => (
          <Paper
            shadow='xs'
            radius='xs'
            p='sm'
            withBorder
            style={{
              background:
                (status.accepted && 'green') || (status.rejected && 'red')
            }}
          >
            <Text align='center'>Dropme</Text>
          </Paper>
        )}
      </Droppable>
    </>
  )
}
export const configurator: MantineDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  background: (colorScheme) =>
    colorScheme === 'dark'
      ? DEFAULT_THEME.colors.dark[8]
      : DEFAULT_THEME.colors.gray[0],
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
