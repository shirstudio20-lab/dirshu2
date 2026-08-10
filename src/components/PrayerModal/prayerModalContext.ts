import { createContext, useContext } from 'react'

export type PrayerModalValue = {
  open: () => void
  close: () => void
}

/**
 * Kept in its own module: the provider component and the hook then share one
 * context object even when the dev server hot-reloads either of them.
 */
export const PrayerModalContext = createContext<PrayerModalValue | null>(null)

export function usePrayerModal() {
  const context = useContext(PrayerModalContext)
  if (!context) throw new Error('usePrayerModal must be used inside PrayerModalProvider')
  return context
}
