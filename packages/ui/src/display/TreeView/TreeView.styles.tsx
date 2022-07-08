import { createStyles } from '@yomtor/styles'
import { TreeViewProps } from './TreeView.props'

type Classes =
    | 'root'
    | 'viewport'
    | 'node'
    | 'collapser'
    | 'indents'
    | 'indent'
    | 'first'
    | 'actived'
    | 'parentActived'
    | 'highlighted'
    | 'wrapperNode'
    | 'line'

export const TreeViewStyles = createStyles<Classes, TreeViewProps>(
    (theme, { indentWitdh }) => ({
        root: {
            height: '100%',
            width: '100%',
            maxHeight: 'inherit',
            maxWidth: 'inherit',
            display: 'flex'
        },
        viewport: {
            position: 'relative'
        },
        wrapperNode: {
            width: '100%',
            position: 'absolute',
            top: 0,
            height: 32
        },
        node: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            letterSpacing: '.005em',
            fontSize: 13
        },
        indents: {
            display: 'flex',
            position: 'relative',
            height: '100%',
            flexShrink: '0'
        },
        indent: {
            width: indentWitdh,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            flexShrink: '0'
        },
        first: {
            marginRight: 0
        },
        collapser: {
            position: 'absolute',
            right: 0,
            fontSize: 8,
            opacity: 0.5,
            visibility: 'hidden',
            cursor: 'pointer'
        },
        actived: {
            background: theme.fn.rgba(theme.palette.primary.main, 0.3)
        },
        parentActived: {
            background: theme.fn.rgba(theme.palette.primary.main, 0.1)
        },
        highlighted: {
            '&:after': {
                content: '""',
                position: 'absolute',
                top: '0px',
                bottom: '0px',
                left: '0',
                right: '0',
                border: `1px solid ${theme.palette.primary.main}`,
                pointerEvents: 'none'
            }
        },
        line: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 3,
            background: 'white',
            pointerEvents: 'none'
        }
    })
)
