import { PillButton } from '../PillButton/PillButton'
import { usePrayerModal } from '../PrayerModal/prayerModalContext'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import './Hero.css'

export const HERO_HEIGHT = 1080

type HeroProps = {
  scale: number
  fluid: boolean
}

/** Section 1 — nodes 52:1249 (backdrop) and 52:1266 (content block). */
export function Hero({ scale, fluid }: HeroProps) {
  const prayerModal = usePrayerModal()

  return (
    <ScaledStage designHeight={HERO_HEIGHT} scale={scale} fluid={fluid} className="hero">
      {/* `display: contents` on the canvas, so the two layers keep their Figma
          coordinates. On phones it becomes a real box: the film sits in the
          flow at the top of the section with the copy underneath it. */}
      <div className="hero__media">
        {/* The still sits underneath and is also the poster, so it carries the
            hero on its own if the film is blocked, still loading or fails. */}
        <img className="hero__backdrop hero__backdrop--still" src="/assets/hero-bg.png" alt="" />
        <video
          className="hero__backdrop hero__backdrop--film"
          src="/assets/hero.mp4"
          poster="/assets/hero-bg.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>


      <div className="hero__content">
        <h1 className="hero__title">
          <span>להחיות</span>
          <span>את תורתו</span>
        </h1>

        <p className="hero__lede">
          כלל ישראל נושאים עיניהם בציפייה ובהתרגשות לקראת המסע ההיסטורי המרטיט להרבות את תורתו,
          להאדיר את משנתו ולחזות בהתחדשות היכלו של מרנא ה'חפץ חיים' זיע"א
        </p>

        <PillButton onClick={prayerModal.open} withArrow>
          שליחת שמות לתפילה
        </PillButton>
      </div>
    </ScaledStage>
  )
}
