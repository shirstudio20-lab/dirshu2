import { platforms } from '../../data/platforms'
import './PlatformsSection.css'

/**
 * Closing section — the listening platforms, the verse, and the footer strip
 * beneath them (nodes 52:1246–52:1306).
 *
 * The logos come from `data/platforms.ts`; each already carries its own white
 * disc, so nothing is drawn behind them. Adding a `url` turns an item into a
 * link without any change here.
 */
export function PlatformsSection() {
  return (
    <>
      <section className="platforms" aria-label="כל הפלטפורמות להאזנה לשיעורי דרשו">
        <div className="platforms__background" aria-hidden="true" />

        <div className="platforms__content">
          {/* Node 52:1305 */}
          <h2 className="platforms__heading">כל הפלטפורמות להאזנה לשיעורי דרשו</h2>

          {/* Node 52:1307 — laid out left to right, as in the design. */}
          <ul className="platforms__list">
            {platforms.map((platform) => {
              // A phone number has to dial in place; a website opens away from
              // the page. Everything else about the two is identical.
              const isCall = platform.url.startsWith('tel:')

              return (
                <li className="platforms__item" key={platform.id}>
                  {/* The anchor is the whole disc, not the artwork inside it. */}
                  {platform.url ? (
                    <a
                      className="platforms__button"
                      href={platform.url}
                      target={isCall ? undefined : '_blank'}
                      rel={isCall ? undefined : 'noreferrer noopener'}
                      aria-label={platform.alt}
                    >
                      <img src={platform.image} alt="" loading="lazy" />
                    </a>
                  ) : (
                    <span className="platforms__button">
                      <img src={platform.image} alt={platform.alt} loading="lazy" />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Nodes 52:1327 with the rules of 52:1328 / 52:1329 either side. */}
          <blockquote className="platforms__quote">
            <p className="platforms__quote-line">
              <span>כִּי שִׂפְתֵי כֹהֵן יִשְׁמְרוּ דַּעַת וְתוֹרָה יְבַקְשׁוּ מִפִּיהוּ</span>
            </p>
            <p>כִּי מַלְאַךְ ה' צְבָא-וֹת הוּא</p>
          </blockquote>
        </div>
      </section>

      {/* Nodes 52:1248 / 52:1306 */}
      <footer className="site-footer">
        <a
          className="site-footer__credit"
          href="https://www.shirstudio.co.il/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>עיצוב ופיתוח: סטודיו שיר</span>
          <img src="/assets/shir-studio.svg" alt="" width={63} height={28} />
        </a>
      </footer>
    </>
  )
}
