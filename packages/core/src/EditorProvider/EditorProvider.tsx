import React, { forwardRef, useEffect, useState } from 'react'
import { EditorProviderProps } from './EditorProvider.props'
import { useComponentDefaultProps } from '@yomtor/styles'
import { PaperScope } from '@yomtor/paper'
import { EditorContext } from '../Editor.context'

const defaultProps: Partial<EditorProviderProps> = {}

export const EditorProvider = forwardRef<HTMLDivElement, EditorProviderProps>(
  (props, ref) => {
    const { children, ...others } = useComponentDefaultProps(
      'Yomtor',
      defaultProps,
      props
    )

    const [canvas, setCanvas] = useState<PaperScope | null>(null)
    const initCanvas = (c: PaperScope): void => {
      setCanvas(c)
    }

    useEffect(() => {
      return () => {
        console.log('bdasdaad')
        setCanvas(null)
      }
    }, [])

    return (
      <EditorContext.Provider
        value={{
          canvas,
          initCanvas
          // settings
        }}
      >
        {children}
      </EditorContext.Provider>
    )
  }
)

EditorProvider.displayName = '@yomtor/core/EditorProvider'
