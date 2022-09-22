import React, { memo, forwardRef, ReactNode } from 'react'
import { SvgIcon, SvgIconProps } from '../SvgIcon'

export const createSvgIcon = (
    path: ReactNode,
    displayName: string,
    viewbox = '0 0 32 32'
) => {
    const Component = (props: SvgIconProps, ref: never) => (
        <SvgIcon {...props} viewbox={viewbox}>
            {path}
        </SvgIcon>
    )

    if (process.env.NODE_ENV !== 'production') {
        // Need to set `displayName` on the inner component for React.memo.
        // React prior to 16.14 ignores `displayName` on the wrapper.
        Component.displayName = `${displayName}Icon`
    }

    return memo(forwardRef<unknown, SvgIconProps>(Component))
}
