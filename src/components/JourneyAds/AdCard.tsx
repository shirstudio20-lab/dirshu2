import type { Announcement } from '../../data/announcements'

type AdCardProps = {
  announcement: Announcement
  isActive: boolean
  /** Present only on the active card that has artwork. */
  onOpen?: () => void
}

/**
 * Node 52:1590 when live, nodes 52:1239 / 52:1240 when still a placeholder.
 * Both share the 35px radius; only the active card carries the drop shadow.
 */
export function AdCard({ announcement, isActive, onOpen }: AdCardProps) {
  if (announcement.image) {
    return (
      <div className={`ad-card ad-card--image ${isActive ? 'is-active' : ''}`}>
        {onOpen ? (
          <button className="ad-card__open" type="button" onClick={onOpen} aria-label={announcement.alt}>
            <img src={announcement.image} alt={announcement.alt ?? ''} />
          </button>
        ) : (
          <img src={announcement.image} alt={announcement.alt ?? ''} />
        )}
      </div>
    )
  }

  return (
    <div className={`ad-card ad-card--placeholder ${isActive ? 'is-active' : ''}`}>
      <p className="ad-card__label">
        {announcement.placeholder?.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  )
}
