import React, { useEffect, useRef, useState } from 'react'

export const useLongPress = (
  callback: (e: React.MouseEvent | React.TouchEvent) => void,
  delays = {
    short: 100,
    long: 700
  }
) => {
  const [start, setStart] = useState<boolean>(false)
  const [event, setEvent] = useState<React.MouseEvent | React.TouchEvent>()
  const delay = useRef(0)

  const setter = (start: boolean, e: React.MouseEvent | React.TouchEvent) => {
    setStart(start)
    setEvent(e)
  }

  useEffect(() => {
    let timer

    if (start) {
      timer = setTimeout(() => {
        callback(event)
      }, delay.current)
      delay.current = !delay.current ? delays.long : delays.short
    } else {
      clearTimeout(timer)
      delay.current = 0
    }

    return () => {
      clearTimeout(timer)
    }
  }, [callback, event, start])

  return {
    onMouseDown: (event: React.MouseEvent) => setter(true, event),
    onTouchStart: (event: React.TouchEvent) => setter(true, event),
    onMouseUp: (event: React.MouseEvent) => setter(false, event),
    onMouseLeave: (event: React.MouseEvent) => setter(false, event),
    onTouchEnd: (event: React.TouchEvent) => setter(false, event)
  }
}
