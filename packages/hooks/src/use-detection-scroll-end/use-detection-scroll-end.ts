import { useState, useEffect, useRef } from 'react'

export const useDetectionScrollEnd = (element: Element) => {
  const [scrollEnd, setScrollEnd] = useState(true)
  const timeOut = useRef(null)

  useEffect(() => {
    if (!element) return

    const event = () => {
      clearTimeout(timeOut.current)
      setScrollEnd(false)
      timeOut.current = setTimeout(() => {
        setScrollEnd(true)
      }, 50)
    }
    element.addEventListener('scroll', event)
    return () => element.removeEventListener('scroll', event)
  }, [element, timeOut])

  return scrollEnd
}
