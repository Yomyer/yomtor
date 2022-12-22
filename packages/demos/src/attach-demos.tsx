import React from 'react'
import { Container } from '@mantine/core'
import { Demo, YomtorDemo } from '@yomtor/ds'

export function attachDemos(stories: any, demos: Record<string, YomtorDemo>) {
  Object.keys(demos).forEach((key) => {
    stories.add(`Demo: ${key}`, () => (
      <Container sx={{ paddingTop: 40, paddingBottom: 40 }} size={820}>
        <Demo data={demos[key]} />
      </Container>
    ))
  })
}
