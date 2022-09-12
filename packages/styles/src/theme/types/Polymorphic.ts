import React from 'react'

type ExtendedProps<
    _ExtendedProps = void,
    OverrideProps = void
> = OverrideProps & Omit<_ExtendedProps, keyof OverrideProps>

type PropsOf<
    C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<never>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type ComponentProp<C extends React.ElementType> = {
    /** Tag or component that should be used as root element */
    component?: C
}

type InheritedProps<
    C extends React.ElementType,
    Props = object
> = ExtendedProps<PropsOf<C>, Props>
