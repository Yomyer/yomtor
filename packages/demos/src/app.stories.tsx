import React, { useEffect } from 'react'
import { AppShell, Navbar, Header } from '@yomtor/ui'
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
  ArtboardTool
} from '@yomtor/core'
import { ObjectControls } from '@yomtor/yomtor'
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
      strokeColor: 'green',
      name: 'Rectangle'
    })

    new Path.Rectangle({
      from: [150, 200],
      to: [300, 250],
      fillColor: 'blue',
      strokeColor: 'green',
      name: 'Rectangle'
    })
  }, [])

  return (
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
          <TransformTool />
        </Canvas>
      </AppShell>
    </EditorProvider>
  )
}
