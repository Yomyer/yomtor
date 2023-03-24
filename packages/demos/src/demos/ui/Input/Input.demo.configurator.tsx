import React from 'react'
import { Input, InputProps } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { YomtorDemo, PropsType } from '@yomtor/ds'

const codeTemplate = (props: PropsType<InputProps>) => {
  return `
  import { Input } from '@yomtor/ui'
  import { ArtboardIcon } from '@yomtor/icons'
  
  function Demo() {
    return (
      <Input ${props} icon={<ArtboardIcon ${props.size}/>} />
    );
  }
  `
}
function Wrapper(props: InputProps) {
  return <Input {...props} icon={<ArtboardIcon size={props.size} />} />
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'variant',
      type: 'select',
      initialValue: 'toggle',
      defaultValue: 'defautogglelt',
      data: [
        { label: 'transparent', value: 'transparent' },
        { label: 'toggle', value: 'toggle' },
        { label: 'filled', value: 'filled' },
        { label: 'default', value: 'default' }
      ]
    },
    {
      name: 'placeholder',
      type: 'string',
      initialValue: 'Enter text'
    },
    {
      name: 'radius',
      type: 'size',
      initialValue: 'xs',
      defaultValue: 'xs'
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'md',
      defaultValue: 'md'
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
