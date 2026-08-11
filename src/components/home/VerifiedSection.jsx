import { editorCards } from '../../data/content'

export default function VerifiedSection() {
  return <section className="verified-section" aria-labelledby="verified-title">
    <div className="section-heading compact"><div><p className="section-kicker" id="verified-title">Editor Verified</p></div><a href="#popular-posts">View All</a></div>
    <div className="card-grid">{editorCards.map((post, index) => <article className="article-card" key={post.title} style={{ '--item-delay': `${index * 90}ms` }}><div className="card-image"><img src={post.image} alt="" /><span>{post.tag}</span></div><div className="card-copy"><h3>{post.title}</h3><p>By {post.author} - 1 month ago</p></div></article>)}</div>
    <a className="discover-btn" href="#hand-picked">Discover More Top Content</a>
  </section>
}
