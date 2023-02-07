import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import {
  EditorProvider,
  Canvas,
  GroupTool,
  GroupToolProps,
  SelectorTool
} from '@yomtor/core'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import {
  YomtorProvider,
  Canvas,
  GroupTool,
  SelectorTool
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
        <SelectorTool />  
        <GroupTool ${props}/>
      </Canvas>
    </YomtorProvider>
  )
}
`

function Wrapper(props: GroupToolProps) {
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
        <GroupTool {...props} />
        <SelectorTool />
      </Canvas>
    </EditorProvider>
  )
}

export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: []
}
