import React, { useState } from 'react'
import { useColorWord } from '@yomtor/hooks'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { useState } form 'react'
import { useColorWord } from '@yomtor/hooks';

const [text, setText] = useState('')
const color = useColorWord(text)

function Demo() {
  return (
    <div
      style={{
        backgroundColor: color,
        height: '50px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'Enter text...'}
      />
      <span>{color}</span>
    </div>
  );
}
`

function Demo() {
  const [text, setText] = useState('')
  const color = useColorWord(text)
  return (
    <div
      style={{
        backgroundColor: color,
        height: '50px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: '10px'
      }}
    >
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter text...'
      />
      <span>{color}</span>
    </div>
  )
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
