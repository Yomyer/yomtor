export const createNode = (tag: string, values?: { [key: string]: string }) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  for (const key in values) node.setAttributeNS(null, key, values[key])
  return node
}
