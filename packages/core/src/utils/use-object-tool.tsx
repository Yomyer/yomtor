import { Cursor } from '@yomtor/cursors'
import { Item, PaperScope, Tool, ToolEvent } from '@yomtor/paper'
import { YomtorTheme } from '@yomtor/styles'
import React, { forwardRef } from 'react'
import { ObjectTool, ObjectToolProps } from '../components/ObjectTool'
import { createPolymorphicComponent } from '@yomtor/utils'

type Props = {
  hotKey?: string
  cursor?: Cursor
  onInserMode?: (status: boolean) => void
  children?: JSX.Element
}

export const useObjectTool = ({
  onPhantom,
  onObject,
  name,
  hotKey,
  cursor
}: ObjectToolProps) => {
  const Component = forwardRef<HTMLDivElement, Props>(
    ({ children, ...props }, ref) => {
      if (!props.hotKey) {
        props.hotKey = hotKey
        props.cursor = cursor
      }

      return (
        <ObjectTool
          onPhantom={onPhantom}
          onObject={onObject}
          {...props}
          ref={ref}
        >
          {children}
        </ObjectTool>
      )
    }
  )

  Component.displayName = `@yomtor/core/${name}Tool`

  return React.memo(createPolymorphicComponent<'div', Props>(Component))
}
