import { useEffect, useRef, type RefObject } from 'react'

type Options = {
  /** Called with -1 (towards the previous slide) or +1 (towards the next). */
  onStep: (direction: number) => void
  /** Travel in pixels before a drag counts as a step. */
  threshold?: number
}

/**
 * Mouse drag and touch swipe on a carousel, in one place.
 *
 * Pointer events cover both, so a mouse drag and a finger swipe behave the
 * same: press, move, and on release the carousel steps to the neighbouring
 * slide if the travel passed the threshold — the existing transition does the
 * snapping. A drag never fires the click on the slide underneath it.
 */
export function useDragSwipe(ref: RefObject<HTMLElement | null>, { onStep, threshold = 60 }: Options) {
  const stepRef = useRef(onStep)
  stepRef.current = onStep

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let startX = 0
    let dragging = false
    let moved = false

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragging = true
      moved = false
      startX = event.clientX
      node.classList.add('is-grabbing')
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      if (Math.abs(event.clientX - startX) > 8) moved = true
    }

    const finish = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      node.classList.remove('is-grabbing')

      const travel = event.clientX - startX
      if (Math.abs(travel) < threshold) return

      // RTL: dragging the content to the right reveals the previous slide.
      stepRef.current(travel > 0 ? -1 : 1)
    }

    // A drag that moved must not also count as a click on the slide.
    const onClickCapture = (event: MouseEvent) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }

    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointermove', onPointerMove)
    node.addEventListener('pointerup', finish)
    node.addEventListener('pointercancel', finish)
    node.addEventListener('pointerleave', finish)
    node.addEventListener('click', onClickCapture, true)

    return () => {
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerup', finish)
      node.removeEventListener('pointercancel', finish)
      node.removeEventListener('pointerleave', finish)
      node.removeEventListener('click', onClickCapture, true)
    }
  }, [ref, threshold])
}
