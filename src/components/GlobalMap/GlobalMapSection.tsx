import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { branches } from '../../data/branches'
import { BranchCard } from './BranchCard'
import { computePlacement, type Placement } from './placement'
import './GlobalMapSection.css'

type GlobalMapSectionProps = {
  /** Below 1024px the card moves under the globe instead of floating. */
  fluid: boolean
}

/**
 * Section 5 — "מלאה הארץ דעה".
 *
 * Unlike the Figma-canvas sections, this one is laid out fluidly: the
 * background spans the viewport, the film is sized with `clamp()` against
 * `vw`, and the section's height comes from its content. Markers are
 * percentages of the globe box inside the film, so they stay on their spot at
 * every width; cards are measured and placed in real pixels against the
 * section, so they can never leave it.
 */
/**
 * The card the section rests on. It shows on load and is what closing a branch
 * returns to, so the contact panel is never empty.
 */
const DEFAULT_BRANCH_ID = 'global'

export function GlobalMapSection({ fluid }: GlobalMapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const markerRefs = useRef(new Map<string, HTMLButtonElement>())

  // One card is open on arrival, so it reads straight away that the markers
  // carry contact details. The head office sits on the right of the globe, so
  // its card opens to the right and leaves the sphere clear.
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_BRANCH_ID)
  const [isRevealed, setIsRevealed] = useState(false)
  const [placement, setPlacement] = useState<Placement | null>(null)
  const [resizeTick, setResizeTick] = useState(0)

  const selected = selectedId ? branches.find((branch) => branch.id === selectedId) ?? null : null

  const setMarkerRef = useCallback((id: string) => (node: HTMLButtonElement | null) => {
    if (node) markerRefs.current.set(id, node)
    else markerRefs.current.delete(id)
  }, [])

  // Film and markers come in once, when the section reaches the viewport.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const observer = new ResizeObserver(() => setResizeTick((tick) => tick + 1))
    observer.observe(layer)
    return () => observer.disconnect()
  }, [])

  // Measured from the DOM, so the connector always starts on the marker and
  // the card is placed against the section's real size at any viewport.
  useLayoutEffect(() => {
    if (fluid || !selectedId) {
      setPlacement(null)
      return
    }

    const layer = layerRef.current
    const markerEl = markerRefs.current.get(selectedId)
    const card = cardRef.current
    if (!layer || !markerEl || !card) return

    const layerBox = layer.getBoundingClientRect()
    if (layerBox.width === 0) return

    const markerBox = markerEl.getBoundingClientRect()
    const cardBox = card.getBoundingClientRect()

    const next = computePlacement(
      {
        x: markerBox.left + markerBox.width / 2 - layerBox.left,
        y: markerBox.top + markerBox.height / 2 - layerBox.top,
      },
      cardBox.width,
      cardBox.height,
      layerBox.width,
      layerBox.height,
    )

    setPlacement((current) =>
      JSON.stringify(current) === JSON.stringify(next) ? current : next,
    )
  }, [selectedId, fluid, isRevealed, resizeTick])

  return (
    <section id="global" className="global-map" ref={sectionRef} aria-label="מלאה הארץ דעה">
      {/* Full-viewport background, built from the film's own navy. */}
      <div className="global-map__backdrop" aria-hidden="true" />

      {/* Slow blue haze, purely decorative, behind every other layer. */}
      <div className="global-map__atmosphere" aria-hidden="true">
        <span className="global-map__haze global-map__haze--a" />
        <span className="global-map__haze global-map__haze--b" />
        <span className="global-map__haze global-map__haze--c" />
        <span className="global-map__haze global-map__haze--d" />
      </div>

      <div className="global-map__content">
        <h2 className="global-map__heading">מלאה הארץ דעה</h2>

        <p className="global-map__intro">
          סניפי 'דרשו' ברחבי העולם מתאחדים לקראת המסע 'להחיות את תורתו'
        </p>

        <div className={`global-map__stage ${isRevealed ? 'is-revealed' : ''}`}>
          <video
            className="global-map__film"
            src="/assets/globe-animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          {/* Square box over the globe inside the frame; marker percentages
              are relative to it, so they stay put at every size. */}
          <div className="global-map__globe">
            <ul className="global-map__markers">
              {branches.map((branch, index) => (
                <li key={branch.id}>
                  <button
                    className={`global-map__marker ${branch.id === selectedId ? 'is-selected' : ''}`}
                    type="button"
                    ref={setMarkerRef(branch.id)}
                    style={
                      {
                        left: `${branch.x}%`,
                        top: `${branch.y}%`,
                        '--marker-delay': `${index * 70}ms`,
                      } as CSSProperties
                    }
                    aria-label={`סניף ${branch.location}`}
                    aria-pressed={branch.id === selectedId}
                    onClick={() =>
                      setSelectedId((current) => (current === branch.id ? DEFAULT_BRANCH_ID : branch.id))
                    }
                  >
                    <span className="global-map__dot" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Below 1024px the card flows in here, under the globe. */}
        {selected && fluid ? (
          <div className="global-map__card" key={selected.id} aria-live="polite">
            <BranchCard branch={selected} onClose={selected.id === DEFAULT_BRANCH_ID ? undefined : () => setSelectedId(DEFAULT_BRANCH_ID)} />
          </div>
        ) : null}
      </div>

      {/* Connector and floating card share the section's coordinate space. */}
      <div className="global-map__layer" ref={layerRef}>
        {selected && !fluid ? (
          <div className="global-map__branch" key={selected.id}>
            {placement ? (
              <div
                className="global-map__connector"
                style={{
                  left: placement.marker.x,
                  top: placement.marker.y,
                  width: placement.length,
                  transform: `rotate(${placement.angle}deg)`,
                }}
                aria-hidden="true"
              >
                <span className="global-map__connector-line" />
              </div>
            ) : null}

            <div
              className="global-map__card"
              ref={cardRef}
              style={
                placement
                  ? ({ left: placement.card.x, top: placement.card.y } as CSSProperties)
                  : undefined
              }
              aria-live="polite"
            >
              <BranchCard branch={selected} onClose={selected.id === DEFAULT_BRANCH_ID ? undefined : () => setSelectedId(DEFAULT_BRANCH_ID)} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
