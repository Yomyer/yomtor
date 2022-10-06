import React from 'react'
import { Input, Tooltip } from '@yomtor/ui'
import { ArtboardIcon, HideIcon } from '@yomtor/icons'

const code = `
import { Input, Tooltip } from '@yomtor/ui'
import { ArtboardIcon, HideIcon } from '@yomtor/icons'

function Demo() {
  return (
 <Input
      icon={<ArtboardIcon size={16} />}
      placeholder="Your portfolio"
      rightSection={
        <Tooltip label="Hide" position="right" withArrow>
          <div>
            <HideIcon size={18} style={{ display: 'block', opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
    />
}
`

function Demo() {
  return (
    <Input
      icon={<ArtboardIcon size={16} />}
      placeholder='Your portfolio'
      rightSection={
        <Tooltip label='Hide' position='right' withArrow>
          <div>
            <HideIcon size={18} style={{ display: 'block', opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
    />
  )
}

export const rightSection: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
