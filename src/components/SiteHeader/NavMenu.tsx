import { navItems } from '../../data/navigation'

/** Node 52:1256 — 930 × 24, 24px gap, Atlas Regular 20px, white. */
export function NavMenu() {
  return (
    <nav className="site-header__nav" aria-label="ניווט ראשי">
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li className="nav-menu__item" key={item.label}>
            <a className="nav-menu__link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
