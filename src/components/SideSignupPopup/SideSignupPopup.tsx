import { useEffect, useState } from 'react'
import './SideSignupPopup.css'

const POPUP_CLOSED_KEY = 'dirshu-side-signup-popup-closed'

export function SideSignupPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem(POPUP_CLOSED_KEY) === '1') return

    const timer = window.setTimeout(() => setIsVisible(true), 3500)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    window.localStorage.setItem(POPUP_CLOSED_KEY, '1')
    setIsVisible(false)
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !hasConsent) return
    window.location.href = `mailto:?subject=רישום לעדכוני דרשו&body=אבקש להצטרף לעדכונים בכתובת: ${encodeURIComponent(email)}`
  }

  if (!isVisible) return null

  return (
    <aside className="side-signup-popup" dir="rtl" aria-label="רישום לעדכונים">
      <button className="side-signup-popup__close" type="button" aria-label="סגירת הפופאפ" onClick={close}>
        ×
      </button>

      <p className="side-signup-popup__title">
        לרישום לקבלת עדכונים שוטפים אודות המסע ההיסטורי המרגש:
      </p>

      <form className="side-signup-popup__form" onSubmit={submit}>
        <label className="side-signup-popup__field">
          <span>אימייל:</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            aria-label="אימייל"
          />
        </label>

        <button className="side-signup-popup__submit" type="submit">
          שלח <span aria-hidden="true">←</span>
        </button>

        <label className="side-signup-popup__consent">
          <input
            type="checkbox"
            checked={hasConsent}
            onChange={(event) => setHasConsent(event.target.checked)}
            required
          />
          <span>אני מאשר קבלת דיוור ואת מדיניות הפרטיות</span>
        </label>
      </form>
    </aside>
  )
}
