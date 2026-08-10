import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { PrayerNamesForm } from '../HeroesBook/PrayerNamesForm'
import { Modal } from '../Modal/Modal'
import { PrayerModalContext, type PrayerModalValue } from './prayerModalContext'

/**
 * One "שליחת שמות לתפילה" popup for the whole site. Every call to action —
 * header, hero and ספר הגיבורים — opens this same dialog rather than each
 * carrying a copy of it.
 */
export function PrayerModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<PrayerModalValue>(
    () => ({ open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [],
  )

  return (
    <PrayerModalContext.Provider value={value}>
      {children}

      <Modal
        open={isOpen}
        onClose={close}
        title="שליחת שמות לספר הגיבורים"
        description={
          <>
            <p>למעמד התפילה ההיסטורי של משלחת הרבנים</p>
            <p>על ציונו של מרנא ה'חפץ חיים' זיע"א</p>
          </>
        }
      >
        <PrayerNamesForm />
      </Modal>
    </PrayerModalContext.Provider>
  )
}
