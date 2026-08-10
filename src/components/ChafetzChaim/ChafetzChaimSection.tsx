import { useEffect, useRef, useState } from 'react'
import { bookSetDownloads } from '../../data/downloads'
import { FileDownloadIcon } from '../icons/FileDownloadIcon'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import './ChafetzChaimSection.css'

/** Height of the section on the 1920 canvas (node 52:1242). */
export const CHAFETZ_CHAIM_HEIGHT = 800

type ChafetzChaimSectionProps = {
  scale: number
  fluid: boolean
}

/**
 * Section "תורת החפץ חיים" (nodes 52:1242–52:1458).
 *
 * Two columns on the canvas: the set of books on one side, the heading, the
 * copy, the offer and the two download buttons on the other. The buttons come
 * from data — their files are not in yet, so they stay inert until a `fileUrl`
 * is filled in.
 */
export function ChafetzChaimSection({ scale, fluid }: ChafetzChaimSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`chafetz ${isRevealed ? 'is-revealed' : ''}`}
      ref={sectionRef}
      aria-label="תורת החפץ חיים"
    >
      <div className="chafetz__background" aria-hidden="true" />

      <ScaledStage designHeight={CHAFETZ_CHAIM_HEIGHT} scale={scale} fluid={fluid}>
        <div className="chafetz__inner">
          {/* Nodes 52:1987 (glow) and 52:1457 (the set). */}
          <div className="chafetz__artwork">
            <img className="chafetz__glow" src="/assets/chafetz-chaim-glow.svg" alt="" />
            <img
              className="chafetz__books"
              src="/assets/chafetz-chaim-set.png"
              alt="סט ספרי תורת החפץ חיים"
            />
          </div>

          <div className="chafetz__copy">
            {/* Node 52:1273 */}
            <h2 className="chafetz__heading">תורת החפץ חיים</h2>

            {/* Node 52:1454 */}
            <p className="chafetz__body">
              סט ספרי 'תורת החפץ חיים' מופיעים לראשונה במהדורה חדשה ומפוארת - י"ח מספריו הקדושים
              שחיבר בקדשו, בתוספת מאות מראי מקומות, ניקוד ופיסוק מאירי עיניים - למען ירוץ בהם הלומד,
              ישמע חכם ויוסיף לקח, דעת ויראת ה'
            </p>

            {/* Node 52:1458 */}
            <p className="chafetz__offer">
              <span className="chafetz__offer-label">מחיר מיוחד למצטרפים ללומדים</span>
              <span className="chafetz__offer-price">
                <span className="chafetz__offer-new">85 ₪ לסט</span>
                <s className="chafetz__offer-old">במקום 120 ₪</s>
              </span>
            </p>

            {/* Node 52:1447 */}
            <div className="chafetz__actions">
              {bookSetDownloads.map((item) =>
                item.fileUrl ? (
                  <a className="chafetz__action" key={item.id} href={item.fileUrl} download>
                    <span className="chafetz__action-icon">
                      <FileDownloadIcon />
                    </span>
                    {item.title}
                  </a>
                ) : (
                  <button
                    className="chafetz__action"
                    key={item.id}
                    type="button"
                    disabled
                    title="הקובץ יעלה בקרוב"
                  >
                    <span className="chafetz__action-icon">
                      <FileDownloadIcon />
                    </span>
                    {item.title}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </ScaledStage>
    </section>
  )
}
