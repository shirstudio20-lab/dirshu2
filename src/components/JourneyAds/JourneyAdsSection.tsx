import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { useDragSwipe } from '../../hooks/useDragSwipe'
import { Lightbox } from '../Gallery/Lightbox'
import { announcements } from '../../data/announcements'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import { AdCard } from './AdCard'
import { CarouselArrow } from './CarouselArrow'
import { carouselLayout, CAROUSEL_TOP, SIDE_SCALE, wrapIndex } from './layout'
import './JourneyAdsSection.css'

/**
 * How many slides are kept on either side of the active one. Two is enough
 * for the neighbours to be visible and for the slide entering the carousel to
 * mount well outside the frame.
 */
const WINDOW = 2

type JourneyAdsSectionProps = {
  scale: number
  fluid: boolean
  viewportWidth: number
}

/**
 * Section 3 — "פרטי המסע ההיסטורי" (nodes 52:1238–52:1958).
 *
 * A centred coverflow carousel: the active card sits dead centre at full
 * size, the neighbours are the same card at 0.6107. It runs endlessly in both
 * directions, so there is always a card to the left and to the right however
 * many announcements the data holds.
 *
 * Reading order is RTL, so the next announcement lives to the left and the
 * ← arrow advances.
 */
export function JourneyAdsSection({ scale, fluid, viewportWidth }: JourneyAdsSectionProps) {
  // Absolute position rather than an index, so the carousel can keep going
  // past either end of the array. It opens on the middle announcement, which
  // is the state Frame 5 shows.
  const [position, setPosition] = useState(() => Math.floor(announcements.length / 2))

  const layout = useMemo(() => carouselLayout(fluid, viewportWidth), [fluid, viewportWidth])
  const stageRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useDragSwipe(stageRef, { onStep: (direction) => setPosition((current) => current + direction) })

  const lightboxImages = announcements
    .filter((item) => item.image)
    .map((item) => ({ src: item.image as string, title: item.alt ?? '' }))

  const slides = []
  for (let slot = position - WINDOW; slot <= position + WINDOW; slot += 1) {
    slides.push(slot)
  }

  const activeAnnouncement = announcements[wrapIndex(position, announcements.length)]

  return (
    <section className="journey-ads" aria-label="פרטי המסע ההיסטורי" aria-roledescription="carousel">
      <ScaledStage designHeight={layout.sectionHeight} scale={scale} fluid={fluid}>
        {/* Node 52:1238 */}
        <div className="journey-ads__backdrop">
          <img src="/assets/section3-bg.png" alt="" />
        </div>

        {/* Node 52:1303 */}
        <h2 className="journey-ads__heading">פרטי המסע ההיסטורי</h2>

        {/* Node 52:1586 — designer annotation kept from the file. */}
        <p className="journey-ads__note">[הצגת המודעה המלאה בהמשך יהיו מודעות נוספות]</p>

        <div
          ref={stageRef}
          className="journey-ads__stage"
          style={{ height: layout.cardHeight, top: fluid ? undefined : CAROUSEL_TOP }}
        >
          {slides.map((slot) => {
            const isActive = slot === position
            const announcement = announcements[wrapIndex(slot, announcements.length)]
            const offset = (slot - position) * layout.pitch

            return (
              <div
                className={`journey-ads__slide ${isActive ? 'is-active' : ''}`}
                key={slot}
                aria-hidden={!isActive}
                style={
                  {
                    width: layout.cardWidth,
                    height: layout.cardHeight,
                    // Negative offset for later slots: in RTL the next
                    // announcement comes in from the left.
                    transform: `translateX(calc(-50% - ${offset}px)) scale(${isActive ? 1 : SIDE_SCALE})`,
                    // Radius and label are specified at their rendered size in
                    // the design, so they are divided back out of the scale.
                    '--card-scale': isActive ? 1 : SIDE_SCALE,
                  } as CSSProperties
                }
              >
                <AdCard
                  announcement={announcement}
                  isActive={isActive}
                  onOpen={
                    isActive && announcement.image
                      ? () =>
                          setLightboxIndex(
                            lightboxImages.findIndex((entry) => entry.src === announcement.image),
                          )
                      : undefined
                  }
                />
              </div>
            )
          })}
        </div>

        <p className="journey-ads__status" aria-live="polite">
          {activeAnnouncement.alt ?? activeAnnouncement.placeholder?.join(' ')}
        </p>

        <div
          className="journey-ads__controls"
          style={fluid ? undefined : { top: layout.arrowTop }}
        >
          {/* Node 52:1957 — in RTL the next announcement sits to the left. */}
          <CarouselArrow
            direction="next"
            label="למודעה הבאה"
            onClick={() => setPosition((current) => current + 1)}
          />
          {/* Node 52:1958 */}
          <CarouselArrow
            direction="previous"
            label="למודעה הקודמת"
            onClick={() => setPosition((current) => current - 1)}
          />
        </div>
      </ScaledStage>

      {lightboxIndex !== null ? (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </section>
  )
}
