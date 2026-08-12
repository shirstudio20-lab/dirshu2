import './TorahLessonsSection.css'

const text = {
  "title": "שיעורי תורה לאלפים ולרבבות",
  "body": "מדי יום מתקיימים אלפי שיעורים בכל רחבי תבל הנמסרים על פי סדרי הלימוד בתוכניות הדף היומי בהלכה ועמוד היומי",
  "label": "רישום לפתיחת שיעורים:",
  "israel": "דרשו ישראל",
  "usa": "דרשו ארה\"ב",
  "europe": "דרשו אירופה",
  "imageAlt": "ספרי שיעורי דרשו"
}

const signupLinks = [
  { id: 'israel', label: text.israel, href: '#' },
  { id: 'usa', label: text.usa, href: '#' },
  { id: 'europe', label: text.europe, href: '#' },
]

export function TorahLessonsSection() {
  return (
    <section className="torah-lessons" aria-label={text.title}>
      <div className="torah-lessons__content">
        <div className="torah-lessons__copy">
          <h2 className="torah-lessons__heading">{text.title}</h2>

          <p className="torah-lessons__body">{text.body}</p>

          <p className="torah-lessons__label">{text.label}</p>

          <div className="torah-lessons__actions" aria-label={text.label}>
            {signupLinks.map((link) => (
              <a className="torah-lessons__button" href={link.href} key={link.id}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="torah-lessons__artwork" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}assets/book-torat-chafetz-chaim.png`}
            alt={text.imageAlt}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
