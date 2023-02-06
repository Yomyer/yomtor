import React from 'react'
import { Header } from './Header'
import { AppShell } from '..'

export default {
  title: 'UI/Layout/Header',
  parameters: { layout: 'fullscreen' }
}

export function Default() {
  return (
    <AppShell header={<Header width={{ base: 400 }}>dasda</Header>}>
      asdas
    </AppShell>
  )
}
