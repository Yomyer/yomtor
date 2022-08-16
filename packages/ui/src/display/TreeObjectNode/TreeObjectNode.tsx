import React from 'react'
import { TreeObjectNodeStyles } from './TreeObjectNode.styles'
import { TreeObjectProps } from './TreeObjectNode.props'
import { LockIcon, ArtboardIcon } from '@yomtor/icons'
import { useClearProps } from '@yomtor/hooks'

/**
 * Description
 */
export const TreeObjectNode: React.FC<TreeObjectProps> = ({
    classNames,
    node,
    ...props
}) => {
    const { classes } = TreeObjectNodeStyles(
        { ...props },
        { name: 'TreeObjectNode', classNames }
    )

    return (
        <div className={classes.root} {...useClearProps(props)}>
            <ArtboardIcon />

            <div className={classes.label}>
                {node.label}

                <div className={classes.actions}>
                    <LockIcon />
                    <LockIcon />
                </div>
            </div>
        </div>
    )
}

TreeObjectNode.defaultProps = {}
