const itemToHex = (item: string): string => {
  let hex = '00'
  if (item) {
    hex = parseInt(item).toString(16).split('.')[0]
  }
  return hex.length === 1 ? '0' + hex : hex
}

export const useRgbToHex = (rgb): string => {
  const rgbArray = rgb.split(', ')
  return (
    `#` +
    itemToHex(rgbArray[0]) +
    itemToHex(rgbArray[1]) +
    itemToHex(rgbArray[2])
  )
}
