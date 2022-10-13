import React, { useState } from 'react'
import { useColorNames } from '@yomtor/hooks'
import { MantineDemo } from '@yomtor/ds'

const code = `
import { useState } form 'react'
import { useColorNames } from '@yomtor/hooks';

  const [colorName, setColorName] = useState<string>('')
  const hex = useColorNames(colorName)

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
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        placeholder={'Enter a color name...'}
      />
      {hex && <span>{hex}</span>}
    </div>
  );
}
`

function Demo() {
  const [colorName, setColorName] = useState<string>('')
  const hex = useColorNames(colorName)
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
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
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
