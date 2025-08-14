import { stat } from 'fs/promises'

export const fileExists = async (filePath: string) => {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}
