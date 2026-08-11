  import { latestPosts } from '../../data/content'

export default function LatestSection() {
  return <section className="latest-section" id="latest" aria-labelledby="latest-title"><div className="center-heading"><h2 id="latest-title">Latest Posts</h2><p>Just published: See what's new from our writers.</p></div><div className="latest-list">{latestPosts.map(([title, category, date], index) => <article className="latest-item" key={title} style={{ '--item-delay': `${index * 55}ms` }}><div><span>{category}</span><h3>{title}</h3><p>{date} - 6 min read - 3 views</p></div><a href={`#latest-${index}`}>Read</a></article>)}</div></section>
}
  