import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { articlePages, picks } from '../data/content'

const images = {
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85',
  Business: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85',
  'Home & Garden': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1600&q=85',
  'Self Improvement': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85',
}

export default function ArticlePage({ slug }) {
  const [title, topic, summary] = articlePages[slug] || articlePages['quote-workflows']
  const image = images[topic] || images.Technology
  return <div className="article-page"><SiteHeader /><main><header className="article-hero"><a href={`#category-${topic.toLowerCase().replaceAll(' & ', '-and-').replaceAll(' ', '-')}`}>{topic}</a><h1>{title}</h1><p>{summary}</p><div className="article-meta"><span className="article-avatar">AH</span><span><b>ArticleHub Editorial</b><small>August 2026 · 6 min read</small></span></div></header><img className="article-cover" src={image} alt="" /><div className="article-layout"><aside className="article-side"><span>Share this idea</span><a href="#social-linkedin">in</a><a href="#social-facebook">f</a><a href="#social-x">X</a></aside><article className="article-body"><p className="article-lead">The most useful changes tend to begin with an honest look at what is already happening. This article offers a practical place to start, without overcomplicating the work.</p><p>{summary} Instead of searching for a perfect solution, focus on the next improvement that will make a real difference for the people involved.</p><h2>Start with the real situation</h2><p>Good decisions are easier when the goal is clear. Notice where time, attention or energy is being lost, then name the outcome you want to create. A small, well-defined problem gives you something concrete to improve.</p><blockquote>Progress feels more sustainable when the process is simple enough to repeat.</blockquote><h2>Choose the smallest useful step</h2><p>You do not need to redesign everything at once. Pick one action that is easy to understand, invite the right people into the conversation and learn from what happens next. Consistent small choices often create the strongest long-term result.</p><h2>Make the idea part of your routine</h2><p>Once a helpful change works, document it in a way that makes it easy to return to. Share what you learned, keep the language clear and leave room for people to improve the approach over time.</p></article></div><section className="related-stories"><p>Keep exploring</p><h2>More useful stories</h2><div>{picks.map((post, index) => <a href={`#pick-${index}`} key={post.title}><img src={post.image} alt="" /><span>{post.tag}</span><h3>{post.title}</h3><small>Read story &rarr;</small></a>)}</div></section></main><SiteFooter /></div>
}
