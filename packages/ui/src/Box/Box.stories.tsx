import React from 'react'
import { Box } from './Box'

export default {
  title: 'UI/Misc/Box'
}

export function Default() {
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
