import { createContext, useContext } from 'react'
import { PaperScope } from '@yomtor/paper'
import { YomtorTheme } from '@yomtor/styles'

type EditorContextProps = {
  canvas: PaperScope | null
  initCanvas: (c: PaperScope) => void
  // settings: Settings
  // theme: Partial<YomtorTheme>
}

export const EditorContext = createContext<EditorContextProps>({
  canvas: null,
  initCanvas: () => {}
  // settings: {},
  // theme: {}
})

export function useEditorContext() {
  return useContext(EditorContext)
}
