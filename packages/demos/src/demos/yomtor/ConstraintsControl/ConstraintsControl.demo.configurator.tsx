import React from 'react'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { ConstraintsControls, ConstraintsControlsProps } from '@yomtor/yomtor'

const codeTemplate = (props: PropsType<ConstraintsControlsProps>) => `
import { Control } from '@yomtor/ui'

function Demo() {
  return (
    <ConstraintsControls${props} />
  );
}
`
function Wrapper(props: ConstraintsControlsProps) {
  return (
    <>
      <ConstraintsControls {...props} />
    </>
  )
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'visible',
      type: 'boolean',
      initialValue: true,
      defaultValue: false
    }
  ]
}
