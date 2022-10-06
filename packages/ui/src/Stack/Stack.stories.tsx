import React from 'react'
import { Button } from '../Button'
import { Stack } from './Stack'

export default {
  title: 'UI/Layout/Stack'
}

export function Default() {
  return (
    <Stack>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
    </Stack>
  )
}
