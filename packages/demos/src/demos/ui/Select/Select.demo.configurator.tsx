import React, { useState } from 'react'
import { Select, SelectProps } from '@yomtor/ui'
import { PropsType, YomtorDemo } from '@yomtor/ds'
import { ArtboardIcon } from '@yomtor/icons'

const codeTemplate = (props: PropsType<SelectProps>, children: string) => `
import { Select } from '@yomtor/ui';

function Demo() {
  return (
    <Select${props}>
      ${children}
    </Select>
  );
}
`
function Wrapper(props: SelectProps) {
  const [value, setValue] = useState('')

  return (
    <Select
      {...props}
      icon={<ArtboardIcon size={props.size} />}
      onChange={setValue}
      data={[
        { value: 'python', label: 'Python', group: 'Test' },
        { value: 'java', label: 'Java', group: 'Test' },
        { value: 'ruby', label: 'Ruby', group: 'Test' },
        { value: 'rust', label: 'Rust', group: 'c' },
        { value: 'csharp', label: 'C#', group: 'c' },
        { value: 'go', label: 'Go', group: 'c' },
        { value: 'php', label: 'PHP' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'scala', label: 'Scala' },
        { value: 'dart', label: 'Dart' },
        { value: 'elixir', label: 'Elixir' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'swift', label: 'Swift' },
        { value: 'perl', label: 'Perl' },
        { value: 'haskell', label: 'Haskell' },
        { value: 'lua', label: 'Lua' },
        { value: 'clojure', label: 'Clojure' },
        { value: 'fsharp', label: 'F#' },
        { value: 'pascal', label: 'Pascal' },
        { value: 'groovy', label: 'Groovy' },
        { value: 'ocaml', label: 'OCaml' },
        { value: 'racket', label: 'Racket' },
        { value: 'fortran', label: 'Fortran' },
        { value: 'julia', label: 'Julia' },
        { value: 'prolog', label: 'Prolog' }
      ]}
      value={value}
    />
  )
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
      defaultValue: 'toggle',
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
      initialValue: 'Pick one'
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
      name: 'ticked',
      type: 'boolean',
      defaultValue: true,
      initialValue: true
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: false,
      initialValue: false
    }
  ]
}
