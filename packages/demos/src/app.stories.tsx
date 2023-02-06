import React, { useEffect } from 'react'
import { AppShell, Navbar, Header } from '@yomtor/ui'
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

export default {
  title: 'App',
  parameters: { layout: 'fullscreen' }
}

export function Default() {
  useEffect(() => {
    new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'red',
      strokeColor: 'green'
    })

    new Path.Rectangle({
      from: [150, 200],
      to: [300, 250],
      fillColor: 'blue',
      strokeColor: 'green'
    })
  }, [])

  return (
    <YomtorProvider>
      <AppShell
        padding={0}
        navbar={
          <Navbar width={{ base: 200 }} resize min={100} max={500}>
            aaaaa
          </Navbar>
        }
        header={<Header height={40}>Soy header</Header>}
      >
        <Canvas>
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
