import { useEffect, useMemo, useState } from 'react'
import './FloatingEditor.css'

type EditorValues = {
  x: number
  y: number
  scale: number
  opacity: number
  marginTop: number
  marginBottom: number
}

const STORAGE_KEY = 'darshu-floating-editor-v1'
const defaultValues: EditorValues = {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 1,
  marginTop: 0,
  marginBottom: 0,
}

function isEditorEnabled() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('edit') === '1' || window.localStorage.getItem('darshu-editor-enabled') === '1'
}

function readStore(): Record<string, EditorValues> {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeStore(store: Record<string, EditorValues>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function elementLabel(element: HTMLElement) {
  const text = element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 32)
  const className = Array.from(element.classList).filter(Boolean)[0]
  return text || className || element.tagName.toLowerCase()
}

function selectorFor(element: HTMLElement) {
  const parts: string[] = []
  let current: HTMLElement | null = element

  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase()
    const className = Array.from(current.classList)
      .filter((name) => !name.startsWith('floating-editor') && !name.startsWith('is-editor'))
      .slice(0, 2)
      .map((name) => '.' + CSS.escape(name))
      .join('')

    let index = 1
    let sibling = current.previousElementSibling
    while (sibling) {
      if (sibling.tagName === current.tagName) index += 1
      sibling = sibling.previousElementSibling
    }

    parts.unshift(`${tag}${className}:nth-of-type(${index})`)

    if (current.id) {
      parts.unshift(`#${CSS.escape(current.id)}`)
      break
    }

    current = current.parentElement
  }

  return parts.join(' > ')
}

function applyValues(element: HTMLElement, values: EditorValues) {
  element.classList.add('is-editor-adjusted')
  element.style.setProperty('--editor-x', `${values.x}px`)
  element.style.setProperty('--editor-y', `${values.y}px`)
  element.style.setProperty('--editor-scale', String(values.scale))
  element.style.opacity = String(values.opacity)
  element.style.marginTop = values.marginTop ? `${values.marginTop}px` : ''
  element.style.marginBottom = values.marginBottom ? `${values.marginBottom}px` : ''
}

function clearValues(element: HTMLElement) {
  element.classList.remove('is-editor-adjusted')
  element.style.removeProperty('--editor-x')
  element.style.removeProperty('--editor-y')
  element.style.removeProperty('--editor-scale')
  element.style.opacity = ''
  element.style.marginTop = ''
  element.style.marginBottom = ''
}

function applySavedChanges() {
  const store = readStore()
  Object.entries(store).forEach(([selector, values]) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => applyValues(element, values))
  })
}

export function FloatingEditor() {
  const enabled = useMemo(isEditorEnabled, [])
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState<HTMLElement | null>(null)
  const [selector, setSelector] = useState('')
  const [values, setValues] = useState<EditorValues>(defaultValues)

  useEffect(() => {
    applySavedChanges()
    if (!enabled) return
    window.localStorage.setItem('darshu-editor-enabled', '1')
    document.documentElement.classList.add('floating-editor-active')

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target || target.closest('.floating-editor')) return
      event.preventDefault()
      event.stopPropagation()

      const editable = (target.closest('section, header, img, h1, h2, h3, p, a, button, div') || target) as HTMLElement
      document.querySelectorAll('.is-editor-selected').forEach((node) => node.classList.remove('is-editor-selected'))
      editable.classList.add('is-editor-selected')

      const nextSelector = selectorFor(editable)
      const saved = readStore()[nextSelector] || defaultValues
      setSelected(editable)
      setSelector(nextSelector)
      setValues(saved)
      setOpen(true)
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.documentElement.classList.remove('floating-editor-active')
      document.removeEventListener('click', onClick, true)
    }
  }, [enabled])

  useEffect(() => {
    if (!selected || !selector) return
    applyValues(selected, values)
    const store = readStore()
    store[selector] = values
    writeStore(store)
  }, [selected, selector, values])

  if (!enabled) return null

  const update = (key: keyof EditorValues, value: number) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const resetSelected = () => {
    if (!selected || !selector) return
    clearValues(selected)
    const store = readStore()
    delete store[selector]
    writeStore(store)
    setValues(defaultValues)
  }

  const exportChanges = async () => {
    const text = JSON.stringify(readStore(), null, 2)
    await navigator.clipboard?.writeText(text)
    alert('השינויים הועתקו. אפשר לשמור אותם בצד או לשלוח למתכנת.')
  }

  const resetAll = () => {
    if (!confirm('למחוק את כל השינויים ששמרת בדפדפן?')) return
    Object.keys(readStore()).forEach((savedSelector) => {
      document.querySelectorAll<HTMLElement>(savedSelector).forEach(clearValues)
    })
    window.localStorage.removeItem(STORAGE_KEY)
    setSelected(null)
    setSelector('')
    setValues(defaultValues)
  }

  return (
    <aside className={`floating-editor ${open ? 'is-open' : ''}`} dir="rtl">
      <button className="floating-editor__tab" type="button" onClick={() => setOpen((current) => !current)}>
        עריכה
      </button>

      {open && (
        <div className="floating-editor__panel">
          <strong className="floating-editor__title">עורך האתר</strong>
          <p className="floating-editor__hint">
            לחצי על אלמנט באתר ואז הזיזי או שני גודל. השמירה היא בדפדפן שלך.
          </p>

          <div className="floating-editor__selected">
            {selected ? `נבחר: ${elementLabel(selected)}` : 'לא נבחר אלמנט'}
          </div>

          <label>
            ימינה / שמאלה
            <input type="range" min="-160" max="160" value={values.x} onChange={(event) => update('x', Number(event.target.value))} />
          </label>

          <label>
            למעלה / למטה
            <input type="range" min="-160" max="160" value={values.y} onChange={(event) => update('y', Number(event.target.value))} />
          </label>

          <label>
            גודל
            <input type="range" min="0.5" max="1.8" step="0.01" value={values.scale} onChange={(event) => update('scale', Number(event.target.value))} />
          </label>

          <label>
            שקיפות
            <input type="range" min="0.15" max="1" step="0.01" value={values.opacity} onChange={(event) => update('opacity', Number(event.target.value))} />
          </label>

          <label>
            רווח מעל
            <input type="range" min="-120" max="180" value={values.marginTop} onChange={(event) => update('marginTop', Number(event.target.value))} />
          </label>

          <label>
            רווח מתחת
            <input type="range" min="-120" max="180" value={values.marginBottom} onChange={(event) => update('marginBottom', Number(event.target.value))} />
          </label>

          <div className="floating-editor__actions">
            <button type="button" onClick={resetSelected} disabled={!selected}>
              איפוס נבחר
            </button>
            <button type="button" onClick={exportChanges}>
              ייצוא
            </button>
            <button type="button" onClick={resetAll}>
              איפוס הכל
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
