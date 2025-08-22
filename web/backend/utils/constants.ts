export const MS_WAITING = 1000

// This is to avoid the mapped metrics array from growing indefinitely (and therefore a memory leak): store the last 10 minutes of metrics (1# * 10m * 60s).
export const MAX_STORED_METRICS = 600
