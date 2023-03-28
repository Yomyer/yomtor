import { useScrollIntoView, useMergedRef } from '@yomtor/hooks'
import React, { forwardRef, useEffect, useRef } from 'react'
import { ScrollArea, ScrollAreaProps } from '../../ScrollArea'

export const SelectScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ style, ...others }: ScrollAreaProps, ref) => {
    const area = useRef<HTMLDivElement>()

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
      duration: 0,
      offset: 5,
      cancelable: false,
      isList: true
    })

    useEffect(() => {
      const dropdown = area.current.closest<HTMLDivElement>(
        '.yomtor-Select-dropdown'
      )
      const root = area.current.closest<HTMLDivElement>('.yomtor-Select-root')
      const ticked = !!root.querySelector('[data-ticked]')

      let selected =
        area.current.querySelector<HTMLDivElement>('[data-selected]')
      if (!selected) {
        selected = area.current.querySelector<HTMLDivElement>(
          '.yomtor-Select-item'
        )
      }

      targetRef.current = selected
      scrollIntoView({ alignment: 'center' })

      if (ticked) {
        const dropdownRect = dropdown.getBoundingClientRect()
        const selectedRect = selected.getBoundingClientRect()
        const rootRect = root.getBoundingClientRect()

        const diff =
          rootRect.top -
          dropdownRect.top +
          (dropdownRect.top - selectedRect.top)
        dropdown.style.marginTop = diff + 'px'
      }
    }, [])

    return (
      <ScrollArea
        {...others}
        style={{ width: '100%', ...style }}
        viewportProps={{ tabIndex: -1 }}
        viewportRef={ref}
        ref={useMergedRef(area, scrollableRef)}
      >
        {others.children}
      </ScrollArea>
    )
  }
)

SelectScrollArea.displayName = '@yomtor/ui/SelectScrollArea'
