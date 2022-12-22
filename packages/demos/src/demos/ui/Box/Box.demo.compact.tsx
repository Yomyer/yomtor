import { Box } from '@yomtor/ui'
import React from 'react'
import { YomtorDemo } from '@yomtor/ds'

const code = `
import { Button } from '@yomtor/ui';

function Demo() {
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1]
        }
      })}
    >
      Box lets you add inline styles to any element or component with sx
    </Box>
}
`

function Demo() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1]
        }
      })}
    >
      Box lets you add inline styles to any element or component with sx
    </Box>
  )
}

export const compact: YomtorDemo = {
  type: 'demo',
  code,
  component: Demo
}
