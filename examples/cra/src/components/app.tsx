import React from 'react'
// import { Input, InputProps } from '@yomtor/ui'
import styled from '@emotion/styled'
import { YomtorProvider } from '@yomtor/styles'
import { Button } from '@yomtor/ui'
import { ArtboardIcon } from '@yomtor/icons'

export const App = () => {
    return (
        <YomtorProvider theme={{ colorScheme: 'dark' }}>
            <Button>
                <ArtboardIcon />
            </Button>
        </YomtorProvider>
    )
}
