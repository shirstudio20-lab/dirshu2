/** Node 52:1291 — 851px track; the gold run measures 261.736px in state 1. */
const TRACK_WIDTH = 851
const FIRST_RUN = 261.736

type StageProgressProps = {
  activeIndex: number
  total: number
}

export function StageProgress({ activeIndex, total }: StageProgressProps) {
  const runRatio = (FIRST_RUN + ((TRACK_WIDTH - FIRST_RUN) * activeIndex) / (total - 1)) / TRACK_WIDTH

  return (
    <>
      {/* Node 52:1278 */}
      <p className="stage-counter" dir="ltr">
        {Array.from({ length: total }, (_, index) => (
          <span
            className={`stage-counter__value ${index === activeIndex ? 'is-active' : ''}`}
            key={index}
          >
            <span className="stage-counter__current">{String(index + 1).padStart(2, '0')}</span>
            <span className="stage-counter__slash">/</span>
            <span className="stage-counter__total">{String(total).padStart(2, '0')}</span>
          </span>
        ))}
      </p>

      {/* Node 52:1291 — line 52:1292 is the track, line 52:1293 the run. */}
      <div className="stage-progress">
        <span className="stage-progress__track" />
        <span className="stage-progress__run" style={{ width: `${runRatio * 100}%` }} />
      </div>
    </>
  )
}
