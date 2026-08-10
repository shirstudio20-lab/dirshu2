import { useEffect, useState } from 'react'
import { usePrayerModal } from '../PrayerModal/prayerModalContext'
import { PillButton } from '../PillButton/PillButton'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NavMenu } from './NavMenu'
import './SiteHeader.css'

/**
 * The site's only header — three absolutely placed groups on the 1920 canvas:
 * the utility group (52:1250), the main navigation (52:1256) and the
 * crest (52:1264). Below 1024px the same markup becomes a bar with a
 * drop-down panel; `.site-header__panel` is `display: contents` on desktop
 * so the canvas positions are untouched.
 *
 * Once the page scrolls it takes an `is-stuck` state: navy bar, a little
 * shorter, the crest a little smaller and still hanging below the bar. It is
 * the same element throughout — there is never a second header. It only moves
 * It is rendered at the top of the app, outside every scaled stage, so the
 * same element can pin to the viewport without a second copy anywhere.
 */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isStuck, setIsStuck] = useState(false)
  const prayerModal = usePrayerModal()

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 160)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The phone menu covers the screen, so it needs every ordinary way out:
  // the button, ESC, and following a link. The page behind it stays put.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <header className={`site-header ${isOpen ? 'is-open' : ''} ${isStuck ? 'is-stuck' : ''}`}>
      <a className="site-header__crest" href="#" aria-label="דרשו — להחיות את תורתו">
        <img src="/assets/logo.png" alt="" width={122} height={163} />
      </a>

      <button
        className="site-header__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'סגירת התפריט' : 'פתיחת התפריט'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="site-header__panel" onClick={() => setIsOpen(false)}>
        <NavMenu />

        <div className="site-header__utility">
          <PillButton onClick={prayerModal.open}>שליחת שמות לתפילה</PillButton>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )

}
