type CarouselArrowProps = {
  direction: 'next' | 'previous'
  label: string
  onClick: () => void
}

/**
 * Nodes 52:1957 / 52:1958 — a 51px circle with a thin white stroke.
 * The glyph is a chevron drawn in the same 51 viewBox, so the button stays
 * crisp and the stroke weight stays even at any rendered size.
 */
export function CarouselArrow({ direction, label, onClick }: CarouselArrowProps) {
  const chevron = direction === 'next' ? 'M28.5 17.5 L20.5 25.5 L28.5 33.5' : 'M22.5 17.5 L30.5 25.5 L22.5 33.5'

  return (
    <button
      className={`carousel-arrow carousel-arrow--${direction}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      <svg viewBox="0 0 51 51" role="presentation" focusable="false">
        <circle cx="25.5" cy="25.5" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d={chevron}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
