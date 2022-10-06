import React from 'react'
import { useMediaQuery } from '@yomtor/hooks'

const code = `
import { useMediaQuery } from '@yomtor/hooks'

const matchOrientation = useMediaQuery('(orientation: landscape)')
const matchWidth = useMediaQuery('(min-width: 600px)')

function Demo() {
  return (
    <>
      <p style={{ color: matchOrientation ? '#304683' : '#228850' }}>
        Orientation is {matchOrientation ? 'landscape' : ' portrait'}
      </p>
      <p style={{ color: matchWidth ? '#304683' : '#228850' }}>
        Width is { matchWidth ? 'larger' : 'smaller' } than 600px
      </p>
    </>
  );
}
`

function Demo() {
  const matchOrientation = useMediaQuery('(orientation: landscape)')
  const matchWidth = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <p style={{ color: matchOrientation ? '#304683' : '#228850' }}>
        {`Orientation is ${matchOrientation ? 'landscape' : ' portrait'}`}
      </p>
      <p style={{ color: matchWidth ? '#304683' : '#228850' }}>
        {`Width is ${matchWidth ? 'larger' : 'smaller'} than 600px`}
      </p>
    </>
  )
}

export const compact: MantineDemo = {
  type: 'demo',
  code,
  component: Demo
}
