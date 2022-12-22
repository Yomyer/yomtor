import React from 'react'
import { Navbar } from '@yomtor/ui'
import { YomtorDemo } from '@yomtor/ds'

import { User } from './_user'
import { Brand } from './_brand'
import { MainLinks } from './_mainLinks'

const code = `
import { Navbar } from '@yomtor/ui';
function Demo() {
  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section>{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow mt="md">{/* Links sections */}</Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}
`

function Demo() {
  return (
    <Navbar height={600} p='xs'>
      <Navbar.Section mt='xs'>
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mt='md'>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  )
}

export const navbar: YomtorDemo = {
  type: 'demo',
  code,
  demoProps: { spacing: false },
  component: Demo
}