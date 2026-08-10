/**
 * Section 3 — "פרטי המסע ההיסטורי".
 *
 * Data-driven on purpose: the carousel renders whatever is in this array, so
 * adding an announcement is a matter of adding an entry. The two placeholders
 * are the grey cards of nodes 52:1239 / 52:1240 and can simply be replaced
 * with `image` entries once the artwork exists.
 */

export type Announcement = {
  id: string
  /** Artwork for a live announcement. */
  image?: string
  alt?: string
  /** Lines of the placeholder label, nodes 52:1587 / 52:1588. */
  placeholder?: string[]
}

const PLACEHOLDER_LABEL = ['כאן תופיע מודעה', '[תוצג בהמשך]']

export const announcements: Announcement[] = [
  { id: 'placeholder-a', placeholder: PLACEHOLDER_LABEL },
  {
    id: 'masa-histori',
    image: '/assets/ad-1.png',
    alt: 'מודעת המסע ההיסטורי — להחיות את תורתו',
  },
  { id: 'placeholder-b', placeholder: PLACEHOLDER_LABEL },
]
