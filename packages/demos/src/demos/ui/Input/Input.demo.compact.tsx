import React from 'react'
import { Button, Group, Input, Tooltip } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

const code = `
import { Tooltip, Button } from '@mantine/core';
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
  return (
    <Input
      size='md'
      placeholder='Enter text'
      icon={<ArtboardIcon />}
    />
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
