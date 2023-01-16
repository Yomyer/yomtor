import { useEffect, useRef } from 'react'

export const useChildMutation = (
  callback: (mutations: MutationRecord[]) => void
) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    console.log(ref.current)
    const observer = new MutationObserver((mutations) => {
      callback(mutations)
    })
    observer.observe(ref.current, { childList: true })

    return () => observer.disconnect()
  }, [callback, ref])

  return ref
}
