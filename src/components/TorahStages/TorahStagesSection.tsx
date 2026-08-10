import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { stages } from '../../data/stages'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import { StageCopy } from './StageCopy'
import { StageProgress } from './StageProgress'
import { StageRail } from './StageRail'
import { StageVisual } from './StageVisual'
import './TorahStagesSection.css'

/**
 * Height of the section on the Figma canvas. The artwork (node 52:1280)
 * bottoms out at 828 and the progress line sits at 789, so the section is
 * cut just below the artwork instead of running to the full 973 of Frame 5.
 */
export const STAGES_HEIGHT = 812

/**
 * Scroll runway for one state, as a fraction of the pinned section. Kept
 * short: the wheel handler jumps between states, so this only has to give the
 * browser somewhere to scroll.
 */
const STEP_RATIO = 0.4

/** A physical wheel gesture fires many events; these keep it to one state. */
const GESTURE_LOCK = 450
const GESTURE_IDLE = 140

/** Artwork group (node 52:1280) at its canvas size. */
const VISUAL_WIDTH = 454.978
const VISUAL_HEIGHT = 693

type TorahStagesSectionProps = {
  scale: number
  fluid: boolean
  viewportWidth: number
  viewportHeight: number
}

/**
 * Section 2 — "מתורתו אנו חיים" (Frame 5), with the four states of Frame 14.
 *
 * The section pins to the top of the viewport and one wheel gesture moves it
 * on by exactly one state. Heading, rail and progress track stay put; the
 * artwork, copy and counter are swapped instantly — no fade, no crossfade.
 * Past the last state the wheel is released and the page scrolls on.
 */
export function TorahStagesSection({
  scale,
  fluid,
  viewportWidth,
  viewportHeight,
}: TorahStagesSectionProps) {
  const trackRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeRef = useRef(0)
  activeRef.current = activeIndex

  // The pinned section is exactly one viewport tall and its content is
  // centred in it. Anything shorter leaves a band of empty page below the
  // content for as long as the section is pinned.
  const stickyHeight = viewportHeight
  const scrollable = stickyHeight * STEP_RATIO * (stages.length - 1)
  const trackHeight = stickyHeight + scrollable

  // Below 1024px the artwork is scaled to whatever the stacked layout can
  // spare, so it is never clipped on a short or narrow screen.
  const visualScale = fluid
    ? Math.min(
        1,
        (viewportWidth * 0.8) / VISUAL_WIDTH,
        (viewportHeight * 0.44) / VISUAL_HEIGHT,
      )
    : 1

  const goToStage = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return

      const trackTop = track.getBoundingClientRect().top + window.scrollY
      const top = trackTop + (scrollable * index) / (stages.length - 1)
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [scrollable],
  )

  // Scroll position → active state.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0

    const read = () => {
      const rect = track.getBoundingClientRect()
      if (scrollable <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const next = Math.min(stages.length - 1, Math.floor(progress * stages.length))
      setActiveIndex((current) => (current === next ? current : next))
    }

    // Sampled per frame while the track is on screen, so the state also
    // follows smooth-scroll and scroll-anchoring moves, not just scroll events.
    const loop = () => {
      read()
      frame = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          frame = requestAnimationFrame(loop)
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0 },
    )

    observer.observe(track)
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    read()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [scrollable])

  // One wheel gesture → one state.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let unlockAt = 0

    const onWheel = (event: WheelEvent) => {
      const rect = track.getBoundingClientRect()
      const isPinned = rect.top <= 0 && rect.bottom >= stickyHeight
      if (!isPinned || event.deltaY === 0) return

      const target = activeRef.current + (event.deltaY > 0 ? 1 : -1)
      // Past either end the wheel belongs to the page again.
      if (target < 0 || target > stages.length - 1) return

      event.preventDefault()

      const now = performance.now()
      if (now < unlockAt) {
        // Still the tail of the same gesture (trackpad momentum) — swallow it.
        unlockAt = now + GESTURE_IDLE
        return
      }

      unlockAt = now + GESTURE_LOCK
      goToStage(target)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goToStage, stickyHeight])

  return (
    <section
      className="torah-stages"
      ref={trackRef}
      style={{ height: trackHeight, '--visual-scale': visualScale } as CSSProperties}
      aria-label="מתורתו אנו חיים"
    >
      <div className="torah-stages__sticky" style={{ height: stickyHeight }}>
        <ScaledStage designHeight={STAGES_HEIGHT} scale={scale} fluid={fluid}>
          {/* Node 52:1289 */}
          <h2 className="torah-stages__heading">מתורתו אנו חיים</h2>

          <StageVisual stages={stages} activeIndex={activeIndex} />
          <StageRail stages={stages} activeIndex={activeIndex} onSelect={goToStage} />
          <StageCopy stages={stages} activeIndex={activeIndex} />
          <StageProgress activeIndex={activeIndex} total={stages.length} />
        </ScaledStage>
      </div>
    </section>
  )
}
