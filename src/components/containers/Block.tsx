import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    block: {
        width: '100%',
        height: 'inherit',
        minHeight: 'inherit',
        maxHeight: 'inherit',
        display: 'flex',
        boxSizing: 'border-box',
        placeContent: 'center space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        '& > *': {
            width: '100%',
            marginRight: '5px'
        },
        '& > *:last-child': {
            marginRight: '0'
        }
    }
})

const Block: React.FC = ({ children }) => {
    const { block } = useStyles()

    return <div className={block}>{children}</div>
}

export default Block
