import { createStyles } from '@yomtor/styles'
import { InputProps } from './Input.props'

type Classes = 'root'

export const InputStyles = createStyles<Classes, InputProps>(
    (theme, { color }) => ({
        root: {
            color: color
        }
    })
)
