/**
 * Section "ראדין בעין המצלמה".
 *
 * Titles are the supplied file titles, used verbatim for the hover overlay,
 * the lightbox caption and the alt text. To add, remove or reorder a
 * photograph, edit this list — the columns and the lightbox follow it.
 */

/** Card proportion. The two true portraits carry the composition. */
export type GalleryWeight = 'tall' | 'medium' | 'small'

export type GalleryImage = {
  src: string
  title: string
  weight: GalleryWeight
  alt?: string
}

const dir = '/assets/gallery'

/**
 * The order is curated, not alphabetical: the images are dealt to the columns
 * one after another, so the sequence decides the composition.
 *
 * Two rules are built into it. The two portraits — the dominant cards — sit at
 * positions 1 and 6, and the pair of near-identical graveside photographs at
 * positions 2 and 7. Those gaps (5 and 5) are not divisible by 4, 3 or 2, so
 * at every column count the talls land in different columns and the near-twins
 * never end up side by side at the same height.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: `${dir}/gedolei-yisrael-bechazit-yeshivat-radin.webp`,
    title: 'גדולי ישראל בחזית ישיבת ראדין',
    weight: 'medium',
  },
  { src: `${dir}/shifchi-kamayim-libech.webp`, title: 'שפכי כמים ליבהך', weight: 'tall' },
  { src: `${dir}/tziyon-hachafetz-chaim.webp`, title: 'ציון החפץ חיים', weight: 'small' },
  { src: `${dir}/haderech-el-hatzion.webp`, title: 'הדרך אל הציון', weight: 'medium' },
  {
    src: `${dir}/mifgash-mishtatfei-hamasa-radin.webp`,
    title: 'מפגש משתתפי המסע ראדין',
    weight: 'medium',
  },
  { src: `${dir}/radin.webp`, title: 'ראדין', weight: 'small' },
  { src: `${dir}/tefila-batzion.webp`, title: 'תפילה בציון', weight: 'tall' },
  {
    src: `${dir}/al-tziyuno-shel-marana-hachafetz-chaim.webp`,
    title: 'על ציונו של מרנא החפץ חיים',
    weight: 'medium',
  },
  { src: `${dir}/bechatzar-hayeshiva.webp`, title: 'בחצר הישיבה', weight: 'medium' },
  { src: `${dir}/sefer-hagiborim.webp`, title: 'ספר הגיבורים', weight: 'small' },
  {
    src: `${dir}/lomdim-umitpallelim-al-hatzion.webp`,
    title: 'לומדים ומתפללים על הציון',
    weight: 'medium',
  },
  {
    src: `${dir}/amirat-pirkei-tefila-betzibur.webp`,
    title: 'אמירת פרקי תפילה בציבור',
    weight: 'medium',
  },
  { src: `${dir}/tefila-al-hatzion.webp`, title: 'תפילה על הציון', weight: 'small' },
]

/** Columns shown at a given viewport width. */
export function galleryColumnCount(viewportWidth: number) {
  if (viewportWidth >= 1024) return 4
  if (viewportWidth >= 640) return 3
  return 2
}

/**
 * Deals the curated order across the columns. The order already spaces the
 * dominant and the near-identical images, so nothing is shuffled on top.
 */
export function splitIntoColumns(images: GalleryImage[], columns: number) {
  const result: GalleryImage[][] = Array.from({ length: columns }, () => [])
  images.forEach((image, index) => {
    result[index % columns].push(image)
  })
  return result
}
