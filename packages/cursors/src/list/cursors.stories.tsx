import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useCursor } from '../hooks/use-cursor/use-cursor'
import { useMergedRef } from '@yomtor/hooks'
import { CursorIcon } from '../types'
import { createSVGCursor } from '../utils/create-svg-cursor'
import Buti from './Buti'
import Clone from './Clone'
import Comment from './Comment'
import Cross from './Cross'
import Default from './Default'
import Feather from './Feather'
import Grab from './Grab'
import Grabbing from './Grabbing'
import Maximize from './Maximize'
import Minimize from './Minimize'
import Pene from './Pene'
import Picker from './Picker'
import Rectangle from './Rectangle'
import Remove from './Remove'
import ResizePanel from './ResizePanel'
import Resize from './Resize'
import Rotate from './Rotate'

const cursors = {
  Buti,
  Clone,
  Comment,
  Cross,
  Default,
  Feather,
  Grab,
  Grabbing,
  Maximize,
  Minimize,
  Pene,
  Picker,
  Rectangle,
  Remove,
  ResizePanel,
  Resize,
  Rotate
}

type Props = {
  cursor?: CursorIcon
  action?: CursorIcon
  rotate?: number
}

const Canvas: React.FC<Props> = ({ cursor, rotate, action }) => {
  const cursorRef = useRef<HTMLDivElement>()
  const actionRef = useRef<HTMLDivElement>()

  const { showCursor, hideCursor, ref } = useCursor<HTMLDivElement>()
  const {
    showCursor: showActionCursor,
    hideCursor: hideActionCursor,
    ref: actionCursorRef
  } = useCursor<HTMLDivElement>()

  useEffect(() => {
    cursorRef.current.appendChild(
      createSVGCursor({
        cursor,
        rotation: rotate
      })
    )
    actionRef.current.appendChild(
      createSVGCursor({
        cursor: Default,
        action: cursor,
        rotation: rotate
      })
    )
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: 'rgba(0,0,0,0.1)',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
      onMouseEnter={() => showCursor(cursor, rotate)}
      onMouseLeave={() => hideCursor(cursor, rotate)}
    >
      <div style={{ flex: '1 1 100%', textAlign: 'center' }}>{cursor.id}</div>
      <div
        ref={cursorRef}
        style={{
          border: `1px solid rgba(255,255,255, 0.1)`,
          display: 'flex'
        }}
      />
      <div
        ref={useMergedRef(actionRef, actionCursorRef)}
        onMouseEnter={() => showActionCursor([Default, cursor], rotate)}
        onMouseLeave={() => hideActionCursor([Default, cursor], rotate)}
        style={{
          border: `1px solid rgba(255,255,255, 0.1)`,
          display: 'flex'
        }}
      />
    </div>
  )
}

export default {
  title: 'Utils/Cursors',
  component: Canvas,
  argTypes: {
    action: {
      control: {
        type: 'select'
      },
      options: ['NoCursor', ...Object.keys(cursors)],
      mapping: { NoCursor: null, ...cursors }
    }
  }
} as ComponentMeta<typeof Canvas>

const Template: ComponentStory<typeof Canvas> = ({
  rotate,
  action,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gap: 10,
        gridTemplateColumns: 'repeat(6, 1fr)'
      }}
    >
      {Object.keys(cursors).map((key) => (
        <Canvas
          key={key}
          cursor={cursors[key]}
          rotate={rotate}
          action={action}
        />
      ))}
    </div>
  )
}

export const Playground = Template.bind({})

Playground.args = {
  rotate: 0
}
