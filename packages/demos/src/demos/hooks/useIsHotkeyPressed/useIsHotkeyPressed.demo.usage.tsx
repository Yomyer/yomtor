import React, { useState } from 'react'
import { useHotkeys, useIsHotkeyPressed } from '@yomtor/hooks'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { useState } form 'react'
import { useHotkeys, useIsHotkeysPressed } from '@yomtor/hooks'

const [isHotKeyPressed, setIsHotKeyPressed] = useState<boolean>(false)
useHotkeys({
  keys: '*'
})

function Demo() {
  return (
    <>
      <p style={{ color: isHotKeyPressed ? 'blue' : null }}>
        Try typing A
      </p>
      <input onChange={() => setIsHotKeyPressed(useIsHotkeyPressed('a'))} />
    </>
  );
}
`

function Demo() {
  const [isHotKeyPressed, setIsHotKeyPressed] = useState<boolean>(false)
  useHotkeys({
    keys: '*'
  })
  return (
    <>
      <p style={{ color: isHotKeyPressed ? 'blue' : null }}>Try typing A</p>
      <input onChange={() => setIsHotKeyPressed(useIsHotkeyPressed('a'))} />
    </>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
