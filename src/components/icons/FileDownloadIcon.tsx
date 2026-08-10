/**
 * Document-with-a-download icon, used by every download button on the site.
 * Same stroke language as the rest of the icons: 24 box, 1.7 weight, round
 * joins, `currentColor` so a button decides its own colour.
 */
export function FileDownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      focusable="false"
    >
      <path d="M13.4 2.6H6.2a1.6 1.6 0 0 0-1.6 1.6v15.6a1.6 1.6 0 0 0 1.6 1.6h11.6a1.6 1.6 0 0 0 1.6-1.6V8.4Z" />
      <path d="M13.4 2.6v5.2a.6.6 0 0 0 .6.6h5.4" />
      <path d="M12 11.8v5.2m0 0 2.1-2.1M12 17l-2.1-2.1" />
    </svg>
  )
}
