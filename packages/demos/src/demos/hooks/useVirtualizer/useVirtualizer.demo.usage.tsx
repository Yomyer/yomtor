import React, { useRef, useCallback } from 'react'
import { useVirtualizer } from '@yomtor/hooks'
import { YomtorDemo } from '@yomtor/ds'
import { ScrollArea, Box } from '@yomtor/ui'

const code = `
import React, { useRef, useCallback } from 'react'
import { useVirtualizer } from '@yomtor/hooks';
import { ScrollArea, Box } from '@yomtor/ui'

function Demo() {
  return (
    <ScrollArea
      ref={scrollRef}
      type={'always'}
      style={{
        height: '200px',
        width: '400px',
        overflow: 'auto'
      }}
    >
      <Box
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          width: '100%',
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((row) => (
          <div
            key={row.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: \`\${row.size}px\`,
              transform: \`translateY(\${row.start}px)\`
            }}
          >
            Row {row.index}
          </div>
        ))}
      </Box>
    </ScrollArea>
  );
}
`

function Demo() {
  const scrollRef = useRef()

  const virtualizer = useVirtualizer({
    count: 10000,
    estimateSize: useCallback(() => 30, []),
    getScrollElement: () => scrollRef.current
  })

  return (
    <ScrollArea
      ref={scrollRef}
      type={'always'}
      style={{
        height: `200px`,
        width: `400px`,
        overflow: 'auto'
      }}
    >
      <Box
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((row) => (
          <div
            key={row.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${row.size}px`,
              transform: `translateY(${row.start}px)`
            }}
          >
            Row {row.index}
          </div>
        ))}
      </Box>
    </ScrollArea>
  )
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
