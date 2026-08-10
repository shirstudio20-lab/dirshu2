import { usePrayerModal } from '../PrayerModal/prayerModalContext'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import './HeroesBookSection.css'

/** Height of the section on the Figma canvas (y 3024 → 4101). */
export const HEROES_HEIGHT = 942

type HeroesBookSectionProps = {
  scale: number
  fluid: boolean
}

/**
 * Section 4 — "ספר הגיבורים" (nodes 52:1304, 52:1455, 52:1456, 52:1584 and
 * the artwork group 52:1972). The call to action opens the prayer-names form
 * in a modal rather than navigating away.
 *
 * DOM order is copy → artwork → button, which is the mobile reading order;
 * on the canvas all three are absolutely placed, so the order is free.
 */
export function HeroesBookSection({ scale, fluid }: HeroesBookSectionProps) {
  const prayerModal = usePrayerModal()

  return (
    <section className="heroes-book" aria-label="ספר הגיבורים">
      <ScaledStage designHeight={HEROES_HEIGHT} scale={scale} fluid={fluid}>
        <div className="heroes-book__copy">
          {/* Node 52:1304 */}
          <h2 className="heroes-book__heading">ספר הגיבורים</h2>

          {/* Node 52:1455 */}
          <p className="heroes-book__body">
            בגמרא (ב”מ פה:) ובספרים הקדושים מובא ענין הסגולה הגדולה לעלות על קברו של צדיק שאת תורתו
            לומדים 'מתניתא דמר קא מתנינן' והצדיק בעצמו יורד להצילו מכל דבר. וגדולה תהיה התפילה
            והישועה לכל לומדי תורתו של 'החפץ חיים' והמקבלים על עצמם להצטרף ללימוד ה'דף היומי בהלכה'
          </p>

          {/* Node 52:1456 */}
          <p className="heroes-book__lead">
            <span>שליחת שמות לספר הגיבורים</span>
            <span>למעמד התפילה ההיסטורי של משלחת הרבנים</span>
            <span>על ציונו של מרנא ה'חפץ חיים' זיע"א</span>
          </p>
        </div>

        {/* Nodes 52:1970 (glow) and 52:1589 (artwork). */}
        <div className="heroes-book__artwork">
          <img className="heroes-book__glow" src="/assets/heroes-book-glow.svg" alt="" />
          <img
            className="heroes-book__image"
            src="/assets/heroes-book.png"
            alt={'מצבת מרנא ה\'חפץ חיים\' זיע"א עם ספרי הלימוד ופתקי התפילה'}
          />
        </div>

        {/* Node 52:1584 */}
        <button className="heroes-book__cta" type="button" onClick={prayerModal.open}>
          לחצו כאן לשליחת שמות לתפילה ←
        </button>
      </ScaledStage>

    </section>
  )
}
