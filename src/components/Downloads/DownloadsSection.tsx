import { fileDownloads } from '../../data/downloads'
import { FileDownloadIcon } from '../icons/FileDownloadIcon'
import { ScaledStage } from '../ScaledStage/ScaledStage'
import './DownloadsSection.css'

/** Height of the section on the 1920 canvas (nodes 52:1274 / 52:1431). */
export const DOWNLOADS_HEIGHT = 1060

type DownloadsSectionProps = {
  scale: number
  fluid: boolean
}

/**
 * Section "קבצים להורדה" (nodes 52:1274, 52:1431–52:1446).
 *
 * The cards come from `fileDownloads`; a card whose `fileUrl` is still empty
 * renders a disabled button rather than a made-up link.
 */
export function DownloadsSection({ scale, fluid }: DownloadsSectionProps) {
  return (
    <section id="downloads" className="downloads" aria-label="קבצים להורדה">
      <div className="downloads__background" aria-hidden="true" />

      <ScaledStage designHeight={DOWNLOADS_HEIGHT} scale={scale} fluid={fluid}>
        <div className="downloads__inner">
          {/* Node 52:1274 */}
          <h2 className="downloads__heading">קבצים להורדה</h2>

          {/* Node 52:1431 */}
          <ul className="downloads__grid">
            {fileDownloads.map((item) => (
              <li className="download-card" key={item.id}>
                <div className="download-card__preview">
                  {item.image ? <img src={item.image} alt="" /> : null}
                </div>

                {item.fileUrl ? (
                  <a className="download-card__cta" href={item.fileUrl} download>
                    <span className="download-card__icon">
                      <FileDownloadIcon />
                    </span>
                    {item.title}
                  </a>
                ) : (
                  <button
                    className="download-card__cta"
                    type="button"
                    disabled
                    title="הקובץ יעלה בקרוב"
                  >
                    <span className="download-card__icon">
                      <FileDownloadIcon />
                    </span>
                    {item.title}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ScaledStage>
    </section>
  )
}
