import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/app'

createRoot(document.createElement('div')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
