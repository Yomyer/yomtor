import { isObject } from 'lodash'
import { useRef, useEffect } from 'react'

export const useEventListener = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = any
>(
  type: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  options: (AddEventListenerOptions & { element: T }) | undefined | boolean | T
) => {
  const ref = useRef<T>()

  useEffect(() => {
    let ele = ref.current
    let opt: AddEventListenerOptions

    if (isObject(options) && !(options instanceof HTMLElement)) {
      const { element, ...others } = options
      opt = others
      ele = element
    } else if (options instanceof HTMLElement) {
      ele = options
    }

    if (ele) {
      ele.addEventListener(type, listener, opt)
      return () => ele?.removeEventListener(type, listener, opt)
    }

    return undefined
  }, [listener, options])

  return ref
}
