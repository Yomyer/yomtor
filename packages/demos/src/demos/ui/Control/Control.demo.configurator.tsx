import React from 'react'
import { Constraints, Control, ControlProps } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string) => `
import { Control } from '@yomtor/ui'

function Demo() {
  return (
    <Control${props} />
    
  );
}
`
function Wrapper(props: ControlProps) {
  return (
    <>
      <Control>
        <Control.Title>Mola mazo xD</Control.Title>
      </Control>
      <Control>
        <Control.Title>Constraints</Control.Title>
        <Control.Group>
          <Control.Panel>
            <Constraints />
          </Control.Panel>
        </Control.Group>
      </Control>
    </>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'color',
      type: 'color',
      initialValue: 'primary',
      defaultValue: 'primary'
    }
  ]
}
