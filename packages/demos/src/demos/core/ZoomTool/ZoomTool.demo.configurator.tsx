import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import { EditorProvider, Canvas, ZoomToolProps, ZoomTool } from '@yomtor/core'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import { YomtorProvider, Canvas, ZoomTool } from '@yomtor/core'
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

function Wrapper(props: ZoomToolProps) {
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
        <ZoomTool {...props}>{(zoom) => <div>{zoom}</div>}</ZoomTool>
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
