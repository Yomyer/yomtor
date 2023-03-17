import React from 'react'
import { Input } from './Input'
import { Button } from '../Button'
import { ArtboardIcon } from '@yomtor/icons'
import { Group } from '@mantine/core'

export default {
  title: 'UI/Inputs/Input'
}

export function InlineForm() {
  return (
    <Group>
      <Button compact={false}>
        <ArtboardIcon />
      </Button>
      <Button>
        <ArtboardIcon />
      </Button>
      <Input.Wrapper label='test' size='xs'>
        <Input />
      </Input.Wrapper>

      <Input.Wrapper label='test'>
        <Input />
      </Input.Wrapper>
    </Group>
  )
}
