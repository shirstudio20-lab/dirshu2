import type { ReactNode } from 'react'
import './PillButton.css'

type PillButtonProps = {
  children: ReactNode
  /** Renders an anchor instead of a button when provided. */
  href?: string
  /** Adds the trailing arrow used on the hero CTA (node 52:1594). */
  withArrow?: boolean
  className?: string
  onClick?: () => void
}

/**
 * The gold gradient pill used in the header (node 52:1251) and as the hero
 * call to action (node 52:1593). Both are 231 × 54 with a 50px radius.
 */
export function PillButton({ children, href, withArrow = false, className, onClick }: PillButtonProps) {
  const classes = ['pill-button', className].filter(Boolean).join(' ')
  const label = (
    <span className="pill-button__label">
      {children}
      {withArrow ? ' ←' : null}
    </span>
  )

  if (href) {
    return (
      <a className={classes} href={href}>
        {label}
      </a>
    )
  }

  return (
    <button className={classes} type="button" onClick={onClick}>
      {label}
    </button>
  )
}
