import React from 'react'
import { ControlProps } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { ConstraintsControls } from '@yomtor/yomtor'

const codeTemplate = (props: PropsType<ControlProps>) => `
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
      <ConstraintsControls visible />
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
