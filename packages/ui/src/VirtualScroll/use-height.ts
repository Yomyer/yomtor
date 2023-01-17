import React, { useState, useEffect } from 'react'

interface UseHeightProps {
  height: number
  overscan?: boolean
  element: HTMLElement
}

export const useHeight = ({
  height: value,
  overscan = true,
  element
}: UseHeightProps) => {
  if (!overscan) return value

  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (
      height &&
      height > value &&
      element?.scrollTop + element?.clientHeight >= value
    ) {
      return
    }

    setHeight(value)
  }, [value])

  useEffect(() => {
    const event = () => {
      if (
        height > value &&
        height > element?.scrollTop + element?.clientHeight
      ) {
        setHeight(element?.scrollTop + element?.clientHeight)
      }
    }
    element?.addEventListener('scroll', event)

    return () => element?.removeEventListener('scroll', event)
  }, [element, value, height])

  return height
}
