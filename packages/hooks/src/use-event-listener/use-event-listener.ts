import { isObject } from 'lodash'
import { useRef, useEffect } from 'react'
import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect/use-isomorphic-layout-effect'

export const useEventListener = <
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement | Document = any
>(
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => any,
  options: (AddEventListenerOptions & { element: T }) | undefined | boolean | T
) => {
  const ref = useRef<T>()
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    let ele: T = ref.current
    let opt: AddEventListenerOptions

    if (
      isObject(options) &&
      !(options instanceof HTMLElement) &&
      !(options instanceof Document)
    ) {
      const { element, ...others } = options
      opt = others as AddEventListenerOptions
      ele = element
    } else if (options instanceof HTMLElement || options instanceof Document) {
      ele = options as T
    }

    if (ele) {
      const listener: typeof handler = (event) => savedHandler.current(event)
      ele.addEventListener(type, listener, opt)
      return () => ele?.removeEventListener(type, listener, opt)
    }

    return undefined
  }, [options])

  return ref
}
