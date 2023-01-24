import React, { useRef, useEffect } from 'react'
import { YomtorDemo } from '@yomtor/ds'
import { YomtorProvider, Canvas, CanvasProps } from '@yomtor/core'
import { Artboard, PaperScope, Path } from '@yomtor/paper'

const codeTemplate = (props: string) => `
import { Yomtor } from '@yomtor/core'

function Demo() {
  return (
    <Canvas${props}>
    </Canvas>
  );
}
`
function Wrapper(props: CanvasProps) {
  const scopeRef = useRef<PaperScope>()

  useEffect(() => {
    const paper = scopeRef.current
    // console.log(paper)
    /*new Path.Rectangle({
      from: [250, 300],
      to: 900,
      fillColor: 'magenta'
    })*/
  }, [])

  return (
    <YomtorProvider>
      <Canvas {...props} resize={false} ref={scopeRef} />
    </YomtorProvider>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: []
}
