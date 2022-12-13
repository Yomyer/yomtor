import React, { forwardRef } from 'react'
import { useComponentDefaultProps } from '@yomtor/styles'

import { ResizePanelProps } from './ResizePanel.props'
import useStyles from './ResizePanel.styles'

const defaultProps: Partial<ResizePanelProps> = {}

export const ResizePanel = forwardRef<HTMLDivElement, ResizePanelProps>(
  (props, ref) => {
    const { unstyled, className, children, ...others } =
      useComponentDefaultProps('ResizePanel', defaultProps, props)

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'ResizePanel', unstyled }
    )

    // return <div {...others} ref={ref} className={cx(className, classes.root)} />
    return <>{children}</>
  }
)

ResizePanel.displayName = '@yomtor/ui/ResizePanel'
