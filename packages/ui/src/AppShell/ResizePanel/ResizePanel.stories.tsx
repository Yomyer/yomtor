import React from 'react'
import { Navbar } from '../Navbar'
import { AppShell } from '../AppShell'

export default {
  title: 'UI/Layout/ResizePanel',
  parameters: { layout: 'fullscreen' }
}

export function Default() {
  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 200 }} resize min={100} max={500}>
          aaaaa
        </Navbar>
      }
    >
      sdasda
    </AppShell>
  )
}
