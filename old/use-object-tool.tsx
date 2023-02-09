import { Cursor } from '@yomtor/cursors'
import React, { forwardRef } from 'react'
import {
  ObjectPathTool,
  ObjectPathToolProps
} from '../packages/core/src/components/ObjectPathTool'
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
  cursor,
  object,
  attrs
}: ObjectPathToolProps) => {
  const Component = forwardRef<HTMLDivElement, Props>(
    ({ children, ...props }, ref) => {
      if (!props.hotKey) {
        props.hotKey = hotKey
        props.cursor = cursor
      }

      return (
        <ObjectPathTool
          onPhantom={onPhantom}
          onObject={onObject}
          object={object}
          attrs={attrs}
          {...props}
          ref={ref}
        >
          {children}
        </ObjectPathTool>
      )
    }
  )

  Component.displayName = `@yomtor/core/${name}Tool`

  return React.memo(createPolymorphicComponent<'div', Props>(Component))
}
