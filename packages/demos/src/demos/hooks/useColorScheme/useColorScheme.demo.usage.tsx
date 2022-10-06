import React from 'react'
import { useColorScheme } from '@yomtor/hooks'

const code = `
import { useColorScheme } from '@yomtor/hooks'

const preferedColorScheme = useColorScheme()

function Demo() {
  return (
    <>
      <p>Preferred color scheme:</p>
      <p>{preferedColorScheme} {preferedColorScheme === 'light' ? '☀' : '☾'}</p>
    </>
  );
}
`

function Demo() {
  const preferedColorScheme = useColorScheme()
  return (
    <>
      <p>Preferred color scheme:</p>
      <p>
        {preferedColorScheme} {preferedColorScheme === 'light' ? '☀' : '☾'}
      </p>
    </>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
