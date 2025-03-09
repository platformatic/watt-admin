export function getTicks (min, max, count, excludeMax) {
  const step = (max - min) / count
  const retValue = [min]
  for (let i = 1; i < count; i++) {
    retValue.push(min + (i * step))
  }
  if (!excludeMax) {
    retValue.push(max)
  }
  return retValue
}
