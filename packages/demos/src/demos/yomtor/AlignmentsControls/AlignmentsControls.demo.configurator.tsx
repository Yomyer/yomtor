import React from 'react'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { AlignmentsControls, AlignmentsControlsProps } from '@yomtor/yomtor'

const codeTemplate = (props: PropsType<AlignmentsControlsProps>) => `
import { Control } from '@yomtor/ui'

function Demo() {
  return (
    <AlignmentsControls${props} />
  );
}
`
function Wrapper(props: AlignmentsControlsProps) {
  return (
    <>
      <AlignmentsControls {...props} />
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
