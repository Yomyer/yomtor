import { createStyles } from '@yomtor/styles'
import { UnstyledButtonProps } from './UnstyledButton.props'

type Classes = 'root' | 'hover' | 'content'

export const UnstyledButtonStyles = createStyles<
    Classes,
    UnstyledButtonProps & { hovered?: boolean }
>((theme, { fullWidth, hovered, hoverOpacity }, getRef) => {
    const hoverRef = getRef('hover')

    return {
        root: {
            minHeight: 22,
            cursor: 'pointer',
            position: 'relative',
            border: 'none',
            width: fullWidth && '100%',
            outline: 'none',
            background: 'none',
            color: 'inherit',
            userSelect: 'none',
            height: 'inherit',
            fontSize: 'inherit',
            display: fullWidth ? 'flex' : 'inline-flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: 0,
            opacity: 1,
            [`&:hover .${hoverRef}`]: {
                opacity: hoverOpacity
            }
        },
        content: {
            display: 'flex',
            position: 'relative'
        },
        hover: {
            ref: hoverRef,
            borderRadius: 'inherit',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease-in-out',
            opacity: 0,
            background: theme.palette.divider
        }
    }
})
