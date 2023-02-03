import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import {
  YomtorProvider,
  Canvas,
  CanvasProps,
  ViewTool,
  ZoomTool,
  TransformTool,
  SelectorTool,
  ManagementTool,
  GroupTool
} from '@yomtor/core'
import { Path } from '@yomtor/paper'
import { AppShell, Header } from '@yomtor/ui'

const codeTemplate = (props: string) => `
import {
  YomtorProvider,
  Canvas,
  ViewTool,
  ZoomTool,
  TransformTool,
  SelectorTool,
  ManagementTool,
  GroupTool 
} from '@yomtor/core'

function Demo() {
  useEffect(() => {
    new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'red'
    })
  }, [])

  return (
    <YomtorProvider>
      <Canvas {...props} resize={false}>
        <ViewTool />
        <ZoomTool />
        <GroupTool />
        <SelectorTool />
        <ManagementTool />
        <TransformTool />
      </Canvas>
    </YomtorProvider>
  )
}
`
function Wrapper(props: CanvasProps) {
  useEffect(() => {
    new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'red',
      strokeColor: 'green'
    })

    new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'blue',
      strokeColor: 'green'
    })
  }, [])

  return (
    <YomtorProvider>
      <AppShell
        padding={0}
        fixed={false}
        header={<Header height={60}>Soy header</Header>}
      >
        <Canvas {...props} resize={false}>
          <ViewTool />
          <ZoomTool />
          <GroupTool />
          <SelectorTool />
          <ManagementTool />
          <TransformTool />
        </Canvas>
      </AppShell>
    </YomtorProvider>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: []
}
