import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { articlePages, authors } from '../data/content'

export default function AuthorPage({ index }) {
  const [initials, name, bio] = authors[index] || authors[0]
  const stories = Object.entries(articlePages).slice(0, 3)
  return <div className="author-page"><SiteHeader /><main className="author-profile"><header className="author-profile-hero"><span>{initials}</span><div><p>ArticleHub contributor</p><h1>{name}</h1><h2>{bio}</h2><div><b>12</b><small>Articles published</small><b>4.8k</b><small>Reader reactions</small></div></div><a href="#write">Follow author</a></header><section className="author-stories"><p>From {name.split(' ')[0]}</p><h2>Recent stories</h2>{stories.map(([slug, [title, topic, summary]]) => <a href={`#article-${slug}`} key={slug}><span>{topic}</span><h3>{title}</h3><p>{summary}</p><small>Read article &rarr;</small></a>)}</section></main><SiteFooter /></div>
}
