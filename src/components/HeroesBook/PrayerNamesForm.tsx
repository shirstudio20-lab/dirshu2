import { useId, useState, type FormEvent } from 'react'
import './PrayerNamesForm.css'

type NameRow = {
  id: number
  fullName: string
  parent: string
}

const emptyRow = (id: number): NameRow => ({ id, fullName: '', parent: '' })

/**
 * The prayer-names form inside the modal. Front-end only for now: it
 * validates and shows a success state, it does not post anywhere yet.
 */
export function PrayerNamesForm() {
  const fieldId = useId()
  const [rows, setRows] = useState<NameRow[]>([emptyRow(0)])
  const [nextId, setNextId] = useState(1)
  const [privacy, setPrivacy] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const missingNames = rows.some((row) => row.fullName.trim() === '')
  const isValid = !missingNames && privacy

  const updateRow = (id: number, patch: Partial<NameRow>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  const addRow = () => {
    setRows((current) => [...current, emptyRow(nextId)])
    setNextId((id) => id + 1)
  }

  const removeRow = (id: number) => {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : current))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isValid) {
      setShowErrors(true)
      return
    }
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="prayer-form__success" role="status">
        <p className="prayer-form__success-title">השמות נשלחו בהצלחה</p>
        <p className="prayer-form__success-text">
          {rows.length === 1
            ? 'השם יועלה למעמד התפילה על ציונו של מרנא ה׳חפץ חיים׳ זיע"א'
            : `${rows.length} השמות יועלו למעמד התפילה על ציונו של מרנא ה׳חפץ חיים׳ זיע"א`}
        </p>
      </div>
    )
  }

  return (
    <form className="prayer-form" noValidate onSubmit={onSubmit}>
      <ul className="prayer-form__rows">
        {rows.map((row, index) => {
          const nameId = `${fieldId}-name-${row.id}`
          const parentId = `${fieldId}-parent-${row.id}`
          const hasError = showErrors && row.fullName.trim() === ''

          return (
            <li className="prayer-form__row" key={row.id}>
              <span className="prayer-form__index" aria-hidden="true">
                {index + 1}
              </span>

              <div className="prayer-form__field">
                <label className="prayer-form__label" htmlFor={nameId}>
                  שם מלא<span aria-hidden="true">*</span>:
                </label>
                <input
                  className={`prayer-form__input ${hasError ? 'has-error' : ''}`}
                  id={nameId}
                  type="text"
                  value={row.fullName}
                  required
                  aria-invalid={hasError}
                  onChange={(event) => updateRow(row.id, { fullName: event.target.value })}
                />
              </div>

              <div className="prayer-form__field">
                <label className="prayer-form__label" htmlFor={parentId}>
                  בן:
                </label>
                <input
                  className="prayer-form__input"
                  id={parentId}
                  type="text"
                  value={row.parent}
                  onChange={(event) => updateRow(row.id, { parent: event.target.value })}
                />
              </div>

              {index > 0 ? (
                <button
                  className="prayer-form__remove"
                  type="button"
                  aria-label={`הסרת שם ${index + 1}`}
                  onClick={() => removeRow(row.id)}
                >
                  <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                    <path d="M7 12 H17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              ) : null}
            </li>
          )
        })}
      </ul>

      <div className="prayer-form__add">
        <span className="prayer-form__index prayer-form__index--plus" aria-hidden="true">
          +
        </span>
        <button className="prayer-form__add-button" type="button" onClick={addRow}>
          להוספת שם נוסף
        </button>
      </div>

      <label className="prayer-form__privacy">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(event) => setPrivacy(event.target.checked)}
          aria-invalid={showErrors && !privacy}
        />
        <span>אני מאשר את מדיניות הפרטיות</span>
      </label>

      {showErrors && !isValid ? (
        <p className="prayer-form__error" role="alert">
          {missingNames ? 'יש למלא שם מלא בכל שורה' : 'יש לאשר את מדיניות הפרטיות'}
        </p>
      ) : null}

      <button className="prayer-form__submit" type="submit">
        שלחו טופס ←
      </button>
    </form>
  )
}
