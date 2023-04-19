import * as React from 'react'
import {
  elementScroll,
  observeElementOffset,
  observeElementRect,
  observeWindowOffset,
  observeWindowRect,
  PartialKeys,
  Virtualizer,
  VirtualizerOptions,
  windowScroll,
  VirtualItem
} from '@tanstack/virtual-core'
import { flushSync } from 'react-dom'
import { useForceUpdate } from '@mantine/hooks'
export * from '@tanstack/virtual-core'

export interface UseVirtualizer<
  TScrollElement extends Element | Window,
  TItemElement extends Element
> extends Virtualizer<TScrollElement, TItemElement> {
  getItem: (index) => VirtualItem
  getForcedVirtualItems: (forced: number[]) => VirtualItem[]
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

function useVirtualizerBase<
  TScrollElement extends Element | Window,
  TItemElement extends Element
>(
  options: VirtualizerOptions<TScrollElement, TItemElement>
): UseVirtualizer<TScrollElement, TItemElement> {
  const rerender = useForceUpdate

  const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = {
    ...options,
    onChange: (instance) => {
      if ((instance.options.getScrollElement() as Element).scrollTop) {
        flushSync(() => {
          rerender()
        })
      } else {
        rerender()
      }
    }
  }

  const [instance] = React.useState<
    UseVirtualizer<TScrollElement, TItemElement>
  >(
    () =>
      new Virtualizer<TScrollElement, TItemElement>(
        resolvedOptions
      ) as UseVirtualizer<TScrollElement, TItemElement>
  )

  instance.setOptions(resolvedOptions)

  React.useEffect(() => {
    return instance._didMount()
  }, [])

  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate()
  })

  return Object.assign(instance, {
    getItem: (index: number) => {
      return (instance as any).measurementsCache[index]
    },
    getForcedVirtualItems: (forced: number[]) => {
      const items = instance.getVirtualItems()
      const forcedItems = forced
        .filter((index) => !items.find((item) => item.index === index))
        .map((index) => instance.getItem(index))

      return [...items, ...forcedItems]
    }
  })
}

export function useVirtualizer<
  TScrollElement extends Element,
  TItemElement extends Element
>(
  options: PartialKeys<
    VirtualizerOptions<TScrollElement, TItemElement>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
  > & { enableSmoothScroll?: boolean }
): UseVirtualizer<TScrollElement, TItemElement> {
  return useVirtualizerBase<TScrollElement, TItemElement>({
    observeElementRect: observeElementRect,
    observeElementOffset: observeElementOffset,
    scrollToFn: elementScroll,
    ...options
  })
}

export function useWindowVirtualizer<TItemElement extends Element>(
  options: PartialKeys<
    VirtualizerOptions<Window, TItemElement>,
    | 'getScrollElement'
    | 'observeElementRect'
    | 'observeElementOffset'
    | 'scrollToFn'
  >
): UseVirtualizer<Window, TItemElement> {
  return useVirtualizerBase<Window, TItemElement>({
    getScrollElement: () => (typeof window !== 'undefined' ? window : null!),
    observeElementRect: observeWindowRect,
    observeElementOffset: observeWindowOffset,
    scrollToFn: windowScroll,
    ...options
  })
}
