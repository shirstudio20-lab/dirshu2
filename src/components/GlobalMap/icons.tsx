/**
 * Line icons for the branch card. One geometry set, one stroke weight, one
 * 24px box — no emoji, no icon font, no text symbols.
 */

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  role: 'presentation' as const,
  focusable: 'false' as const,
}

export function PhoneIcon() {
  return (
    <svg {...stroke}>
      <path d="M6.6 3.8h3l1.5 3.7-1.9 1.2a11.6 11.6 0 0 0 5.1 5.1l1.2-1.9 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 4.8 5.8a1.8 1.8 0 0 1 1.8-2Z" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg {...stroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m4 7 8 5.4L20 7" />
    </svg>
  )
}

export function PinIcon() {
  return (
    <svg {...stroke}>
      <path d="M12 21c4.2-4.6 6.3-8.2 6.3-10.8a6.3 6.3 0 1 0-12.6 0C5.7 12.8 7.8 16.4 12 21Z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </svg>
  )
}

export function GlobeIcon() {
  return (
    <svg {...stroke}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.4 5.3 3.4 8.6S14.2 18.2 12 20.6C9.8 18.2 8.6 15.3 8.6 12S9.8 5.8 12 3.4Z" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg {...stroke}>
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  )
}
