import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import { EditorProvider, Canvas, ZoomTool } from '@yomtor/core'
import { ZoomControls, ZoomControlsProps } from '@yomtor/yomtor'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import { YomtorProvider, Canvas, ViewToolProps, ZoomTool } from '@yomtor/core'
import { Path } from '@yomtor/paper'

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
      <Canvas resize={false} >
        <ZoomTool ${props}/>
      </Canvas>
    </YomtorProvider>
  )
}
`

function Wrapper(props: ZoomControlsProps) {
  useEffect(() => {
    new Path.Rectangle({
      from: [10, 10],
      to: [50, 50],
      fillColor: 'red'
    })
  }, [])

  return (
    <EditorProvider>
      <Canvas resize={false}>
        <ZoomTool>
          <ZoomControls {...props} />
        </ZoomTool>
      </Canvas>
    </EditorProvider>
  )
}

export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'factor',
      type: 'number',
      initialValue: 5,
      defaultValue: 5
    },
    {
      name: 'pixelGrid',
      type: 'boolean',
      initialValue: true,
      defaultValue: true
    }
  ]
}
