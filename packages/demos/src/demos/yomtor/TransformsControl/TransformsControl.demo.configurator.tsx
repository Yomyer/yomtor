import React from 'react'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { TransformsControls, TransformsControlsProps } from '@yomtor/yomtor'

const codeTemplate = (props: PropsType<TransformsControlsProps>) => `
import { Control } from '@yomtor/ui'

function Demo() {
  return (
    <TransformsControls${props} />
  );
}
`
function Wrapper(props: TransformsControlsProps) {
  return (
    <>
      <TransformsControls {...props} />
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
