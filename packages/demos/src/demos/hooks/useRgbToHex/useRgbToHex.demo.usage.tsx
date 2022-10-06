import React, { useState } from 'react'
import { useRgbToHex } from '@yomtor/hooks'

const code = `
import { useState } form 'react'
import { useRgbToHex } from '@yomtor/hooks';

const [rgb, setRgb] = useState<string>('')
const hex = rgb.length > 1 && useRgbToHex(rgb)

function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: hex ? hex : '',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={rgb}
        onChange={(e) => setRgb(e.target.value)}
        placeholder={'Enter a color name...'}
      />
      {hex && <span>{hex}</span>}
    </div>
  );
}
`

function Demo() {
  const [rgb, setRgb] = useState<string>('')
  const hex = rgb.length > 1 && useRgbToHex(rgb)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: hex || '',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={rgb}
        onChange={(e) => setRgb(e.target.value)}
        placeholder='Enter a color name...'
      />
      {hex && <span>{hex}</span>}
    </div>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
