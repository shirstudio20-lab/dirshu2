import type { Stage } from '../../data/stages'

type StageCopyProps = {
  stages: Stage[]
  activeIndex: number
}

/**
 * Nodes 52:1290 / 52:1279 / 52:1277 / 52:1276 — the copy column, right edge
 * pinned to x = 1200 on the canvas.
 */
export function StageCopy({ stages, activeIndex }: StageCopyProps) {
  return (
    <div className="stage-copy">
      {stages.map((stage, index) => (
        <article
          className={`stage-copy__state ${index === activeIndex ? 'is-active' : ''}`}
          key={stage.id}
        >
          <p className="stage-copy__date">{stage.date}</p>
          <h3 className="stage-copy__title">{stage.title}</h3>
          <p className="stage-copy__subtitle">
            {stage.subtitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <p className="stage-copy__body">{stage.body}</p>
        </article>
      ))}
    </div>
  )
}
