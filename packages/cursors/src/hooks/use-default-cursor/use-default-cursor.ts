import { useEffect, useRef } from 'react'
import { CursorIcon } from '../../types'
import { CURSOR_CONFIG, setClass } from '../../utils/set-class'
import { clearAllCursors } from '../../utils/clear-all-cursors'

export function useDefaultCursor(
  scope: React.MutableRefObject<HTMLElement>,
  cursor: CursorIcon
) {
  useEffect(() => {
    if (scope.current) {
      CURSOR_CONFIG.scope &&
        clearAllCursors(CURSOR_CONFIG.scope.classList, CURSOR_CONFIG.default.id)

      CURSOR_CONFIG.default = cursor
      CURSOR_CONFIG.scope = scope.current

      setClass({ cursor })
    }
  }, [scope, cursor])
}
