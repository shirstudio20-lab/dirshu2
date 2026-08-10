/**
 * Works out where the one open contact card sits, in the coordinate space of
 * the section layer.
 *
 * The card prefers the side of the globe its marker is on. If that would run
 * past the edge of the section it tries the other side, then above and below,
 * and is finally clamped inside the layer — so it can never be clipped.
 */

export type Rect = { x: number; y: number; width: number; height: number }

export type Placement = {
  card: Rect
  marker: { x: number; y: number }
  /** Connector length and angle, from the marker outwards. */
  length: number
  angle: number
}

export const CARD_WIDTH = 288

/** Distance between the marker and the near edge of the card. */
const GAP = 150

/** Smallest distance the card may sit from the edge of the layer. */
const MARGIN = 28

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

/** Candidate offsets from the marker, in the order they should be tried. */
function candidates(width: number, height: number, preferLeft: boolean) {
  const left = -GAP - width
  const right = GAP
  const sides = preferLeft ? [left, right] : [right, left]

  const list: Array<{ dx: number; dy: number }> = []
  for (const dy of [-height / 2, -height - 24, 24]) {
    for (const dx of sides) list.push({ dx, dy })
  }
  list.push({ dx: -width / 2, dy: -GAP * 0.6 - height })
  list.push({ dx: -width / 2, dy: GAP * 0.6 })
  return list
}

/** Where the connector meets the card: the edge midpoint facing the marker. */
function anchorFor(card: Rect, marker: { x: number; y: number }) {
  const cx = card.x + card.width / 2
  const cy = card.y + card.height / 2
  const dx = cx - marker.x
  const dy = cy - marker.y

  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: dx >= 0 ? card.x : card.x + card.width, y: cy }
  }
  return { x: cx, y: dy >= 0 ? card.y : card.y + card.height }
}

export function computePlacement(
  marker: { x: number; y: number },
  cardWidth: number,
  cardHeight: number,
  layerWidth: number,
  layerHeight: number,
): Placement {
  const preferLeft = marker.x <= layerWidth / 2
  const minX = MARGIN
  const maxX = layerWidth - cardWidth - MARGIN
  const minY = MARGIN
  const maxY = layerHeight - cardHeight - MARGIN

  let chosen: Rect | null = null
  let fallback: Rect | null = null

  for (const { dx, dy } of candidates(cardWidth, cardHeight, preferLeft)) {
    const x = marker.x + dx
    const y = marker.y + dy
    const rect: Rect = {
      x: clamp(x, minX, maxX),
      y: clamp(y, minY, maxY),
      width: cardWidth,
      height: cardHeight,
    }

    if (!fallback) fallback = rect
    // A candidate is taken only if it needed no clamping, i.e. it fits as drawn.
    if (rect.x === x && rect.y === y) {
      chosen = rect
      break
    }
  }

  const card = chosen ?? fallback!
  const anchor = anchorFor(card, marker)
  const dx = anchor.x - marker.x
  const dy = anchor.y - marker.y

  return {
    card,
    marker,
    length: Math.hypot(dx, dy),
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
  }
}
