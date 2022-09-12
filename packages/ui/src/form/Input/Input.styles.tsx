import { createStyles } from '@yomtor/styles'
import { InputProps } from './Input.props'

type Classes = 'root' | 'input'

export const InputStyles = createStyles<Classes, InputProps>((theme) => ({
    root: {
        color: 'red'
    },
    input: {
        borderColor: 'blue'
    }
}))
