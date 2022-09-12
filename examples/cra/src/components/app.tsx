import React from 'react'
import { Input, InputProps } from '@yomtor/ui'
import { createPolymorphicComponent, YomtorProvider } from '@yomtor/styles'
import styled from '@emotion/styled'

const _StyledInput = styled(Input)`
& .yomtor-Input-input {
    border-color: ${({ theme }) => {
        return 'blue'
    }}
`

const StyledInput = createPolymorphicComponent<'input', InputProps>(
    _StyledInput
)

export const App = () => {
    return (
        <YomtorProvider>
            <Input></Input>
            <StyledInput unstyled={true}></StyledInput>
        </YomtorProvider>
    )
}
