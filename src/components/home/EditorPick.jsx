import { trending } from '../../data/content'

export default function EditorPick() {
  return <>
    <section className="editor-header" aria-labelledby="editor-title"><h1 id="editor-title">Editor's Pick</h1><p>Outstanding contributions from our authors.</p></section>
    <section className="hero-grid" aria-label="Featured content">
      <article className="featured-story">
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80" alt="Insurance brokers reviewing software reports" />
        <div className="featured-overlay"><span className="trend-badge">Trending</span><div className="featured-content"><div className="author-row"><span className="avatar">PH</span><span>Peter Hamilton</span><span>8 min read</span></div><h2>How Software Solutions Help Insurance Brokers Build Real-Time Quote Workflows</h2><p>Manual quoting slows teams down. Modern broker software connects systems, reduces handoffs and helps agencies respond faster.</p><div className="post-actions"><span>2 likes</span><a href="#article-quote-workflows">Read Full Story</a></div></div></div>
      </article>
      <aside className="trending-panel" aria-labelledby="trending-title"><h2 id="trending-title">Hot Right Now</h2><div className="trend-list">{trending.map(([number, title, category, comments]) => <a className="trend-item" href={`#article-${number}`} key={title}><span>{number}</span><div><small>{category}</small><strong>{title}</strong><em>{comments} comments</em></div></a>)}</div></aside>
    </section>
  </>
}
