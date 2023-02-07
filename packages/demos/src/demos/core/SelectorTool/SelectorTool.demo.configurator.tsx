import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import {
  EditorProvider,
  Canvas,
  SelectorTool,
  SelectorToolProps
} from '@yomtor/core'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import {
  YomtorProvider,
  Canvas,
  SelectorTool,
} from '@yomtor/core'
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
        <SelectorTool ${props}/>
      </Canvas>
    </YomtorProvider>
  )
}
`

function Wrapper(props: SelectorToolProps) {
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
        <SelectorTool {...props} />
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
      name: 'move',
      type: 'boolean',
      initialValue: true,
      defaultValue: true
    },
    {
      name: 'clone',
      type: 'boolean',
      initialValue: true,
      defaultValue: true
    }
  ]
}
