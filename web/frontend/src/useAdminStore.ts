import { create } from 'zustand';

interface AdminState {
  breadCrumbs: string[];
  currentPage: string;
  runtimePid: number | undefined;
  currentWindowWidth: number;
  setRuntimePid: (runtimePid: number) => void;
  setNavigation: (item: string, level?: number) => void;
  setCurrentPage: (page: string) => void;
  setCurrentWindowWidth: (width: number) => void;
}

const initialState = {
  breadCrumbs: [],
  currentPage: '',
  runtimePid: undefined,
  applicationSelected: null,
  currentWindowWidth: 0
};

const useAdminStore = create<AdminState>((set) => ({
  ...initialState,
  setRuntimePid: (runtimePid: number): void => {
    set(state => {
      return {
        ...state,
        runtimePid
      };
    });
  },
  setNavigation: (item: string, level: number = 0): void => {
    set((state) => {
      const currentBreadcrumbs = state.breadCrumbs.slice(0, level);
      currentBreadcrumbs.push(item);
      return {
        ...state,
        breadCrumbs: currentBreadcrumbs
      };
    });
  },
  setCurrentPage: (page: string): void => {
    set((state) => {
      return {
        ...state,
        currentPage: page
      };
    });
  },
  setCurrentWindowWidth: (width: number): void => {
    set((state) => {
      return {
        ...state,
        currentWindowWidth: width
      };
    });
  }
}));

export default useAdminStore;