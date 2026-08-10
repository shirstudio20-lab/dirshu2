import type { Stage } from '../../data/stages'

/** Left edge of the cover inside the stage group (node 52:1281). */
const COVER_LEFT = 65.236

type StageVisualProps = {
  stages: Stage[]
  activeIndex: number
}

/**
 * Node 52:1280 — the לוח cover stays put while the calligraphed date and the
 * volume in front of it change with the active stage. The outer frame is
 * `display: contents` on the canvas and only takes over below 1024px, where
 * it reserves room for the scaled-down artwork.
 */
export function StageVisual({ stages, activeIndex }: StageVisualProps) {
  return (
    <div className="stage-visual-frame" aria-hidden="true">
      <div className="stage-visual">
        <div className="stage-visual__cover">
          <img className="stage-visual__cover-image" src="/assets/luach-cover.png" alt="" />
        </div>

        {stages.map((stage, index) => (
          <div
            className={`stage-visual__state ${index === activeIndex ? 'is-active' : ''}`}
            key={stage.id}
          >
            <div
              className="stage-visual__lettering"
              style={{
                left: COVER_LEFT + stage.lettering.left,
                top: stage.lettering.top,
                width: stage.lettering.width,
                height: stage.lettering.height,
                transform: stage.lettering.rotate ? `rotate(${stage.lettering.rotate}deg)` : undefined,
              }}
            >
              <img src={stage.lettering.src} alt="" />
            </div>

            <div
              className="stage-visual__book"
              style={{
                left: stage.book.left,
                top: stage.book.top,
                width: stage.book.width,
                height: stage.book.height,
              }}
            >
              <img src={stage.book.src} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
