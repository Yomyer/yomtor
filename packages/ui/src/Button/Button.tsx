import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@mantine/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps
} from '@mantine/core'

export interface ButtonProps extends BaseButtonProps {}

const defaultProps: Partial<ButtonProps> = {
    size: 'xs',
    variant: 'default',
    radius: 'xs',
    compact: true
}

export const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const { ...others } = useComponentDefaultProps(
            'button',
            defaultProps,
            props
        )

        return <BaseButton {...others} ref={ref} />
    }
) as any

_Button.displayName = '@yomtor/ui/Button'
_Button.Group = BaseButton.Group

export const Button = createPolymorphicComponent<
    'button',
    ButtonProps,
    { Group: typeof BaseButton.Group }
>(_Button)
