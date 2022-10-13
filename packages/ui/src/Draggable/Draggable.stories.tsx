import React from 'react'
import { Draggable } from './Draggable'
import { Droppable } from '../Droppable'
import { Box } from '../Box'

export default {
  title: 'UI/Utils/Draggable'
}

export function Default() {
  return (
    <>
      <Draggable axis='y' phantom>
        <span
          style={{
            height: 40,
            width: 150,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.3)'
          }}
        >
          Drag Me
        </span>
      </Draggable>
      <Droppable>
        {(status) => (
          <div
            style={{
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              background: status.overed
                ? 'rgba(0, 255, 0, 0.4)'
                : status.rejected
                ? 'rgba(255, 0, 0, 0.4)'
                : 'rgba(0, 0, 0, 0.9)'
            }}
          >
            Drop Me
          </div>
        )}
      </Droppable>
    </>
  )
}
