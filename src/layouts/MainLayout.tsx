import { NavLink, Outlet } from 'react-router-dom'
import { siteNavigation, siteName } from '../constants/site'

export function MainLayout() {
  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Community newsroom</p>
          <h1>{siteName}</h1>
        </div>

        <nav aria-label="Primary">
          {siteNavigation.map((item) => (
            <NavLink key={item.label} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer" id="contact">
        <p>Built for a news-led NGO website with a clean, scalable React structure.</p>
      </footer>
    </div>
  )
}