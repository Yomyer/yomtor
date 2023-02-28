import React, { useEffect } from 'react'
import { YomtorProvider } from '@yomtor/styles'
import { AppShell, Header, Navbar } from '@yomtor/ui'
import {
  Canvas,
  EditorProvider,
  GroupTool,
  ManagementTool,
  RectangleTool,
  SelectorTool,
  TransformTool,
  ViewTool,
  ZoomTool
} from '@yomtor/core'
import { Path } from '@yomtor/paper'
import { ObjectControls } from '@yomtor/yomtor'

export const App = () => {
  useEffect(() => {
    const a = new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'red',
      strokeColor: 'green'
    })
  }, [])

  return (
    <YomtorProvider theme={{ colorScheme: 'dark' }}>
      <EditorProvider>
        <AppShell
          padding={0}
          navbar={
            <Navbar width={{ base: 200 }} resize min={100} max={500}>
              <ObjectControls />
            </Navbar>
          }
          header={
            <Header height={40}>
              <RectangleTool>
                <button>Rectangle</button>
              </RectangleTool>
            </Header>
          }
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
      </EditorProvider>
    </YomtorProvider>
  )
}
