import React, { forwardRef } from 'react'
import { createPolymorphicComponent } from '@yomtor/utils'
import { useComponentDefaultProps } from '@yomtor/styles'

import { Text as BaseText } from '@mantine/core'
import { TextProps } from './Text.props'
import useStyles from './Text.styles'

const defaultProps: Partial<TextProps> = {}

export const _Text = forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const { unstyled, ...others } = useComponentDefaultProps(
    'Text',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Text', unstyled })

  return <BaseText {...others} ref={ref} className={classes.root} />
}) as any

_Text.displayName = '@yomtor/ui/Text'

export const Text = createPolymorphicComponent<'div', TextProps>(_Text)
