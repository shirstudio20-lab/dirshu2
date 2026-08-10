import { useRef, useState, type CSSProperties } from 'react'
import { useDragSwipe } from '../../hooks/useDragSwipe'
import { INITIAL_VIDEO_ID, radinVideos, youTubeEmbed, youTubePoster } from '../../data/videos'
import './RadinSection.css'

/** Slides kept either side of the active one; enough to fill the frame. */
const WINDOW = 1

/** Positive modulo, so the carousel runs on forever in both directions. */
function wrap(value: number, length: number) {
  return ((value % length) + length) % length
}

/**
 * Section "חוזרים לראדין" (nodes 52:1241–52:1424).
 *
 * A centred carousel of films. Only the slide in the middle carries a player;
 * the ones either side are posters, so nothing is loading or playing off
 * centre. Moving a slide away unmounts its player, which stops it.
 */
export function RadinSection() {
  // Opens on a specific film rather than the first in the list.
  const [position, setPosition] = useState(() => {
    const start = radinVideos.findIndex((video) => video.id === INITIAL_VIDEO_ID)
    return start < 0 ? 0 : start
  })

  const slots: number[] = []
  for (let slot = position - WINDOW; slot <= position + WINDOW; slot += 1) slots.push(slot)

  const stageRef = useRef<HTMLDivElement>(null)
  useDragSwipe(stageRef, { onStep: (direction) => setPosition((current) => current + direction) })

  const activeIndex = wrap(position, radinVideos.length)

  return (
    <section className="radin" aria-label="חוזרים לראדין" aria-roledescription="carousel">
      <div className="radin__background" aria-hidden="true" />

      <div className="radin__content">
        {/* Node 52:1272 */}
        <h2 className="radin__heading">חוזרים לראדין</h2>

        {/* Node 52:1330 */}
        <p className="radin__intro">
          רגעי הוד ממסעות התפילה של 'דרשו' מעמדי התעוררות ורגעי הוד מן המקום שממנו יצאה תורה והוראה
          לישראל
        </p>

        {/* Nodes 52:1393 (centre) / 52:1331 / 52:1362 (sides) */}
        <div className="radin__stage" ref={stageRef}>
          {slots.map((slot) => {
            const index = wrap(slot, radinVideos.length)
            const video = radinVideos[index]
            const isActive = slot === position
            const label = video.title ?? `סרטון ${index + 1}`

            return (
              <div
                className={`radin__slide ${isActive ? 'is-active' : ''}`}
                key={slot}
                style={{ '--offset': slot - position } as CSSProperties}
                aria-hidden={!isActive}
              >
                {isActive ? (
                  <iframe
                    className="radin__player"
                    src={youTubeEmbed(video.videoUrl)}
                    title={label}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    className="radin__poster"
                    type="button"
                    aria-label={`מעבר ל${label}`}
                    tabIndex={-1}
                    onClick={() => setPosition(slot)}
                  >
                    <img src={youTubePoster(video.videoUrl)} alt="" loading="lazy" />
                    <span className="radin__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                        <path d="M9 7.5 17 12l-8 4.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Node 52:1424 */}
        <div className="radin__dots" role="tablist" aria-label="בחירת סרטון">
          {radinVideos.map((video, index) => (
            <button
              className={`radin__dot ${index === activeIndex ? 'is-active' : ''}`}
              key={video.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={video.title ?? `סרטון ${index + 1}`}
              onClick={() => setPosition((current) => current + (index - wrap(current, radinVideos.length)))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
