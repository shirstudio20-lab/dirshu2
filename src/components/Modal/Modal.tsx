import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** Optional line under the title. */
  description?: ReactNode
}

/**
 * Reusable dialog: dark overlay, ESC and click-outside to close, focus moved
 * into the panel and the page behind it locked while it is open.
 */
export function Modal({ open, onClose, title, children, description }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingInlineEnd

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('input, button, [tabindex]')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
      body.style.paddingInlineEnd = previousPadding
    }
  }, [open, onClose])

  if (!open) return null

  // Deliberately no backdrop click: the dialog closes on the button or ESC.
  return createPortal(
    <div className="modal">
      <div className="modal__panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className="modal__close" type="button" aria-label="סגירה" onClick={onClose}>
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path
              d="M7 7 L17 17 M17 7 L7 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="modal__title" id={titleId}>
          {title}
        </h2>
        {description ? <div className="modal__description">{description}</div> : null}

        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
