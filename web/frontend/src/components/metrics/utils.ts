export function getTicks(
  min: number,
  max: number,
  count: number,
  excludeMax: boolean
): number[] {
  const step = (max - min) / count;
  const retValue: number[] = [min];
  
  for (let i = 1; i < count; i++) {
    retValue.push(min + (i * step));
  }
  
  if (!excludeMax) {
    retValue.push(max);
  }
  
  return retValue;
}