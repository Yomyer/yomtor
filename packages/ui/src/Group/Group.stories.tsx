import { Artboard2Icon, ArtboardIcon } from '@yomtor/icons'
import React from 'react'
import { ActionIcon } from '../ActionIcon'
import { Group } from './Group'

export default {
  title: 'UI/Layout/Group'
}

export function Default() {
  return (
    <Group>
      <ActionIcon variant='filled'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='gradient'>
        <ArtboardIcon />
      </ActionIcon>
      <ActionIcon variant='light'>
        <ArtboardIcon />
      </ActionIcon>
    </Group>
  )
}
