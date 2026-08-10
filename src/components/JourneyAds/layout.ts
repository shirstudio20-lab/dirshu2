/**
 * Carousel geometry.
 *
 * On the canvas the numbers are read straight from Frame 5: the active card is
 * node 52:1590 (858 × 590 at x 531) and the side cards are nodes 52:1239 /
 * 52:1240 (524 × 360) — exactly the active card at 0.6107. The distance
 * between card centres is 745.5, i.e. 0.869 of the card width, which is what
 * makes the neighbours peek in from both edges.
 *
 * Below 1024px the same relationship is kept in CSS pixels; only the card
 * width and the pitch change, so the composition never has to be squeezed.
 */

export const CARD_ASPECT = 590 / 858
export const SIDE_SCALE = 524 / 858
export const PITCH_RATIO = 745.5 / 858
export const CAROUSEL_TOP = 270
export const CANVAS_HEIGHT = 971
export const ARROW_SIZE = 51

export type CarouselLayout = {
  cardWidth: number
  cardHeight: number
  /** Distance between two card centres. */
  pitch: number
  sectionHeight: number
  arrowTop: number
}

export function carouselLayout(fluid: boolean, viewportWidth: number): CarouselLayout {
  if (!fluid) {
    return {
      cardWidth: 858,
      cardHeight: 590,
      pitch: 745.5,
      sectionHeight: CANVAS_HEIGHT,
      // Nodes 52:1957 / 52:1958 sit 184 above the bottom of the section.
      arrowTop: CANVAS_HEIGHT - 184,
    }
  }

  const isMobile = viewportWidth < 768
  const cardWidth = isMobile
    ? Math.round(viewportWidth * 0.86)
    : Math.round(Math.min(620, viewportWidth * 0.64))

  return {
    cardWidth,
    cardHeight: Math.round(cardWidth * CARD_ASPECT),
    // Mobile pushes the neighbours right off the screen, so exactly one card
    // is on show; tablet keeps the desktop relationship and lets them peek.
    pitch: isMobile ? viewportWidth : Math.round(cardWidth * PITCH_RATIO),
    sectionHeight: 0,
    arrowTop: 0,
  }
}

/** Positive modulo, so the carousel can run in both directions forever. */
export function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length
}
