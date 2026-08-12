export type DownloadItem = {
  id: string
  title: string
  fileUrl: string
}

export const fileDownloads: DownloadItem[] = [
  { id: 'amud-yomi-calendar', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05dc\u05d5\u05d7 \u05e2\u05de\u05d5\u05d3 \u05d4\u05d9\u05d5\u05de\u05d9', fileUrl: '' },
  { id: 'yomi-calendar', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05dc\u05d5\u05d7 \u05dc\u05d9\u05de\u05d5\u05d3 \u05d4\u05d9\u05d5\u05de\u05d9', fileUrl: '' },
  { id: 'mishna-berura', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05e7\u05d5\u05d1\u05e5 \u05de\u05e9\u05e0\u05d4 \u05d1\u05e8\u05d5\u05e8\u05d4', fileUrl: '' },
  { id: 'iyun-haamud', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05e7\u05d5\u05d1\u05e5 \u05e2\u05d9\u05d5\u05df \u05d4\u05e2\u05d9\u05de\u05d5\u05d3', fileUrl: '' },
]

export const bookSetDownloads: DownloadItem[] = [
  { id: 'sample-chapter', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d3\u05d5\u05d2\u05de\u05d4 \u05de\u05d4\u05e1\u05e4\u05e8', fileUrl: '' },
  { id: 'intro-chapter', title: '\u05dc\u05d4\u05d5\u05e8\u05d3\u05ea \u05e4\u05e8\u05e7 \u05d4\u05de\u05d1\u05d5\u05d0', fileUrl: '' },
]
