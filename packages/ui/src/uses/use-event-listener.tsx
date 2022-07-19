import { useRef, useEffect } from 'react'

export const useShortCuts = () => {
    //
}

export const useEventListener = (
    eventName: string,
    handler: (event: Event) => void,
    element?: HTMLElement | Window
) => {
    const savedHandler = useRef<(event: Event) => void>()

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        if (!element) {
            element = window
        }

        const isSupported = element && element.addEventListener
        if (!isSupported) return

        const eventListener = (event: Event) => savedHandler.current(event)

        element.addEventListener(eventName, eventListener)

        return () => {
            element.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element])
}
