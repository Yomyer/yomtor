import React from 'react'
import { Input, InputProps } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { YomtorDemo } from '@yomtor/ds'

const codeTemplate = (props: string) => `
import { Input } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

function Demo() {
  return (
    <Input${props} icon={<ArtboardIcon />} />
  );
}
`
function Wrapper(props: InputProps) {
  return <Input {...props} icon={<ArtboardIcon />} />
}
export const configurator: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'variant',
      type: 'segmented',
      initialValue: 'default',
      defaultValue: 'default',
      data: [
        { label: 'default', value: 'default' },
        { label: 'filled', value: 'filled' },
        { label: 'unstyled', value: 'unstyled' }
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
      initialValue: 'sm',
      defaultValue: 'sm'
    },
    {
      name: 'size',
      type: 'size',
      initialValue: 'sm',
      defaultValue: 'sm'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    },
    {
      name: 'invalid',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
