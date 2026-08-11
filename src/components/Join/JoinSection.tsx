import { useState, type FormEvent } from 'react'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import './JoinSection.css'

/** Height of the section on the 1920 canvas (node 52:1237). */
export const JOIN_HEIGHT = 495

type JoinSectionProps = {
  scale: number
  fluid: boolean
}

const FIELDS = [
  { name: 'fullName', label: 'שם מלא:', type: 'text', autoComplete: 'name', required: true },
  { name: 'phone', label: 'טלפון:', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'city', label: 'עיר:', type: 'text', autoComplete: 'address-level2', required: false },
] as const

/**
 * Section "להימנות עם לומדי תורתו" (nodes 52:1237–52:1468).
 *
 * A real form, ready to be pointed at a handler; for now it only validates and
 * acknowledges. The background lives on its own wrapper so it can be swapped
 * without touching the content.
 */
export function JoinSection({ scale, fluid }: JoinSectionProps) {
  const [isSent, setIsSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }
    setIsSent(true)
  }

  return (
    <section id="join" className="join" aria-label="להימנות עם לומדי תורתו">
      <div className="join__background" aria-hidden="true" />

      <ScaledStage designHeight={JOIN_HEIGHT} scale={scale} fluid={fluid}>
        <div className="join__inner">
          {/* Node 52:1275 */}
          <h2 className="join__heading">להימנות עם לומדי תורתו</h2>

          {/* Node 52:1459 */}
          <p className="join__subtitle">מצטרפים לרבבות לומדי 'דרשו' בכל רחבי תבל</p>

          {/* Node 52:1460 */}
          <form className="join__form" noValidate onSubmit={onSubmit}>
            {FIELDS.map((field) => (
              <label className="join__field" key={field.name}>
                <span className="join__field-label">{field.label}</span>
                <input
                  className="join__input"
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  aria-label={field.label.replace(':', '')}
                />
              </label>
            ))}

            <button className="join__submit" type="submit">
              {isSent ? 'תודה, נחזור אליכם' : 'אני רוצה להצטרף ←'}
            </button>
          </form>
        </div>
      </ScaledStage>
    </section>
  )
}
