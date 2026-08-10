import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  galleryColumnCount,
  galleryImages,
  splitIntoColumns,
  type GalleryImage,
} from '../../data/gallery'
import { SearchIcon } from '../icons/GalleryIcons'
import { Lightbox } from './Lightbox'
import './GallerySection.css'

/**
 * Section "ראדין בעין המצלמה".
 *
 * Vertical streams of photographs, each column drifting the opposite way to
 * its neighbour and looping seamlessly by carrying its list twice. Hovering a
 * column pauses that column alone; clicking a photograph opens it full size.
 */
export function GallerySection() {
  const [columnCount, setColumnCount] = useState(() =>
    typeof window === 'undefined' ? 5 : galleryColumnCount(window.innerWidth),
  )
  const [missing, setMissing] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const measure = () => setColumnCount(galleryColumnCount(window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // A photograph whose file is not in the project yet is left out rather than
  // rendered as a broken image.
  const available = useMemo(
    () => galleryImages.filter((image) => !missing.includes(image.src)),
    [missing],
  )

  const columns = useMemo(
    () => splitIntoColumns(available, columnCount),
    [available, columnCount],
  )

  const openImage = (image: GalleryImage) => {
    setLightboxIndex(available.findIndex((entry) => entry.src === image.src))
  }

  return (
    <section className="gallery" aria-label="ראדין בעין המצלמה">
      <div className="gallery__background" aria-hidden="true" />

      <div className="gallery__content">
        <h2 className="gallery__heading">ראדין בעין המצלמה</h2>

        <div className="gallery__columns">
          {columns.map((column, columnIndex) => (
            <div
              className={`gallery__column ${columnIndex % 2 === 0 ? 'is-down' : 'is-up'}`}
              key={columnIndex}
              style={{ '--duration': `${82 + columnIndex * 11}s` } as CSSProperties}
            >
              {/* The list is carried twice so the loop has no seam. */}
              <div className="gallery__track">
                {[...column, ...column].map((image, index) => (
                  <button
                    className={`gallery__item gallery__item--${image.weight}`}
                    key={`${image.src}-${index}`}
                    type="button"
                    // The second pass exists only to close the loop; it is
                    // hidden when the animation is switched off.
                    data-duplicate={index >= column.length ? '' : undefined}
                    aria-hidden={index >= column.length}
                    onClick={() => openImage(image)}
                    aria-label={image.title}
                  >
                    <img
                      src={image.src}
                      alt={image.alt ?? image.title}
                      loading="lazy"
                      onError={() =>
                        setMissing((current) =>
                          current.includes(image.src) ? current : [...current, image.src],
                        )
                      }
                    />
                    <span className="gallery__overlay">
                      <span className="gallery__zoom">
                        <SearchIcon />
                      </span>
                      <span className="gallery__title">{image.title}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          images={available}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </section>
  )
}
