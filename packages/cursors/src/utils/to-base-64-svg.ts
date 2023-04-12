export const toBase64SVG = (svg: SVGElement) => {
  return `data:image/svg+xml;base64,${window.btoa(
    new XMLSerializer().serializeToString(svg)
  )}`
}
