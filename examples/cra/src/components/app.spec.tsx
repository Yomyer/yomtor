import React from 'react'
import { App } from './app'
import { render, screen } from '@testing-library/react'

test('App', () => {
  render(<App />)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})
