import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import {
  EditorProvider,
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

const code = `
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
    <EditorProvider>
      <AppShell padding={0} fixed={false} header={<Header>Soy header</Header>}>
        <Canvas {...props} resize={false}>
          <ViewTool />
          <ZoomTool />
          <GroupTool />
          <SelectorTool />
          <ManagementTool />
          <TransformTool />
        </Canvas>
      </AppShell>
    </EditorProvider>
  )
}
export const configurator: YomtorDemo = {
  type: 'demo',
  component: Wrapper,
  demoProps: { spacing: false },
  code
}
