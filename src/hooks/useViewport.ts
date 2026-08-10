import { useEffect, useState } from 'react'

export const DESIGN_WIDTH = 1920

/** Below this the 1920 canvas is abandoned and the sections lay out in flow. */
export const FLUID_BREAKPOINT = 1024

export type Viewport = {
  width: number
  height: number
  /** Canvas → viewport ratio, only meaningful while `fluid` is false. */
  scale: number
  fluid: boolean
}

function read(): Viewport {
  // clientWidth, not innerWidth: the scrollbar must not count towards the
  // canvas width or the scaled page overflows horizontally.
  const width = document.documentElement.clientWidth
  return {
    width,
    height: window.innerHeight,
    scale: Math.min(1, width / DESIGN_WIDTH),
    fluid: width < FLUID_BREAKPOINT,
  }
}

/**
 * Two layout modes:
 *
 * - **canvas** (≥ 1024px) — the Figma file is a fixed 1920px canvas, so every
 *   section is rendered at its literal Figma measurements and scaled down.
 * - **fluid** (< 1024px) — scaling the desktop composition any further makes
 *   the type unreadable, so the sections reflow instead.
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(read)

  useEffect(() => {
    const measure = () => setViewport(read())
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  return viewport
}
