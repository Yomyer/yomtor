import React, { useEffect } from 'react'
import { YomtorProvider } from '@yomtor/styles'
import { AppShell, Header, Navbar } from '@yomtor/ui'
import {
  EditorProvider,
  Canvas,
  ViewTool,
  ZoomTool,
  TransformTool,
  SelectorTool,
  ManagementTool,
  GroupTool,
  OvalTool,
  RectangleTool,
  PolygonTool,
  ArtboardTool,
  ConstraintsTool
} from '@yomtor/core'
import { Path, Artboard } from '@yomtor/paper'
import { ObjectControls } from '@yomtor/yomtor'

export const App = () => {
  useEffect(() => {
    const artboard = new Artboard({
      from: [200, 200],
      to: [600, 600]
    })
    const path = new Path.Rectangle({
      from: [350, 350],
      to: [550, 550],
      fillColor: '#D9D9D9',
      name: 'Rectangle'
    })

    artboard.addChild(path)

    artboard.rotate(45)
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
              <OvalTool>
                <button>OvalTool</button>
              </OvalTool>
              <PolygonTool>
                <button>PolygonTool</button>
              </PolygonTool>
              <ArtboardTool>
                <button>ArtboardTool</button>
              </ArtboardTool>
            </Header>
          }
        >
          <Canvas>
            <ViewTool />
            <ZoomTool />
            <GroupTool />
            <SelectorTool />
            <ManagementTool />
            <ConstraintsTool />
            <TransformTool />
          </Canvas>
        </AppShell>
      </EditorProvider>
    </YomtorProvider>
  )
}
