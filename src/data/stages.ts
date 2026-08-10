/**
 * The four states of section 2 ("מתורתו אנו חיים").
 *
 * State 1 is the section as drawn in Frame 5 (nodes 52:1276–52:1290).
 * States 2–4 come from Frame 14 (63:2358), which shows the same section
 * in its later scroll states. Frame 14 is drawn at 1.60462× the scale of
 * Frame 5, so every geometry value below has been converted back to the
 * 1920px canvas and expressed in the coordinate space of the stage group
 * (node 52:1280 — 454.98 × 693 at 1286.51, 1215).
 */

export type StageArtwork = {
  src: string
  left: number
  top: number
  width: number
  height: number
  /** Degrees, matching the rotation Figma applies to the layer. */
  rotate?: number
}

export type Stage = {
  id: string
  /** Hebrew date, node 52:1290 in state 1. */
  date: string
  /** Node 52:1279 in state 1. */
  title: string
  /** Node 52:1277 in state 1 — one entry per line break in the design. */
  subtitle: string[]
  /** Node 52:1276 in state 1. */
  body: string
  /** Circular thumbnail in the rail, nodes 52:1285–52:1288. */
  thumbnail: string
  /** Calligraphed date on the cover, node 52:1282 and its counterparts. */
  lettering: StageArtwork
  /** The volume standing in front of the cover. */
  book: StageArtwork
}

export const stages: Stage[] = [
  {
    id: 'mishna-berura',
    date: 'י"ד אלול',
    title: 'תחילת חלק ה’ במשנה ברורה',
    subtitle: ['במחזור השלישי', "של ה'דף היומי בהלכה'"],
    body: "רבבות הלומדים בארבע פינות העולם יחלו בלימוד חלק ה' ב'משנה ברורה', להוסיף דעת ולקבוע את ארחות חייהם על פיה, ולדעת את המעשה אשר יעשון ואת הדרך אשר ילכו בה",
    thumbnail: '/assets/step-thumb-1.png',
    lettering: { src: '/assets/date-yod-dalet-elul.png', left: 17.4, top: 61.28, width: 280.07, height: 188.282 },
    book: { src: '/assets/book-mishna-berura.png', left: 20.593, top: 255.472, width: 277.129, height: 419.378 },
  },
  {
    id: 'torat-chafetz-chaim',
    date: 'כ"ד אלול',
    title: 'יומא דהילולא דהאי סבא קדישא',
    subtitle: ["מרנא ה'חפץ חיים' זיע\"א"],
    body: "סט ספרי 'תורת החפץ חיים' מופיעים לראשונה במהדורה חדשה ומפוארת - י\"ח מספריו הקדושים שחיבר בקדשו, בתוספת מאות מראי מקומות, ניקוד ופיסוק מאירי עיניים - למען ירוץ בהם הלומד, ישמע חכם ויוסיף לקח, דעת ויראת ה'",
    thumbnail: '/assets/step-thumb-2.png',
    lettering: { src: '/assets/date-kaf-dalet-elul.png', left: 25.92, top: 70.42, width: 271.71, height: 182.6 },
    book: { src: '/assets/book-torat-chafetz-chaim.png', left: -58.75, top: 275.79, width: 367.88, height: 388.22 },
  },
  {
    id: 'sefer-hagiborim',
    date: 'כ"ו תשרי',
    title: 'מסע התפילה לראדין וחנוכת הבית',
    subtitle: ["'מתיבתא רבתא חפץ חיים' דראדין"],
    body: "משלחת רבני 'דרשו' ומרביצי תורה במסע תפילה מרגש בציונו הק', במסגרת חנוכת הבית של בניין 'מתיבתא רבתא חפץ חיים' בראדין לאחר שיקום מבנה הישיבה הקדושה ושחזור של פריטי הקודש ששימשו במקום שמשם יצאה תורה והוראה לישראל",
    thumbnail: '/assets/step-thumb-3.png',
    lettering: { src: '/assets/date-kaf-vav-tishrei.png', left: 20.31, top: 81.64, width: 276.7, height: 186.34 },
    book: { src: '/assets/book-sefer-hagiborim.png', left: -33.11, top: 269.69, width: 291.4, height: 400.32 },
  },
  {
    id: 'iyun-haamud',
    date: 'ז’ חשון',
    title: "רבבות לומדי ה'עמוד היומי' מתחילים בלימוד מסכת סוכה",
    subtitle: ['תחילת הלימוד מסכת סוכה'],
    body: "שלוש שנים לאחר ייסוד תכנית 'עמוד היומי' בהיכל הכנסייה הגדולה בווינה – במקום שבו נשא מרנא ה'חפץ חיים' זיע\"א את דבריו – יחלו רבבות בלימוד מסכת סוכה עם 'עיון העמוד', מתוך שאיפה לזכות לידיעת התורה בשלמותה",
    thumbnail: '/assets/step-thumb-4.png',
    // Figma reports the rotated bounding box (297.95 × 209.8 at 13.42, 56.2);
    // left/top below are re-centred for the unrotated 286.67 × 192.57 layer.
    lettering: { src: '/assets/date-zayin-cheshvan.png', left: 19.06, top: 64.82, width: 286.67, height: 192.57, rotate: 3.52 },
    book: { src: '/assets/book-iyun-haamud.png', left: -18.54, top: 245.94, width: 305.37, height: 441 },
  },
]
