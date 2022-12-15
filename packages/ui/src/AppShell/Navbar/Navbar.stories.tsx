import React from 'react'
import { Navbar } from './Navbar'
import { AppShell } from '..'

export default {
  title: 'UI/Layout/Navbar',
  parameters: { layout: 'fullscreen' }
}

export function Default() {
  return (
    <AppShell navbar={<Navbar width={{ base: 400 }}>dasda</Navbar>}>
      asdas
    </AppShell>
  )
}
