import {
    DefaultProps,
    PolymorphicComponentProps,
    YomtorSizes
} from '@yomtor/styles'

type Props = DefaultProps & {
    size?: YomtorSizes
    type?: 'submit' | 'button' | 'reset'
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
    uppercase?: boolean
    loading?: boolean
    disabled?: boolean
    hoverOpacity?: number
    withInk?: boolean
    onClick?: () => void
}

export type UnstyledButtonProps<C = 'button'> = PolymorphicComponentProps<
    C,
    Props
>

export type UnstyledButtonComponent = (<C = 'button'>(
    props: UnstyledButtonProps<C>
) => React.ReactElement) &
    React.ForwardRefExoticComponent<UnstyledButtonProps<string>>
