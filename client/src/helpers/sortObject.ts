export default function sortObject<T>(
  obj: T[],
  attr: keyof T,
  asc = true
): T[] {
  return obj.sort((a, b) => {
    if (a[attr] < b[attr]) {
      return asc ? -1 : 1
    }
    if (a[attr] > b[attr]) {
      return asc ? 1 : -1
    }
    return 0
  })
}
