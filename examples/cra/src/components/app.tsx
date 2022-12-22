import React from 'react'
import { YomtorProvider } from '@yomtor/styles'
import { Button } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

export const App = () => {
  return (
    <YomtorProvider theme={{ colorScheme: 'dark' }}>
      <Button.Group>
        <Button>
          asda
          <ArtboardIcon />
        </Button>
      </Button.Group>
    </YomtorProvider>
  )
}
