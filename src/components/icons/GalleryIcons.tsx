/** Icons for the gallery overlay and lightbox — same stroke language as the rest. */

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  role: 'presentation' as const,
  focusable: 'false' as const,
}

export function SearchIcon() {
  return (
    <svg {...stroke}>
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="m15.4 15.4 4.6 4.6M8.2 10.6h4.8M10.6 8.2v4.8" />
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

export function ChevronIcon({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg {...stroke}>
      <path d={direction === 'next' ? 'M14.5 6 8.5 12l6 6' : 'M9.5 6l6 6-6 6'} />
    </svg>
  )
}
