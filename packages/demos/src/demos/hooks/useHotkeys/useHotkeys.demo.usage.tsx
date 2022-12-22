import React, { useState } from 'react'
import { useHotkeys } from '@yomtor/hooks'

const code = `
import { useState } from 'react'
import { useHotkeys } from '@yomtor/hooks'

const [key, setKey] = useState<string>()
  useHotkeys({
    keys: 'arrows',
    down: (event: KeyboardEvent) => {
      setKey(event.key)
    },
    up: () => {
      setKey(undefined)
    }
  })

function Demo() {
  return (
    <>
      <p>Press any arrow outside the input</p>
      <input />
      <p>Key pressed: {key && <span>{key}</span>}</p>
    </>
  );
}
`

function Demo() {
  const [key, setKey] = useState<string>()
  useHotkeys({
    keys: 'arrows',
    down: (event: KeyboardEvent) => {
      setKey(event.key)
    },
    up: () => {
      setKey(undefined)
    }
  })
  return (
    <>
      <p>Press any arrow outside the input</p>
      <input />
      <p>Key pressed: {key && <span>{key}</span>}</p>
    </>
  )
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
