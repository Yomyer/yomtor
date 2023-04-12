export const clearAll = (classList: DOMTokenList, find: string) => {
  classList.forEach((c: string) => {
    try {
      if (c.startsWith(find)) {
        classList.remove(c)
      }
    } catch (error) {}
  })
}
