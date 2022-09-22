import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Group as BaseGroup, GroupProps as BaseGroupProps } from '@mantine/core'

export interface GroupProps extends BaseGroupProps {}

const defaultProps: Partial<GroupProps> = {}

export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
    const { ...others } = useComponentDefaultProps('Group', defaultProps, props)

    return <BaseGroup {...others} ref={ref} />
}) as any
