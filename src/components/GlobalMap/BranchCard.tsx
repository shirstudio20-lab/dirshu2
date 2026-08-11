import type { ReactNode } from 'react'
import type { Branch } from '../../data/branches'
import { CloseIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon } from './icons'

type BranchCardProps = {
  branch: Branch
  /** Left out for the default card, which is always on screen and has nothing to close back to. */
  onClose?: () => void
}

type RowProps = {
  icon: ReactNode
  children: ReactNode
}

/** Icon first so that in the RTL flow it lands on the right of the row. */
function Row({ icon, children }: RowProps) {
  return (
    <li className="branch-card__row">
      <span className="branch-card__icon">{icon}</span>
      {children}
    </li>
  )
}

/**
 * Node 52:1568 — the one contact card in the section, reused for every
 * branch. Rows with no data are not rendered; phone, mail and site keep an
 * LTR run of their own so the characters never reverse.
 */
export function BranchCard({ branch, onClose }: BranchCardProps) {
  return (
    <div className="branch-card" dir="rtl">
      {onClose ? (
        <button className="branch-card__close" type="button" aria-label="סגירת הפרטים" onClick={onClose}>
          <CloseIcon />
        </button>
      ) : null}

      <div className="branch-card__header">
        <p className="branch-card__location">{branch.location}</p>
        {branch.contactName ? <p className="branch-card__contact">{branch.contactName}</p> : null}
      </div>

      <ul className="branch-card__rows">
        {branch.address ? (
          <Row icon={<PinIcon />}>
            <span className="branch-card__text">{branch.address}</span>
          </Row>
        ) : null}

        {branch.phone ? (
          <Row icon={<PhoneIcon />}>
            <a
              className="branch-card__text branch-card__text--ltr"
              href={`tel:${branch.phone.replace(/\s/g, '')}`}
              dir="ltr"
            >
              {branch.phone}
            </a>
          </Row>
        ) : null}

        {branch.email ? (
          <Row icon={<MailIcon />}>
            <a
              className="branch-card__text branch-card__text--ltr"
              href={`mailto:${branch.email}`}
              dir="ltr"
            >
              {branch.email}
            </a>
          </Row>
        ) : null}

        {branch.website ? (
          <Row icon={<GlobeIcon />}>
            <a
              className="branch-card__text branch-card__text--ltr"
              href={branch.website}
              target="_blank"
              rel="noreferrer noopener"
              dir="ltr"
            >
              {branch.website.replace(/^https?:\/\//, '')}
            </a>
          </Row>
        ) : null}
      </ul>

      <p className="branch-card__note">לפרטים נוספים - פנו לסניף המקומי</p>
    </div>
  )
}
