import { useLongPress } from '@yomtor/hooks'
import React, { useState } from 'react'

const code = `
import { useState } from 'react'
import { useLongPress } from '@yomtor/hooks'

const [longPressCount, setLongPressCount] = useState(0)
const onLongPress = () => {
  setLongPressCount(longPressCount + 1)
}

const longPressEvent = useLongPress(onLongPress)

function Demo() {
  return (
    <>
      <button {...longPressEvent}>Press me</button>
      <p>Long press count: {longPressCount}</p>
    </>
  );
}
`

function Demo() {
  const [longPressCount, setLongPressCount] = useState(0)
  const onLongPress = () => {
    setLongPressCount(longPressCount + 1)
  }

  const longPressEvent = useLongPress(onLongPress)
  return (
    <>
      <button {...longPressEvent}>Press me</button>
      <p>Long press count: {longPressCount}</p>
    </>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
