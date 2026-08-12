import { fileDownloads } from '../../data/downloads'
import { FileDownloadIcon } from '../icons/FileDownloadIcon'
import './DownloadsSection.css'

type DownloadsSectionProps = {
  scale: number
  fluid: boolean
}

const heading = "קבצים להורדה"
const soonTitle = "הקובץ יעלה בקרוב"

export function DownloadsSection(_props: DownloadsSectionProps) {
  return (
    <section id="downloads" className="downloads" aria-label={heading}>
      <div className="downloads__inner">
        <h2 className="downloads__heading">{heading}</h2>

        <ul className="downloads__list">
          {fileDownloads.map((item) => (
            <li className="downloads__item" key={item.id}>
              {item.fileUrl ? (
                <a className="downloads__button" href={item.fileUrl} download>
                  <span className="downloads__icon" aria-hidden="true">
                    <FileDownloadIcon />
                  </span>
                  <span>{item.title}</span>
                </a>
              ) : (
                <button className="downloads__button" type="button" disabled title={soonTitle}>
                  <span className="downloads__icon" aria-hidden="true">
                    <FileDownloadIcon />
                  </span>
                  <span>{item.title}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
