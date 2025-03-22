import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

type DateFormat = string | number | Date

export const getFormattedDate = (date: DateFormat): string => {
  const dateObject = getDateObjectIfValid(date)
  if (dateObject === false) return '-'
  return dateObject.format('MMM DD, YYYY')
}

export const getFormattedLogTimestamp = (
  date: DateFormat,
  includeMilliseconds: boolean = false
): string => {
  const dateObject = getDateObjectIfValid(date)
  if (dateObject === false) return '-'
  if (includeMilliseconds) {
    return dateObject.format('HH:mm:ss.SSS')
  }
  return dateObject.format('HH:mm:ss')
}

function getDateObjectIfValid (date: unknown): dayjs.Dayjs | false {
  if (date === '-') return false
  if (!(typeof date === 'string' || typeof date === 'number' || date instanceof Date)) return false

  const dateObject = dayjs.utc(date)
  if (!dateObject.isValid()) {
    return false
  }
  return dateObject
}

export function subtractSecondsFromDate (date: DateFormat, seconds: number): string {
  return dayjs.utc(date).subtract(seconds, 'second').toISOString()
}
