import { create } from 'zustand'

interface NavigationType {
  label: string;
  key: string;
  page: string;
  handleClick?: () => void;
}

interface AdminState {
  breadCrumbs: NavigationType[];
  currentPage: string;
  runtimePid: number | undefined;
  currentWindowWidth: number;
  setRuntimePid: (runtimePid: number) => void;
  setNavigation: (navigation: NavigationType) => void;
  setCurrentPage: (page: string) => void;
  setCurrentWindowWidth: (width: number) => void;
}

const initialState = {
  breadCrumbs: [],
  currentPage: '',
  runtimePid: undefined,
  applicationSelected: null,
  currentWindowWidth: 0
}

const useAdminStore = create<AdminState>((set) => ({
  ...initialState,
  setRuntimePid: (runtimePid: number): void => {
    set(state => {
      return {
        ...state,
        runtimePid
      }
    })
  },
  setNavigation: (item) => {
    set((state) => {
      const currentBreadcrumbs = state.breadCrumbs.slice(0, 0)
      currentBreadcrumbs.push(item)
      return {
        ...state,
        breadCrumbs: currentBreadcrumbs
      }
    })
  },
  setCurrentPage: (page: string): void => {
    set((state) => {
      return {
        ...state,
        currentPage: page
      }
    })
  },
  setCurrentWindowWidth: (width: number): void => {
    set((state) => {
      return {
        ...state,
        currentWindowWidth: width
      }
    })
  }
}))

export default useAdminStore
