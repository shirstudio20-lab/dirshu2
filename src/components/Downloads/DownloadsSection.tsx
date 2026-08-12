import { fileDownloads } from '../../data/downloads'
import { FileDownloadIcon } from '../icons/FileDownloadIcon'
import './DownloadsSection.css'

type DownloadsSectionProps = {
  scale: number
  fluid: boolean
}

export function DownloadsSection(_props: DownloadsSectionProps) {
  return (
    <section id="downloads" className="downloads" aria-label="\u05e7\u05d1\u05e6\u05d9\u05dd \u05dc\u05d4\u05d5\u05e8\u05d3\u05d4">
      <div className="downloads__inner">
        <h2 className="downloads__heading">\u05e7\u05d1\u05e6\u05d9\u05dd \u05dc\u05d4\u05d5\u05e8\u05d3\u05d4</h2>

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
                <button
                  className="downloads__button"
                  type="button"
                  disabled
                  title="\u05d4\u05e7\u05d5\u05d1\u05e5 \u05d9\u05e2\u05dc\u05d4 \u05d1\u05e7\u05e8\u05d5\u05d1"
                >
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
