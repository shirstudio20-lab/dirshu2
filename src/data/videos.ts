/**
 * Section "חוזרים לראדין" — the films, in the order they play in the carousel.
 *
 * Only the URL is stored; the id, the embed and the poster are all derived
 * from it, so adding or reordering a film is a one-line change here.
 */

export type VideoItem = {
  id: string
  videoUrl: string
  /** Optional label for assistive tech; falls back to a numbered title. */
  title?: string
}

/** The film the carousel opens on — "יום חיזוק ותפילה כ״ד אלול תשפ״ב". */
export const INITIAL_VIDEO_ID = 'video-3'

export const radinVideos: VideoItem[] = [
  { id: 'video-1', videoUrl: 'https://youtu.be/p4w0du3-JSU' },
  { id: 'video-2', videoUrl: 'https://youtu.be/e6yHVCjoNOw' },
  { id: 'video-3', videoUrl: 'https://youtu.be/TrLSTM9rdOQ' },
  { id: 'video-4', videoUrl: 'https://youtu.be/pImo8EAZuFg' },
  { id: 'video-5', videoUrl: 'https://youtu.be/0V-MHSGGZ7g' },
]

/** Pulls the YouTube id out of a youtu.be, /watch?v= or /embed/ URL. */
export function youTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/)
  return match ? match[1] : ''
}

/** Poster frame, so a slide off centre costs one image and no player. */
export function youTubePoster(url: string) {
  return `https://i.ytimg.com/vi/${youTubeId(url)}/hqdefault.jpg`
}

/** Embed for the active slide only; it is removed again when it moves off. */
export function youTubeEmbed(url: string) {
  return `https://www.youtube-nocookie.com/embed/${youTubeId(url)}?rel=0&modestbranding=1&playsinline=1`
}
