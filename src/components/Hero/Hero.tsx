import { useState } from 'react'
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
  const [filmReady, setFilmReady] = useState(false)

  return (
    <ScaledStage designHeight={HERO_HEIGHT} scale={scale} fluid={fluid} className="hero">
      {/* `display: contents` on the canvas, so the two layers keep their Figma
          coordinates. On phones it becomes a real box: the film sits in the
          flow at the top of the section with the copy underneath it. */}
      <div className="hero__media">
        {/* The still is frame 0 of hero.mp4 itself, so what paints first is the
            film's own opening frame. It shares the class the film uses, which
            is what guarantees the two are framed identically. */}
        <img
          className="hero__backdrop hero__backdrop--still"
          src="/assets/hero-poster.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <video
          className={`hero__backdrop hero__backdrop--film ${filmReady ? 'is-ready' : ''}`}
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          // Revealed only once a real frame is decoded, so the still is never
          // swapped for an empty box.
          onLoadedData={() => setFilmReady(true)}
          onCanPlay={() => setFilmReady(true)}
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
