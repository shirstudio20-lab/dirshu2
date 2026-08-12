import './TorahLessonsSection.css'

const text = {
  title: '\u05e9\u05d9\u05e2\u05d5\u05e8\u05d9 \u05ea\u05d5\u05e8\u05d4\n\u05dc\u05d0\u05dc\u05e4\u05d9\u05dd \u05d5\u05dc\u05e8\u05d1\u05d1\u05d5\u05ea',
  body: '\u05de\u05d3\u05d9 \u05d9\u05d5\u05dd \u05de\u05ea\u05e7\u05d9\u05d9\u05de\u05d9\u05dd \u05d0\u05dc\u05e4\u05d9 \u05e9\u05d9\u05e2\u05d5\u05e8\u05d9\u05dd \u05d1\u05db\u05dc \u05e8\u05d7\u05d1\u05d9 \u05ea\u05d1\u05dc\n\u05d4\u05e0\u05de\u05e1\u05e8\u05d9\u05dd \u05e2\u05dc \u05e4\u05d9 \u05e1\u05d3\u05e8\u05d9 \u05d4\u05dc\u05d9\u05de\u05d5\u05d3 \u05d1\u05ea\u05d5\u05db\u05e0\u05d9\u05d5\u05ea \u05d4\u05d3\u05e3\n\u05d4\u05d9\u05d5\u05de\u05d9\n\u05d1\u05d4\u05dc\u05db\u05d4 \u05d5\u05e2\u05de\u05d5\u05d3 \u05d4\u05d9\u05d5\u05de\u05d9',
  label: '\u05e8\u05d9\u05e9\u05d5\u05dd \u05dc\u05e4\u05ea\u05d9\u05d7\u05ea \u05e9\u05d9\u05e2\u05d5\u05e8\u05d9\u05dd:',
  israel: '\u05d3\u05e8\u05e9\u05d5 \u05d9\u05e9\u05e8\u05d0\u05dc',
  usa: '\u05d3\u05e8\u05e9\u05d5 \u05d0\u05e8\u05d4"\u05d1',
  europe: '\u05d3\u05e8\u05e9\u05d5 \u05d0\u05d9\u05e8\u05d5\u05e4\u05d4',
  imageAlt: '\u05e1\u05e4\u05e8\u05d9 \u05e9\u05d9\u05e2\u05d5\u05e8\u05d9 \u05d3\u05e8\u05e9\u05d5',
}

const signupLinks = [
  { id: 'israel', label: text.israel, href: '#' },
  { id: 'usa', label: text.usa, href: '#' },
  { id: 'europe', label: text.europe, href: '#' },
]

export function TorahLessonsSection() {
  return (
    <section className="torah-lessons" aria-label={text.title.replace('\n', ' ')}>
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

        <div className="torah-lessons__artwork">
          <img
            src={`${import.meta.env.BASE_URL}assets/torah-lessons-books-frame-68.png`}
            alt={text.imageAlt}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
