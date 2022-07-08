import { useState, useEffect, useRef } from 'react'

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void

function attachMediaListener(
    query: MediaQueryList,
    callback: MediaQueryCallback
) {
    try {
        query.addEventListener('change', callback)
        return () => query.removeEventListener('change', callback)
    } catch (e) {
        query.addListener(callback)
        return () => query.removeListener(callback)
    }
}

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)
    const queryRef = useRef<MediaQueryList>()

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if ('matchMedia' in window) {
            queryRef.current = window.matchMedia(query)
            setMatches(queryRef.current.matches)
            return attachMediaListener(queryRef.current, (event) =>
                setMatches(event.matches)
            )
        }
    }, [query])

    return matches
}
