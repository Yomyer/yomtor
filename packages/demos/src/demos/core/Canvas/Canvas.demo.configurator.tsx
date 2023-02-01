import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import {
  YomtorProvider,
  Canvas,
  CanvasProps,
  ViewTool,
  ZoomTool,
  TransformTool,
  SelectorTool
} from '@yomtor/core'
import { Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import { Yomtor } from '@yomtor/core'

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
        <SelectorTool />
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
  }, [])

  return (
    <YomtorProvider>
      <Canvas {...props} resize={false}>
        <ViewTool />
        <ZoomTool />
        <SelectorTool />
        <TransformTool />
      </Canvas>
    </YomtorProvider>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: []
}
