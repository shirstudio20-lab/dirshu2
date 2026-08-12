export type DownloadItem = {
  id: string
  title: string
  fileUrl: string
}

export const fileDownloads: DownloadItem[] = [
  { id: 'amud-yomi-calendar', title: "להורדת לוח עמוד היומי", fileUrl: '' },
  { id: 'daily-study-calendar', title: "להורדת לוח לימוד היומי", fileUrl: '' },
  { id: 'mishna-berura', title: "להורדת קובץ משנה ברורה", fileUrl: '' },
  { id: 'iyun-haamud', title: "להורדת קובץ עיון העימוד", fileUrl: '' },
]

export const bookSetDownloads: DownloadItem[] = [
  { id: 'sample-chapter', title: "להורדת קובץ דוגמה מהספר", fileUrl: '' },
  { id: 'intro-chapter', title: "להורדת פרק המבוא", fileUrl: '' },
]
