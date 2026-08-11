import BrandLink from '../common/BrandLink'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <BrandLink footer />
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#home">Home</a><a href="#write">Submit</a><a href="#faq">FAQ</a><a href="#privacy-policy">Privacy Policy</a><a href="#terms">Terms</a><a href="#contact">Contact</a>
        </nav>
        <div className="footer-socials" aria-label="Social links"><a href="#social-x" aria-label="X">X</a><a href="#social-facebook" aria-label="Facebook">f</a><a href="#social-linkedin" aria-label="LinkedIn">in</a></div>
      </div>
      <p className="footer-copy">&copy; 2009-2026 ArticleHub. All rights reserved.</p>
    </footer>
  )
}
