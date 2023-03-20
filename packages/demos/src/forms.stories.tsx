import React, { useEffect } from 'react'
import { Group, Button, Input, ActionIcon, Title } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

export default {
  title: 'Forms'
}

export function InlineForm() {
  return (
    <>
      <Title order={3}>Inline Height</Title>
      <Group>
        <ActionIcon>
          <ArtboardIcon />
        </ActionIcon>
        <Input icon={<ArtboardIcon size='md' />} />
      </Group>
    </>
  )
}
