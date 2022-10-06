import React, { useState } from 'react'
import { useHexToRgb } from '@yomtor/hooks'

const code = `
import { useState } form 'react'
import { useHexToRgb } from '@yomtor/hooks';

const [hex, setHex] = useState<string>('')
const rgb = useHexToRgb(hex)

function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: rgb ? rgb : '',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder={'Enter a color name...'}
      />
      {rgb && <span>{rgb}</span>}
    </div>
  );
}
`

function Demo() {
  const [hex, setHex] = useState<string>('')
  const rgb = useHexToRgb(hex)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: rgb || '',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder='Enter a color name...'
      />
      {rgb && <span>{rgb}</span>}
    </div>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
