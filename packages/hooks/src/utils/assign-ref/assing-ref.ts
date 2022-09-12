import React, { ForwardedRef } from 'react'

export function assignRef<T = any>(
    ref: React.ForwardedRef<T>,
    value: T | null,
    nodeRef?: React.ForwardedRef<T>
) {
    if (typeof ref === 'function') {
        ref(value)
    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = value
    }

    if (nodeRef) {
        assignRef(nodeRef, value)
    }
}
