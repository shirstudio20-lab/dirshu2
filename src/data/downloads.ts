/**
 * Downloadable files.
 *
 * `fileUrl` is deliberately empty: the real files have not been supplied yet.
 * Fill it in and the button becomes a live download — nothing else has to
 * change, and no placeholder file is invented in the meantime.
 */

export type DownloadItem = {
  id: string
  title: string
  /** Preview artwork for the card. */
  image?: string
  /** Path or URL of the file. Empty until the real file exists. */
  fileUrl: string
}

/** Section "קבצים להורדה" — nodes 52:1432 / 52:1437 / 52:1442. */
export const fileDownloads: DownloadItem[] = [
  {
    id: 'luach-limud',
    title: 'להורדת לוח לימוד יומי',
    image: '/assets/download-3.png',
    fileUrl: '',
  },
  {
    id: 'mishna-berura',
    title: 'להורדת קובץ משנה ברורה',
    image: '/assets/download-2.png',
    fileUrl: '',
  },
  {
    id: 'iyun-haamud',
    title: 'להורדת קובץ עיון העימוד',
    image: '/assets/download-1.png',
    fileUrl: '',
  },
]

/** Section "תורת החפץ חיים" — nodes 52:1448 / 52:1451, right to left. */
export const bookSetDownloads: DownloadItem[] = [
  { id: 'sample-chapter', title: 'להורדת קובץ דוגמה מהספר', fileUrl: '' },
  { id: 'intro-chapter', title: 'להורדת פרק המבוא', fileUrl: '' },
]
