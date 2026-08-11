import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { getPageContent } from '../data/content'

export default function ContentPage({ route }) {
  const page = getPageContent(route)
  return <div className="content-shell"><SiteHeader /><main className="content-main"><section className="content-hero"><p className="auth-kicker">{page.kicker}</p><h1>{page.title}</h1><p>{page.description}</p><a className="content-primary" href="#write">Start writing <span>&rarr;</span></a></section><section className="content-cards" aria-label={`${page.title} links`}>{page.cards.map(([title, description, href], index) => <a className="content-card" href={href} key={`${title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div><b>&rarr;</b></a>)}</section></main><SiteFooter /></div>
}
