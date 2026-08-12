import './LearningProgramsSection.css'

const text = {
  title: '\u05dc\u05d4\u05d9\u05de\u05e0\u05d5\u05ea \u05e2\u05dd \u05dc\u05d5\u05de\u05d3\u05d9 \u05ea\u05d5\u05e8\u05ea\u05d5',
  subtitle: "\u05de\u05e6\u05d8\u05e8\u05e4\u05d9\u05dd \u05dc\u05e8\u05d1\u05d1\u05d5\u05ea \u05dc\u05d5\u05de\u05d3\u05d9 '\u05d3\u05e8\u05e9\u05d5' \u05d1\u05db\u05dc \u05e8\u05d7\u05d1\u05d9 \u05ea\u05d1\u05dc",
  cta: '\u05d4\u05e6\u05d8\u05e8\u05e4\u05d5 \u05db\u05e2\u05ea:',
  israel: '\u05d3\u05e8\u05e9\u05d5 \u05d9\u05e9\u05e8\u05d0\u05dc',
  usa: '\u05d3\u05e8\u05e9\u05d5 \u05d0\u05e8\u05d4"\u05d1',
  europe: '\u05d3\u05e8\u05e9\u05d5 \u05d0\u05d9\u05e8\u05d5\u05e4\u05d4',
}

const programs = [
  {
    id: 'amud-yomi',
    title: '\u05d4\u05e2\u05de\u05d5\u05d3 \u05d4\u05d9\u05d5\u05de\u05d9',
    description:
      "\u05de\u05e1\u05d2\u05e8\u05ea \u05d9\u05d5\u05de\u05d9\u05ea \u05e2\u05e7\u05d1\u05d9\u05ea, \u05e2\u05dd '\u05e2\u05d9\u05d5\u05df \u05d4\u05e2\u05de\u05d5\u05d3', \u05d1\u05d3\u05e8\u05da \u05dc\u05d9\u05d3\u05d9\u05e2\u05d4 \u05d1\u05d4\u05d9\u05e8\u05d4 \u05d5\u05de\u05e1\u05d5\u05d3\u05e8\u05ea \u05e9\u05dc \u05de\u05e1\u05db\u05ea \u05e1\u05d5\u05db\u05d4.",
    bullets: [
      '\u05e2\u05de\u05d5\u05d3 \u05d2\u05de\u05e8\u05d0 \u05d1\u05d9\u05d5\u05dd',
      '\u05e2\u05d9\u05d5\u05df \u05e7\u05dc \u05d5\u05d1\u05d4\u05d9\u05e8',
      '\u05e7\u05d5\u05e0\u05d8\u05e8\u05e1 \u05de\u05e8\u05d0\u05d9 \u05de\u05e7\u05d5\u05de\u05d5\u05ea',
      '\u05dc\u05d9\u05de\u05d5\u05d3 \u05d9\u05d7\u05d9\u05d3\u05e0\u05d9 \u05d0\u05d5 \u05e7\u05d1\u05d5\u05e6\u05ea\u05d9',
    ],
  },
  {
    id: 'halacha-yomi',
    title: '\u05d4\u05d3\u05e3 \u05d4\u05d9\u05d5\u05de\u05d9 \u05d1\u05d4\u05dc\u05db\u05d4',
    description:
      '\u05d4\u05d6\u05d3\u05de\u05e0\u05d5\u05ea \u05de\u05d9\u05d5\u05d7\u05d3\u05ea \u05dc\u05d4\u05e6\u05d8\u05e8\u05e3 \u05dc\u05dc\u05d5\u05de\u05d3\u05d9\u05dd \u05d4\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05e7\u05d1\u05d5\u05e2 \u05d0\u05ea \u05d0\u05d5\u05e8\u05d7\u05d5\u05ea \u05d7\u05d9\u05d9\u05d4\u05dd \u05e2\u05dc \u05e4\u05d9 \u05d4\u05d4\u05dc\u05db\u05d4.',
    bullets: [
      '\u05d3\u05e3 \u05d0\u05d7\u05d3 \u05dc\u05d9\u05d5\u05dd',
      '\u05d7\u05de\u05d9\u05e9\u05d4 \u05d9\u05de\u05d9 \u05dc\u05d9\u05de\u05d5\u05d3 \u05d1\u05e9\u05d1\u05d5\u05e2',
      '\u05de\u05d1\u05d7\u05df \u05d7\u05d5\u05d3\u05e9\u05d9 \u05d1\u05e9\u05d9\u05d8\u05d4 \u05d0\u05de\u05e8\u05d9\u05e7\u05d0\u05d9\u05ea',
      '\u05e7\u05e8\u05d5\u05d1 \u05dc\u05be1,000 \u05de\u05d5\u05e7\u05d3\u05d9 \u05d1\u05d7\u05d9\u05e0\u05d4',
    ],
  },
]

const ctaLinks = [
  { id: 'israel', label: text.israel, href: '#' },
  { id: 'usa', label: text.usa, href: '#' },
  { id: 'europe', label: text.europe, href: '#' },
]

export function LearningProgramsSection() {
  return (
    <section className="learning-programs" aria-label={text.title}>
      <div className="learning-programs__inner">
        <h2 className="learning-programs__heading">{text.title}</h2>
        <p className="learning-programs__subtitle">{text.subtitle}</p>

        <div className="learning-programs__cards">
          {programs.map((program) => (
            <article className="learning-programs__card" key={program.id}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <ul>
                {program.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="learning-programs__cta-label">{text.cta}</p>
        <div className="learning-programs__actions" aria-label={text.cta}>
          {ctaLinks.map((link) => (
            <a className="learning-programs__button" href={link.href} key={link.id}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
