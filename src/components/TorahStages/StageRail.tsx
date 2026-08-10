import type { Stage } from '../../data/stages'

type StageRailProps = {
  stages: Stage[]
  activeIndex: number
  onSelect: (index: number) => void
}

/**
 * Nodes 52:1285–52:1288 — the circular thumbnails. The active one grows to
 * 69.191px and picks up the gold stroke of node 52:1285 plus the hairline
 * circle of node 52:1297.
 */
export function StageRail({ stages, activeIndex, onSelect }: StageRailProps) {
  return (
    <ul className="stage-rail">
      {stages.map((stage, index) => (
        <li className={`stage-rail__item ${index === activeIndex ? 'is-active' : ''}`} key={stage.id}>
          <button
            className="stage-rail__button"
            type="button"
            aria-label={stage.date}
            aria-current={index === activeIndex}
            onClick={() => onSelect(index)}
          >
            <img src={stage.thumbnail} alt="" />
            <span className="stage-rail__hairline" />
          </button>
        </li>
      ))}
    </ul>
  )
}
