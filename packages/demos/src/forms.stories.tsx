import React, { useEffect } from 'react'
import { Group, Button, Input, ActionIcon } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

export default {
  title: 'Forms'
}

export function InlineForm() {
  return (
    <Group>
      <ActionIcon>
        <ArtboardIcon />
      </ActionIcon>
      <Input icon={<ArtboardIcon size='md' />} />
      <Input />
      <Button>
        <ArtboardIcon />
      </Button>
    </Group>
  )
}
