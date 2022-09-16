import { useCallback, useEffect, useRef, useState } from 'react'

export const useLongPress = (
    callback: (e: React.MouseEvent | React.TouchEvent) => void,
    deps: React.DependencyList = []
) => {
    const [mouseEvent, setMouseEvent] = useState<
        React.MouseEvent | React.TouchEvent | null
    >(null)
    const [keyEvent, setKeyEvent] = useState<KeyboardEvent | null>(null)
    let clicksCount = 0
    const memoizedCallback = useCallback(() => {
        callback(mouseEvent)
    }, [deps, clicksCount])

    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (
                ['Shift', 'Control', 'Meta', 'Alt'].includes(e.key) &&
                mouseEvent
            ) {
                setKeyEvent(e)
            }
        }
        const keyUp = (e: KeyboardEvent) => {
            if (
                ['Shift', 'Control', 'Meta', 'Alt'].includes(e.key) &&
                mouseEvent
            ) {
                setKeyEvent(e)
            } else {
                setKeyEvent(null)
            }
        }

        document.addEventListener('keydown', keyDown)
        document.addEventListener('keyup', keyUp)

        return () => {
            document.removeEventListener('keydown', keyDown)
            document.removeEventListener('keyup', keyUp)
        }
    }, [mouseEvent])

    useEffect(() => {
        let interval: NodeJS.Timeout
        let timeout: NodeJS.Timeout

        if (mouseEvent) {
            if (keyEvent) {
                mouseEvent.altKey = keyEvent.altKey
                mouseEvent.metaKey = keyEvent.metaKey
                mouseEvent.shiftKey = keyEvent.shiftKey
                mouseEvent.ctrlKey = keyEvent.ctrlKey
            }
            memoizedCallback()
            timeout = setTimeout(
                () => {
                    interval = setInterval(() => {
                        console.log('aqui')
                        memoizedCallback()
                        clicksCount++
                    }, 100)
                },
                keyEvent ? 0 : 700
            )
        } else {
            clearInterval(interval)
            clearTimeout(timeout)
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [keyEvent, mouseEvent])

    return {
        onMouseDown: (e: React.MouseEvent) => setMouseEvent(e),
        onMouseUp: () => setMouseEvent(null),
        onMouseLeave: () => setMouseEvent(null),
        onTouchStart: (e: React.TouchEvent) => setMouseEvent(e),
        onTouchEnd: () => setMouseEvent(null)
    }
}
