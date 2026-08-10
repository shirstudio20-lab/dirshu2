/** Node 52:1253 — 80 × 44: 44px flag on the left, "EN" on the right. */
export function LanguageSwitcher() {
  return (
    <button className="language-switcher" type="button" aria-label="Switch language to English">
      <span className="language-switcher__flag">
        <img src="/assets/flag-en.png" alt="" width={44} height={44} />
      </span>
      <span className="language-switcher__label">EN</span>
    </button>
  )
}
