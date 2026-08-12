import type { ReactNode } from 'react'
import { FileDownloadIcon } from '../icons/FileDownloadIcon'
import './DownloadButton.css'

type DownloadButtonProps = {
  children: ReactNode
  href?: string
  disabledTitle?: string
}

export function DownloadButton({ children, href, disabledTitle }: DownloadButtonProps) {
  const content = (
    <>
      <span className="download-button__icon" aria-hidden="true">
        <FileDownloadIcon />
      </span>
      <span className="download-button__text">{children}</span>
    </>
  )

  if (href) {
    return (
      <a className="download-button" href={href} download>
        {content}
      </a>
    )
  }

  return (
    <button className="download-button" type="button" disabled title={disabledTitle}>
      {content}
    </button>
  )
}
