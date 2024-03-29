import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import { EditorProvider, Canvas, ViewToolProps, ViewTool } from '@yomtor/core'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import { YomtorProvider, Canvas, ViewTool } from '@yomtor/core'
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
        <ViewTool ${props}/>
      </Canvas>
    </YomtorProvider>
  )
}
`

function Wrapper(props: ViewToolProps) {
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
        <ViewTool {...props} />
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
    }
  ]
}
