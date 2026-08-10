import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { ChevronIcon, CloseIcon } from '../icons/GalleryIcons'

export type LightboxImage = {
  src: string
  title: string
  alt?: string
}

type LightboxProps = {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Full-size view of one photograph: dark overlay, ESC and click-outside to
 * close, arrows and arrow keys to move through the set, and the page behind
 * it locked while it is open.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const image = images[index]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      // The gallery reads right to left, so the arrows are mirrored.
      if (event.key === 'ArrowLeft') onNavigate((index + 1) % images.length)
      if (event.key === 'ArrowRight') onNavigate((index - 1 + images.length) % images.length)
    }

    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingInlineEnd

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
      body.style.paddingInlineEnd = previousPadding
    }
  }, [index, images.length, onClose, onNavigate])

  if (!image) return null

  return createPortal(
    <div
      className="lightbox"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox__panel" role="dialog" aria-modal="true" aria-label={image.title}>
        <button className="lightbox__close" type="button" aria-label="סגירה" onClick={onClose}>
          <CloseIcon />
        </button>

        <figure className="lightbox__figure">
          <img src={image.src} alt={image.alt ?? image.title} />
          <figcaption className="lightbox__caption">{image.title}</figcaption>
        </figure>

        {images.length > 1 ? (
          <>
            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              aria-label="התמונה הבאה"
              onClick={() => onNavigate((index + 1) % images.length)}
            >
              <ChevronIcon direction="next" />
            </button>
            <button
              className="lightbox__nav lightbox__nav--previous"
              type="button"
              aria-label="התמונה הקודמת"
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            >
              <ChevronIcon direction="previous" />
            </button>
          </>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
