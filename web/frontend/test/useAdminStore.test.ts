import { describe, it, expect, beforeEach } from 'vitest'
import useAdminStore from '../src/useAdminStore'

describe('useAdminStore', () => {
  beforeEach(() => {
    useAdminStore.setState({
      breadCrumbs: [],
      currentPage: '',
      runtimePid: undefined,
      currentWindowWidth: 0,
    })
  })

  it('should initialize with default state', () => {
    const state = useAdminStore.getState()
    expect(state.breadCrumbs).toEqual([])
    expect(state.currentPage).toBe('')
    expect(state.runtimePid).toBeUndefined()
    expect(state.currentWindowWidth).toBe(0)
  })

  it('should set runtime PID', () => {
    useAdminStore.getState().setRuntimePid(12345)
    expect(useAdminStore.getState().runtimePid).toBe(12345)
  })

  it('should set navigation with default level', () => {
    useAdminStore.getState().setNavigation('Home')
    expect(useAdminStore.getState().breadCrumbs).toEqual(['Home'])
  })

  it('should set navigation with specified level', () => {
    useAdminStore.getState().setNavigation('Home')
    useAdminStore.getState().setNavigation('Services')
    useAdminStore.getState().setNavigation('Details', 1)
    expect(useAdminStore.getState().breadCrumbs).toEqual(['Services', 'Details'])
  })

  it('should set current page', () => {
    useAdminStore.getState().setCurrentPage('Dashboard')
    expect(useAdminStore.getState().currentPage).toBe('Dashboard')
  })

  it('should set window width', () => {
    useAdminStore.getState().setCurrentWindowWidth(1024)
    expect(useAdminStore.getState().currentWindowWidth).toBe(1024)
  })
})
