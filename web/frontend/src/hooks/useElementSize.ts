import { useEffect, useRef, useState, type RefObject } from 'react'

export interface ElementSize {
  width: number
  height: number
}

// The element's content size, kept up to date while it is mounted.
export function useElementSize<T extends HTMLElement> (): [RefObject<T | null>, ElementSize] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
