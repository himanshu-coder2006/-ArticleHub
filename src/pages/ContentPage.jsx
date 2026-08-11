import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { getPageContent } from '../data/content'

export default function ContentPage({ route }) {
  const page = getPageContent(route)
  const routeKind = route.startsWith('category-') ? 'category' : ['privacy-policy', 'terms'].includes(route) ? 'legal' : ['faq', 'forgot-password'].includes(route) ? 'support' : 'editorial'
  const actionLabel = routeKind === 'category' ? 'Explore more stories' : routeKind === 'legal' ? 'Contact our team' : 'Start writing'
  return <div className={`content-shell content-shell--${routeKind}`}><SiteHeader /><main className="content-main"><section className="content-hero"><p className="auth-kicker">{page.kicker}</p><h1>{page.title}</h1><p>{page.description}</p><a className="content-primary" href={routeKind === 'legal' ? '#contact' : '#write'}>{actionLabel} <span>&rarr;</span></a></section><section className="content-cards" aria-label={`${page.title} links`}>{page.cards.map(([title, description, href], index) => <a className="content-card" href={href} key={`${title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div><b>&rarr;</b></a>)}</section></main><SiteFooter /></div>
}
