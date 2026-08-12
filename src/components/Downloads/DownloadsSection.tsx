import { fileDownloads } from '../../data/downloads'
import { DownloadButton } from '../DownloadButton/DownloadButton'
import './DownloadsSection.css'

type DownloadsSectionProps = {
  scale: number
  fluid: boolean
}

const heading = '\u05e7\u05d1\u05e6\u05d9\u05dd \u05dc\u05d4\u05d5\u05e8\u05d3\u05d4'
const soonTitle = '\u05d4\u05e7\u05d5\u05d1\u05e5 \u05d9\u05e2\u05dc\u05d4 \u05d1\u05e7\u05e8\u05d5\u05d1'

export function DownloadsSection(_props: DownloadsSectionProps) {
  return (
    <section id="downloads" className="downloads" aria-label={heading}>
      <div className="downloads__inner">
        <h2 className="downloads__heading">{heading}</h2>

        <ul className="downloads__list">
          {fileDownloads.map((item) => (
            <li className="downloads__item" key={item.id}>
              <DownloadButton href={item.fileUrl || undefined} disabledTitle={soonTitle}>
                {item.title}
              </DownloadButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
