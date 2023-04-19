import { useScrollIntoView, useMergedRef, useLongPress } from '@yomtor/hooks'
import { ArrowIcon } from '@yomtor/icons'
import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import { ScrollArea, ScrollAreaProps } from '../../ScrollArea'
import useStyles from './SelectScrollArea.styles'

export const SelectScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ style, ...others }: ScrollAreaProps, ref) => {
    const margin = 10

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
      HTMLElement,
      HTMLDivElement
    >({
      duration: 0,
      offset: 5,
      cancelable: false,
      isList: true
    })

    const { classes, cx } = useStyles(
      { ...others },
      { name: 'SelectScrollArea' }
    )

    useEffect(() => {
      const dropdown = scrollableRef.current.closest<HTMLDivElement>(
        '.yomtor-Select-dropdown'
      )
      const root = scrollableRef.current.closest<HTMLDivElement>(
        '.yomtor-Select-root'
      )
      const ticked = !!root.querySelector('[data-ticked]')

      let selected =
        scrollableRef.current.querySelector<HTMLDivElement>('[data-selected]')
      if (!selected) {
        selected = scrollableRef.current.querySelector<HTMLDivElement>(
          '.yomtor-Select-item'
        )
      }

      targetRef.current = selected
      scrollIntoView({ alignment: 'center' })

      if (ticked) {
        const resize = () => {
          const wrapper = dropdown.querySelector('div')
          dropdown.style.top = 0 + 'px'

          const dropdownRect = dropdown.getBoundingClientRect()
          const selectedRect = selected.getBoundingClientRect()
          const rootRect = root.getBoundingClientRect()
          const areaRect = scrollableRef.current
            .querySelector('div')
            .getBoundingClientRect()

          let top =
            rootRect.top -
            dropdownRect.top +
            (dropdownRect.top - selectedRect.top) +
            (rootRect.height - selectedRect.height) / 2 -
            1

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
                scrollableRef.current.getBoundingClientRect().top -
                margin
              }px`
            }

            scrollIntoView({ alignment: 'center' })
          }

          if (dropdownRect.height < scrollableRef.current.scrollHeight) {
            console.log('mostramos los arrows xD')
          }

          resizeObserver.disconnect()
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(dropdown)

        const resizeBodyObserver = new ResizeObserver(resize)
        resizeBodyObserver.observe(document.body)
      }
    }, [])

    const { onMouseDown, onMouseUp } = useLongPress(
      () => {
        console.log('Enter')
      },
      { short: 100, long: 100 }
    )
    const arrowEvents = (direction: 'top' | 'bottom') => {
      return {
        onMouseEnter: onMouseDown,
        onMouseLeave: onMouseUp
      }
    }

    return (
      <>
        <div className={classes.arrows} {...arrowEvents('top')}>
          <ArrowIcon rotate={180} size='xs' />
        </div>
        <ScrollArea
          {...others}
          style={{ width: '100%', ...style }}
          viewportProps={{ tabIndex: -1 }}
          viewportRef={useMergedRef(ref, scrollableRef)}
          type='never'
          styles={{
            viewport: {
              '& > div': {
                display: 'flex !important'
              }
            }
          }}
        >
          {others.children}
        </ScrollArea>
        <div className={cx(classes.arrows, classes.bottom)}>
          <ArrowIcon size='xs' />
        </div>
      </>
    )
  }
)

SelectScrollArea.displayName = '@yomtor/ui/SelectScrollArea'
