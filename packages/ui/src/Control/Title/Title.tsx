import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { TitleProps } from './Title.props'
import useStyles from './Title.styles'
import { Group } from '../Group'
import { Panel } from '../Panel'
import { Title as TitleBase } from '../../Title'

const defaultProps: Partial<TitleProps> = {}

export const Title = forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { unstyled, children, className, ...others } = useComponentDefaultProps(
    'Title',
    defaultProps,
    props
  )

  const { classes, cx } = useStyles({ ...others }, { name: 'Title', unstyled })

  return (
    <Group {...others} ref={ref} className={cx(className, classes.root)}>
      <Panel columns={28}>
        <TitleBase order={6} className={classes.title}>
          {children}
        </TitleBase>
      </Panel>
    </Group>
  )
})

Title.displayName = '@yomtor/ui/Title'
