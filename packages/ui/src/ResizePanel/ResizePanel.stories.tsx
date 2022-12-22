import React from 'react'
import { ResizePanel } from './ResizePanel'
import { Navbar } from '../AppShell/Navbar'
import { AppShell } from '../AppShell'

export default {
  title: 'UI/Utils/ResizePanel',
  parameters: { layout: 'fullscreen' }
}

export function Default() {
  return (
    <AppShell
      navbar={
        <ResizePanel>
          <Navbar width={{ base: 200 }}>aaaaa</Navbar>
        </ResizePanel>
      }
    >
      sdasda
    </AppShell>
  )
}
