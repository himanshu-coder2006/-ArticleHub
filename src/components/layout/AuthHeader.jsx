import BrandLink from '../common/BrandLink'

export default function AuthHeader({ backLabel = 'Back to articles' }) {
  return (
    <header className="auth-header">
      <BrandLink />
      <a className="auth-back-link" href="#home">&larr; {backLabel}</a>
    </header>
  )
}
