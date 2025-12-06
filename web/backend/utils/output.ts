import { access } from 'fs/promises'
import { dirname, basename, join } from 'path'

export function generateDefaultFilename (): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '-')
  return `watt-admin-${date}-${time}.html`
}

export async function getUniqueFilePath (filePath: string): Promise<string> {
  const dir = dirname(filePath)
  const originalBase = basename(filePath, '.html')
  let candidate = filePath
  let counter = 1

  while (true) {
    try {
      await access(candidate)
      // File exists, generate a new name using original base
      candidate = join(dir, `${originalBase}-${counter}.html`)
      counter++
    } catch {
      // File doesn't exist, we can use this path
      return candidate
    }
  }
}
