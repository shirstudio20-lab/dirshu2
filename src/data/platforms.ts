/**
 * Listening platforms, in the order of the design (left to right).
 *
 * `url` is empty for now — filling one in turns that item into a link, with
 * no other change needed.
 */

export type Platform = {
  id: string
  image: string
  alt: string
  url: string
}

export const platforms: Platform[] = [
  { id: 'all-halacha', image: '/assets/platforms/all-halacha.png', alt: 'All Halacha', url: '' },
  { id: 'torah-anytime', image: '/assets/platforms/torah-anytime.png', alt: 'TorahAnytime', url: '' },
  {
    id: 'shas-illuminated',
    image: '/assets/platforms/shas-illuminated.png',
    alt: 'Shas Illuminated',
    url: '',
  },
  { id: 'kol-halashon', image: '/assets/platforms/kol-halashon.png', alt: 'קול הלשון', url: '' },
  { id: 'dirshu-daf', image: '/assets/platforms/dirshu-daf.png', alt: 'דרשו', url: '' },
]
