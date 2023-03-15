import React from 'react'
import { Control, ControlProps } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
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
  return <Control />
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
