import React from 'react'
import { useColorScheme } from '@yomtor/hooks'

const code = `
import { useColorScheme } from '@yomtor/hooks'

const preferedColorScheme = useColorScheme()
const icon = preferedColorScheme === 'light' ? '☀' : '☾'

function Demo() {
  return (
    <>
      <p>Preferred color scheme:</p>
      <p>{preferedColorScheme + ' ' + icon}</p>
    </>
  );
}
`

function Demo() {
  const preferedColorScheme = useColorScheme()
  const icon = preferedColorScheme === 'light' ? '☀' : '☾'
  return (
    <>
      <p>Preferred color scheme:</p>
      <p>{preferedColorScheme + ' ' + icon}</p>
    </>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
