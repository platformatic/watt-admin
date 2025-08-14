import type { Runtime } from '@platformatic/control'
import type { SelectableRuntime } from '../schemas'

export const getSelectableRuntimes = (runtimes: Runtime[], includeAdmin: boolean): SelectableRuntime[] => {
  const selectableRuntimes: SelectableRuntime[] = []
  for (const runtime of runtimes) {
    // FIXME: this needs to be updated to `@platformatic/watt-admin`, but it'll take some changes since tests now relies on this check not being executed
    if (!includeAdmin && runtime.packageName === 'watt-admin') {
      continue
    }

    let selected = true
    if (process.env.SELECTED_RUNTIME) {
      selected = process.env.SELECTED_RUNTIME === runtime.pid.toString()
    }

    selectableRuntimes.push({ ...runtime, packageName: runtime.packageName || '', packageVersion: runtime.packageVersion || '', url: runtime.url || '', selected })
  }
  return selectableRuntimes
}

export const getPidToLoad = (runtimes: SelectableRuntime[]): number => runtimes.find(({ selected }) => selected === true)?.pid || 0
