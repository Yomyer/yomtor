import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Aside as BaseAside } from '@mantine/core'
import { AsideProps } from './Aside.props'
import useStyles from './Aside.styles'
import { ResizePanel } from '../ResizePanel'

const defaultProps: Partial<AsideProps> = {
  min: 250,
  max: 500,
  width: { base: 250 }
}

export const Aside = forwardRef<HTMLDivElement, AsideProps>((props, ref) => {
  const { unstyled, width, className, ...others } = useComponentDefaultProps(
    'Aside',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Aside', unstyled })

  return (
    <ResizePanel
      {...others}
      sizes={width}
      direction='w'
      ref={ref}
      panel={BaseAside}
    />
  )
})

Aside.displayName = '@yomtor/ui/Aside'
