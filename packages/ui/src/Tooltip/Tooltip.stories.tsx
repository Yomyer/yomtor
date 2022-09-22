import React from 'react'
import { Button } from '../Button'
import { Tooltip } from './Tooltip'

export default {
  title: 'UI/Overlays/Tooltip'
}

export function Default() {
  return (
    <Tooltip label='Hey!'>
      <Button>Hover me</Button>
    </Tooltip>
  )
}
