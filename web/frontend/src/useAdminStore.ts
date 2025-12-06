import { create } from 'zustand'
import { getOfflineMode } from './utilities/getters'
import type { RecordMode } from './api'

interface NavigationType {
  label: string;
  key: string;
  page: string;
  handleClick?: () => void;
}

export type Mode = 'live' | 'load'

interface ValuesAdminState {
  breadCrumbs: NavigationType[];
  currentPage: string;
  runtimePid: number | undefined;
  currentWindowWidth: number;
  mode: Mode;
  record: RecordMode;
}

interface MethodsAdminState {
  setRuntimePid: (runtimePid: number) => void;
  setNavigation: (navigation: NavigationType) => void;
  setCurrentPage: (page: string) => void;
  setCurrentWindowWidth: (width: number) => void;
  setMode: (mode: Mode) => void;
  setRecord: (record: RecordMode) => void;
}

const initialState: ValuesAdminState = {
  breadCrumbs: [],
  currentPage: '',
  runtimePid: undefined,
  currentWindowWidth: 0,
  mode: getOfflineMode() ? 'load' : 'live',
  record: 'start'
}

const useAdminStore = create<ValuesAdminState & MethodsAdminState>((set) => ({
  ...initialState,
  setRuntimePid: (runtimePid: number): void => set(state => ({ ...state, runtimePid })),
  setNavigation: (item) => set((state) => ({ ...state, breadCrumbs: [item] })),
  setCurrentPage: (page: string): void => set((state) => ({ ...state, currentPage: page })),
  setCurrentWindowWidth: (width: number): void => set((state) => ({ ...state, currentWindowWidth: width })),
  setMode: (mode: Mode): void => set((state) => ({ ...state, mode })),
  setRecord: (record: RecordMode): void => set((state) => ({ ...state, record }))
}))

export default useAdminStore
