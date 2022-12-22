import React from 'react'
import { Input } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { Input } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

function Demo() {
  return (
    <Input
      size='md'
      placeholder='Enter text'
      icon={<ArtboardIcon />}
    />
}
`

function Demo() {
  return <Input size='md' placeholder='Enter text' icon={<ArtboardIcon />} />
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
