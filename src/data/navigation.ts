/** Main navigation, node 52:1256. Listed right-to-left, as laid out in Figma. */
export type NavItem = {
  label: string
  /** Anchor of the section it scrolls to. */
  href: string
}

export const navItems: NavItem[] = [
  { label: 'המסע', href: '#journey' },
  { label: 'ספר הגיבורים', href: '#heroes-book' },
  { label: 'תוכניות הלימוד', href: '#stages' },
  { label: 'דרשו גלובל', href: '#global' },
  { label: 'חומרי לימוד', href: '#join' },
  { label: 'תורת החפץ חיים', href: '#chafetz' },
  { label: 'קבצים להורדה', href: '#downloads' },
]
