/**
 * Listening platforms.
 *
 * The row is drawn left to right, so this array runs in that direction — the
 * last entry is the one that reads first in the RTL order the design lists:
 * דרשו ד' ועוז, דרשו ארה"ב, קול הלשון, Shas Illuminated, TorahAnytime,
 * All Halacha.
 *
 * A `tel:` url places a call and must stay in the same tab; anything else is
 * an external site and opens in a new one. `PlatformsSection` decides that
 * from the url itself, so nothing else needs to be set here.
 */

export type Platform = {
  id: string
  image: string
  alt: string
  url: string
}

export const platforms: Platform[] = [
  { id: 'all-halacha', image: '/assets/platforms/all-halacha.png', alt: 'All Halacha', url: 'https://alldaf.org/' },
  {
    id: 'torah-anytime',
    image: '/assets/platforms/torah-anytime.png',
    alt: 'TorahAnytime',
    url: 'https://torahanytime.com/topics/100085',
  },
  {
    id: 'shas-illuminated',
    image: '/assets/platforms/shas-illuminated.png',
    alt: 'Shas Illuminated',
    url: 'https://www.shasilluminated.org/rabbi-avi-slansky',
  },
  {
    id: 'kol-halashon',
    image: '/assets/platforms/kol-halashon.png',
    alt: 'קול הלשון',
    url: 'tel:7189066449',
  },
  {
    id: 'dirshu-usa',
    image: '/assets/platforms/dirshu-usa.png',
    alt: 'דרשו ארה"ב',
    url: 'tel:2126662800',
  },
  {
    id: 'dirshu-israel',
    image: '/assets/platforms/dirshu-israel.png',
    alt: "דרשו ד' ועוז",
    url: 'https://www.dirshu.co.il/%d7%94%d7%93%d7%a3-%d7%94%d7%99%d7%95%d7%9e%d7%99-%d7%91%d7%94%d7%9c%d7%9b%d7%94/',
  },
]
