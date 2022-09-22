const itemToHex = (item: number): string => {
  let hex = '00'
  if (item && !isNaN(item)) {
    hex = item.toString(16).split('.')[0]
  }
  return hex.length === 1 ? '0' + hex : hex
}

export const useRgbToHex = (rgb): string => {
  const rgbArray = rgb.split(', ')
  return (
    `#` +
    itemToHex(parseInt(rgbArray[0])) +
    itemToHex(parseInt(rgbArray[1])) +
    itemToHex(parseInt(rgbArray[2]))
  )
}
