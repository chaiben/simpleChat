export const rgb2hex = (rgb: string): string => {
  const values = rgb.match(/\d+/g)
  if (values !== null)
    return (
      '#' +
      values
        .map((value) => {
          const hex = Number(value).toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    )
  else return ''
}
