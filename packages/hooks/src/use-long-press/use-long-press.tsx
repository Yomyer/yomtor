import { useForceUpdate } from '@mantine/hooks'
import React, { useEffect, useRef, useState } from 'react'

export const useLongPress = (
  callback: (e: React.MouseEvent | React.TouchEvent) => void,
  delays = {
    short: 100,
    long: 700
  }
) => {
  const rerender = useForceUpdate()
  const [start, setStart] = useState<boolean>(false)
  const [event, setEvent] = useState<React.MouseEvent | React.TouchEvent>()
  const timer = useRef<NodeJS.Timeout>()
  const delay = useRef(0)

  const setter = (start: boolean, e: React.MouseEvent | React.TouchEvent) => {
    setStart(start)
    setEvent(e)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    if (start) {
      timer.current = setTimeout(() => {
        callback(event)
        rerender()
      }, delay.current)
      delay.current = !delay.current ? delays.long : delays.short
    } else {
      console.log('chaoo')
      clearTimeout(timer.current)
      delay.current = 0
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
