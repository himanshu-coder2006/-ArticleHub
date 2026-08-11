import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { articlePages, authors, latestPosts, picks, topicCatalog } from '../data/content'

const articles = Object.entries(articlePages).map(([slug, [title, topic, summary]]) => ({ slug, title, topic, summary }))

function TopicGrid() {
  return <div className="topic-grid">{topicCatalog.map(([name, description], index) => <a href={`#category-${name.toLowerCase().replaceAll(' & ', '-and-').replaceAll(' ', '-')}`} className="topic-tile" key={name}><span>{String(index + 1).padStart(2, '0')}</span><h2>{name}</h2><p>{description}</p><b>Explore &rarr;</b></a>)}</div>
}

function ArticleFeed({ posts, latest = false }) {
  return <div className="article-feed">{posts.map((post, index) => {
    const article = Array.isArray(post) ? { title: post[0], topic: post[1], date: post[2], summary: 'A practical original story from the ArticleHub community.', slug: `latest-${index}` } : post
    return <article className="feed-card" key={article.slug || article.title}><div className="feed-number">{String(index + 1).padStart(2, '0')}</div><div><span>{article.topic}</span><h2>{article.title}</h2><p>{article.summary}</p><small>{latest ? article.date : 'ArticleHub editorial selection'} · 6 min read</small></div><a href={`#${article.slug?.startsWith('latest-') ? article.slug : `article-${article.slug}`}`}>Read story &rarr;</a></article>
  })}</div>
}

function ResourceList({ directory = false }) {
  const items = directory
    ? [['Technology services', 'Find practical partners for web, systems and digital operations.'], ['Creative & marketing', 'Explore branding, design and communications expertise.'], ['Professional services', 'Connect with finance, legal and business support specialists.'], ['Home & property', 'Discover services for property, construction and improvement.']]
    : [['Article writing guide', 'Learn how to structure an article with a useful idea and a clear point of view.'], ['Contributor standards', 'See what we look for in accurate, original and reader-friendly submissions.'], ['Writing toolkit', 'Use practical editing prompts before you submit your work.'], ['Community FAQ', 'Find answers about accounts, articles and editorial review.']]
  return <div className="resource-grid">{items.map(([title, description], index) => <article className="resource-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{description}</p><a href={directory ? '#contact' : index === 3 ? '#faq' : '#write'}>{directory ? 'Contact us' : 'Open guide'} &rarr;</a></article>)}</div>
}

function AuthorGrid() {
  return <div className="profile-grid">{authors.map(([initials, name, bio], index) => <article className="profile-card" key={name}><span>{initials}</span><div><h2>{name}</h2><p>{bio}</p><a href={`#author-${index}`}>View profile &rarr;</a></div></article>)}</div>
}

export default function DiscoveryPage({ type }) {
  const config = {
    topics: ['Topics', 'Explore ideas across every interest.', 'Choose a topic to discover original, practical perspectives from ArticleHub writers.'],
    latest: ['Latest posts', 'Fresh ideas, published recently.', 'New stories and useful perspectives from the ArticleHub community.'],
    'popular-posts': ['Popular posts', 'The stories readers are returning to.', 'Editor-selected stories that have started a conversation this week.'],
    resources: ['Writer resources', 'Make your next article stronger.', 'Guides and support for writers who want their ideas to be clear, helpful and original.'],
    'business-directory': ['Business directory', 'Find practical expertise.', 'A carefully organised place to start exploring services for modern work and life.'],
    authors: ['Our authors', 'Meet the people behind the ideas.', 'Writers sharing useful experience, original viewpoints and thoughtful stories.'],
  }[type]

  let body = <TopicGrid />
  if (type === 'latest') body = <ArticleFeed posts={latestPosts} latest />
  if (type === 'popular-posts') body = <ArticleFeed posts={[...articles, ...picks.map((post, index) => ({ ...post, slug: `pick-${index}`, summary: `An editor-selected story by ${post.author}.` }))]} />
  if (type === 'resources') body = <ResourceList />
  if (type === 'business-directory') body = <ResourceList directory />
  if (type === 'authors') body = <AuthorGrid />

  return <div className="discovery-shell"><SiteHeader /><main className="discovery-main"><header className="discovery-hero"><p>{config[0]}</p><h1>{config[1]}</h1><span>{config[2]}</span></header>{body}</main><SiteFooter /></div>
}
