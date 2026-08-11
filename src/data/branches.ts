/**
 * Section 5 — Dirshu branches plotted over the globe artwork (node 52:1469).
 *
 * `x` / `y` are percentages of the globe container, so a marker stays on its
 * spot however the globe is scaled. They started from the marker positions
 * the designer placed on the artwork (nodes 52:1533–52:1565) and have since
 * been spread out — no two markers are now closer than 8.5% of the globe, so
 * the European group in particular no longer crowds — while each stays in its
 * own region of the sphere.
 *
 * Contact details are used exactly as supplied.
 */

export type Branch = {
  id: string
  location: string
  contactName?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  /** Percent of the globe container, from its left edge. */
  x: number
  /** Percent of the globe container, from its top edge. */
  y: number
}

/** No card is open until a marker is chosen; kept for links into a branch. */
export const DEFAULT_BRANCH_ID = 'panama'

export const branches: Branch[] = [
  {
    id: 'global',
    location: 'דרשו גלובל',
    contactName: 'ההנהלה העולמית – משרד ראשי',
    address: 'הרטום 7, ירושלים',
    website: 'https://dirshuglobal.org',
    email: 'dirshu@dirshuglobal.org',
    x: 64,
    y: 34,
  },
  {
    id: 'israel',
    location: 'ישראל',
    contactName: 'משרד ראשי',
    address: 'הקבלן 45, ירושלים',
    phone: '+97225609000',
    email: 'Dirshu@Dirshu.co.il',
    x: 73,
    y: 33,
  },
  {
    id: 'usa',
    location: 'ארה"ב',
    contactName: 'משרד ראשי',
    phone: '+173298793948',
    email: 'info@DirshuNJ.org',
    x: 16,
    y: 27,
  },
  {
    id: 'europe',
    location: 'אירופה',
    contactName: 'משרד ראשי',
    phone: '+442080502615',
    email: 'office@dirshu.co.uk',
    x: 36,
    y: 8,
  },
  {
    id: 'austria',
    location: 'אוסטריה',
    contactName: 'הרב עמנואל זילבערמאן',
    phone: '43676848044728',
    email: 'dirshuien@gmail.com',
    x: 62,
    y: 15,
  },
  {
    id: 'france',
    location: 'צרפת',
    contactName: 'הרב נפתלי לוי',
    phone: '+33679062160',
    email: 'dirshufr@gmail.com',
    x: 35,
    y: 21,
  },
  {
    id: 'rome',
    location: 'רומא',
    contactName: 'הרב נחמיה גולדשמיט',
    phone: '+393516090226',
    email: 'n548538234@gmail.com',
    x: 56,
    y: 31,
  },
  {
    id: 'mexico',
    location: 'מקסיקו',
    contactName: 'הרב משה פרץ',
    phone: '+43676848044728',
    email: 'dirshuien@gmail.com',
    x: 6,
    y: 38,
  },
  {
    id: 'canada',
    location: 'קנדה',
    contactName: 'הרב מאיר אייזנטל',
    phone: '+4163196299',
    email: 'eizentalm@davpart.com',
    x: 7,
    y: 16,
  },
  {
    id: 'gibraltar',
    location: "ג'יבלטר",
    contactName: 'הרב יצחק לוי',
    phone: '+35058009479',
    email: 'lisaac.levy@hassans.gi',
    x: 28,
    y: 32,
  },
  {
    id: 'venezuela',
    location: 'ונוצואלה',
    contactName: 'הרב יעקב בן כליפה',
    phone: '+582123151794',
    email: 'benkalifar@gmail.com',
    x: 20,
    y: 60,
  },
  {
    id: 'panama',
    location: 'פנמה',
    contactName: 'הרב גבריאל חזקיה',
    phone: '+50766788088',
    email: 'librosmarr@gmail.com',
    x: 11,
    y: 50,
  },
  {
    id: 'netherlands',
    location: 'הולנד',
    contactName: 'הרב יונתן סיגל',
    phone: '+1686225838',
    email: 'sigaljj@hotmail.com',
    x: 45,
    y: 3,
  },
  {
    id: 'brazil',
    location: 'ברזיל',
    contactName: 'הרב חיים זאב טלנברג',
    phone: '+5511966701441',
    email: 'dirshubrasil@gmail.com',
    x: 28,
    y: 74,
  },
  {
    id: 'argentina',
    location: 'ארגנטינה',
    contactName: 'הרב דניאל כהן',
    phone: '+54911536418397',
    email: 'dirshuargentina@gmail.com',
    x: 19,
    y: 86,
  },
  {
    id: 'south-africa',
    location: 'דרום אפריקה',
    contactName: 'הרב דניאל ברט',
    phone: '+27824913375',
    email: 'rabbibrett@gmail.com',
    x: 60,
    y: 76,
  },
  {
    id: 'hungary',
    location: 'הונגריה',
    contactName: 'הרב דוד קלטי',
    phone: '+3767098048277',
    email: 'keletid@gmail.com',
    x: 71,
    y: 24,
  },
  {
    id: 'switzerland',
    location: 'שוויץ',
    contactName: 'הרב דוד גוטמן',
    phone: '430786338888',
    email: 'd.gutmann@wohnplus.ch',
    x: 49,
    y: 22,
  },
  {
    id: 'belarus',
    location: 'בלארוס',
    contactName: 'הרב אפרים אהרן ביניק',
    phone: '+97239122721',
    email: 'eabinik@gmail.com',
    x: 73,
    y: 5,
  },
  {
    id: 'ukraine',
    location: 'אוקראינה',
    contactName: 'הרב אהרון מוטוז',
    phone: '+380635625454',
    email: 'aaron.motus@gmail.com',
    x: 80,
    y: 14,
  },
  {
    id: 'belgium',
    location: 'בלגיה',
    contactName: 'הרב אברהם דוד קנופלר',
    phone: '+32489791363',
    email: 'adknofler@gmail.com',
    x: 44,
    y: 12,
  },
  {
    id: 'berlin',
    location: 'ברלין',
    contactName: 'הרב אבי קנטור',
    phone: '+4917632707543',
    email: 'aviezer7700@gmail.com',
    x: 56,
    y: 6,
  },
  {
    id: 'australia',
    location: 'אוסטרליה',
    contactName: 'הרב אבא לוין',
    phone: '+61401567358',
    email: 'alevin@yht.vic.edu.au',
    x: 88,
    y: 66,
  },
]
