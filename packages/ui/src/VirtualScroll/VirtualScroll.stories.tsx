import React from 'react'
import { VirtualScroll } from './VirtualScroll'

export default {
  title: 'UI/Utils/VirtualScroll'
}

export function Default() {
  return <VirtualScroll count={1000} style={{ height: 300 }} />
}
