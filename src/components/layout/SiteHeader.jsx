import BrandLink from '../common/BrandLink'
import { navLinks } from '../../data/content'

export default function SiteHeader() {
  return (
    <header className="topbar">
      <BrandLink />
      <nav className="main-nav" aria-label="Primary navigation">
        {navLinks.filter((item) => item !== 'Submit').map((item) => <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <a className="submit-btn" href="#write">Submit</a>
        <a className="auth-login" href="#login">Log in</a>
        <a className="auth-signup" href="#signup">Sign up</a>
      </div>
    </header>
  )
}
