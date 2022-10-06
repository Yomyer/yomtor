import React from 'react'
import { Paper } from './Paper'

export default {
  title: 'UI/Misc/Paper'
}

export function Default() {
  return (
    <Paper shadow='md' p='md'>
      <p>Paper is the most basic ui component</p>
      <p>
        {' '}
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
      </p>
    </Paper>
  )
}
