import React from 'react'
import { __component__ } from '@yomtor/ui'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { __component__ } from '@yomtor/ui';
function function __name__(pascalCase)() {() {
  return <__component__>My compact button</__component__>;
}
`

function __name__(pascalCase)() {
  return (
      <__component__>Compact filled button</__component__>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: __name__(pascalCase)
}
