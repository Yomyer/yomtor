import { useScrollIntoView, useMergedRef } from '@yomtor/hooks'
import React, { forwardRef, useEffect, useRef } from 'react'
import { ScrollArea, ScrollAreaProps } from '../../ScrollArea'
import { ScrollArea as ScrollAreaBase } from '@mantine/core'

export const SelectScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ style, ...others }: ScrollAreaProps, ref) => {
    const areaRef = useRef<HTMLDivElement>()
    const margin = 10

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

          let top =
            rootRect.top -
            dropdownRect.top +
            (dropdownRect.top - selectedRect.top)

          if (dropdownRect.top + top < 0) {
            top = -dropdownRect.top + margin
          }
          dropdown.style.top = `${top + 1}px`

          let left =
            rootRect.left -
            dropdownRect.left +
            (dropdownRect.left - selectedRect.left)

          if (dropdownRect.left + left < 0) {
            left = -dropdownRect.top + margin
          }

          dropdown.style.marginLeft = `${left + 1}px`

          if (areaRect.height > dropdownRect.height) {
            wrapper.style.maxHeight = `${areaRect.height}px`

            if (
              wrapper.getBoundingClientRect().bottom >
              document.body.clientHeight
            ) {
              wrapper.style.maxHeight = `${
                document.body.getBoundingClientRect().bottom -
                areaRef.current.getBoundingClientRect().top -
                margin
              }px`
            }

            scrollIntoView({ alignment: 'center' })
          }

          resizeObserver.disconnect()
        })
        resizeObserver.observe(dropdown)
      }
    }, [])

    return (
      <ScrollAreaBase
        {...others}
        style={{ width: '100%', ...style }}
        viewportProps={{ tabIndex: -1 }}
        viewportRef={ref}
        type='never'
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
      </ScrollAreaBase>
    )
  }
)

SelectScrollArea.displayName = '@yomtor/ui/SelectScrollArea'
