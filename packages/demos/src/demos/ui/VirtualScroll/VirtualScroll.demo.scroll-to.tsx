import React, { useRef } from 'react'
import {
  VirtualScroll,
  VirtualScrollProps,
  Stack,
  Group,
  Button
} from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'
import { Virtualizer } from '@yomtor/hooks'

const codeTemplate = (props: string, children: string) => `
import { VirtualScroll, Stack, Group, Button} from '@yomtor/ui'
import { Virtualizer } from '@yomtor/hooks'

function Demo() {
  const viewport = useRef<Virtualizer<HTMLElement, any>>(null)

  const scrollToBottom = () => {
    viewport.current.scrollToIndex(viewport.current.options.count, {
      align: 'center'
    })
  }
  const scrollToCenter = () => {
    viewport.current.scrollToIndex(viewport.current.options.count / 2, {
      align: 'center'
    })
  }
  const scrollToTop = () => {
    viewport.current.scrollToIndex(0)
  }

  return (
    <Stack align='center'>
      <VirtualScroll${props} virtualizerRef={viewport} count={300000} style={{ height: 300, width: 300 }}/>
      <Group position='center'>
        <Button onClick={scrollToBottom} variant='outline'>
          Scroll to bottom
        </Button>
        <Button onClick={scrollToCenter} variant='outline'>
          Scroll to center
        </Button>
        <Button onClick={scrollToTop} variant='outline'>
          Scroll to top
        </Button>
      </Group>
    </Stack>
  )
}
`
function Wrapper(props: VirtualScrollProps) {
  const viewport = useRef<Virtualizer<HTMLElement, any>>(null)

  const scrollToBottom = () => {
    viewport.current.scrollToIndex(viewport.current.options.count, {
      align: 'center'
    })
  }
  const scrollToCenter = () => {
    viewport.current.scrollToIndex(viewport.current.options.count / 2, {
      align: 'center'
    })
  }
  const scrollToTop = () => {
    viewport.current.scrollToIndex(0)
  }

  return (
    <Stack align='center'>
      <VirtualScroll
        virtualizerRef={viewport}
        count={300000}
        {...props}
        style={{ height: 300, width: 300 }}
      />
      <Group position='center'>
        <Button onClick={scrollToBottom} variant='outline'>
          Scroll to bottom
        </Button>
        <Button onClick={scrollToCenter} variant='outline'>
          Scroll to center
        </Button>
        <Button onClick={scrollToTop} variant='outline'>
          Scroll to top
        </Button>
      </Group>
    </Stack>
  )
}
export const scrollTo: YomtorDemo = {
  type: 'configurator',
  codeTemplate,
  component: Wrapper,
  configurator: [
    {
      name: 'behavior',
      type: 'boolean',
      initialValue: false,
      defaultValue: false
    }
  ]
}
