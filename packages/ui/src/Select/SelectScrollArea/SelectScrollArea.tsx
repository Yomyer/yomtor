import { useScrollIntoView, useMergedRef } from '@yomtor/hooks'
import React, { forwardRef, useEffect, useRef } from 'react'
import { ScrollArea, ScrollAreaProps } from '../../ScrollArea'

export const SelectScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ style, ...others }: ScrollAreaProps, ref) => {
    const areaRef = useRef<HTMLDivElement>()
    const scrollRef = useRef<HTMLDivElement>()

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
      duration: 0,
      offset: 5,
      cancelable: false,
      isList: true
    })

    useEffect(() => {
      const dropdown = areaRef.current.closest<HTMLDivElement>(
        '.yomtor-Select-dropdown'
      )
      const root = areaRef.current.closest<HTMLDivElement>(
        '.yomtor-Select-root'
      )
      const ticked = !!root.querySelector('[data-ticked]')

      let selected =
        areaRef.current.querySelector<HTMLDivElement>('[data-selected]')
      if (!selected) {
        selected = areaRef.current.querySelector<HTMLDivElement>(
          '.yomtor-Select-item'
        )
      }

      targetRef.current = selected
      scrollIntoView({ alignment: 'center' })

      if (ticked) {
        const resizeObserver = new ResizeObserver(() => {
          const wrapper = dropdown.querySelector('div')
          dropdown.style.top = 0 + 'px'

          const dropdownRect = dropdown.getBoundingClientRect()
          const selectedRect = selected.getBoundingClientRect()
          const rootRect = root.getBoundingClientRect()

          const areaRect = areaRef.current
            .querySelector('div')
            .getBoundingClientRect()

          let diff =
            rootRect.top -
            dropdownRect.top +
            (dropdownRect.top - selectedRect.top)

          if (dropdownRect.top + diff < 0) {
            diff = diff + dropdownRect.top
          }
          if (areaRect.height > dropdownRect.height) {
            wrapper.style.maxHeight = areaRect.height + 'px'
            if (
              wrapper.getBoundingClientRect().bottom >
              document.body.clientHeight
            ) {
              wrapper.style.maxHeight =
                document.body.getBoundingClientRect().bottom + 'px'

              console.log('andevas')
            }

            scrollIntoView({ alignment: 'center' })
          }

          dropdown.style.top = diff + 'px'
          resizeObserver.disconnect()
        })
        resizeObserver.observe(dropdown)
      }
    }, [])

    return (
      <ScrollArea
        {...others}
        style={{ width: '100%', ...style }}
        viewportProps={{ tabIndex: -1 }}
        viewportRef={ref}
        styles={{
          viewport: {
            '& > div': {
              display: 'flex !important'
            }
          }
        }}
        ref={useMergedRef(areaRef, scrollableRef)}
      >
        {others.children}
      </ScrollArea>
    )
  }
)

SelectScrollArea.displayName = '@yomtor/ui/SelectScrollArea'
