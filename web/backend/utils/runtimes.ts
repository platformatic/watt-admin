import type { Runtime } from '@platformatic/control'
import type { SelectableRuntime } from '../schemas/index.ts'

export const getSelectableRuntimes = (runtimes: Runtime[], includeAdmin: boolean): SelectableRuntime[] => {
  const selectableRuntimes: SelectableRuntime[] = []
  for (const runtime of runtimes) {
    if (!includeAdmin && runtime.packageName === '@platformatic/watt-admin' && !process.env.INCLUDE_ADMIN) {
      continue
    }

    let selected = true
    if (process.env.SELECTED_RUNTIME) {
      selected = process.env.SELECTED_RUNTIME === runtime.pid.toString()
    }

    const url = Object.values(runtime.urls ?? {})[0] ?? ''
    selectableRuntimes.push({ ...runtime, packageName: runtime.packageName || '', packageVersion: runtime.packageVersion || '', url, selected })
  }
  return selectableRuntimes
}

export const getPidToLoad = (runtimes: SelectableRuntime[]): number => runtimes.find(({ selected }) => selected === true)?.pid || 0
