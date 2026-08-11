import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { articlePages, latestPosts, picks, topicCatalog } from '../data/content'

const articles = Object.entries(articlePages).map(([slug, [title, topic, summary]]) => ({ slug, title, topic, summary }))

const categorySlug = (name) => name.toLowerCase().replaceAll(' & ', '-and-').replaceAll(' ', '-')

function TopicExplorer() {
  return <>
    <section className="topic-welcome" aria-label="Topic directory introduction">
      <div className="topic-welcome-copy"><span>ArticleHub topic directory</span><h2>Follow the questions that move you forward.</h2><p>From practical work ideas to better everyday habits, each topic is a curated starting point for useful reading.</p><a href="#latest">See the latest stories <b>&rarr;</b></a></div>
      <div className="topic-welcome-stats" aria-label="Topic directory statistics"><div><b>{topicCatalog.length}</b><span>topics to explore</span></div><div><b>100%</b><span>original perspectives</span></div><div><b>New</b><span>stories each week</span></div></div>
    </section>
    <section className="topic-spotlight" aria-label="Topic guide">
      <div><span>Choose a direction</span><h2>Every good read begins with a curious question.</h2></div>
      <p>Browse by subject, find a practical point of view, then follow the ideas that feel most relevant to you.</p>
    </section>
    <section className="topic-explorer-grid" aria-label="Browse all topics">
      {topicCatalog.map(([name, description], index) => <a href={`#category-${categorySlug(name)}`} className="topic-explorer-card" key={name}>
        <div className="topic-card-heading"><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true">{name.charAt(0)}</i></div><h2>{name}</h2><p>{description}</p><b>Explore topic <i aria-hidden="true">&rarr;</i></b>
      </a>)}
    </section>
  </>
}

function LatestTimeline() {
  return <section className="latest-timeline" aria-label="Latest published stories">
    <div className="timeline-intro"><span>August 2026</span><p>Fresh perspectives, added as they arrive.</p></div>
    <div className="timeline-list">{latestPosts.map(([title, topic, date], index) => <article className="timeline-story" key={title}>
      <time dateTime="2026-08-01">{date.replace('Aug ', '')}<small>Aug</small></time>
      <div className="timeline-marker" aria-hidden="true"></div>
      <div><span>{topic}</span><h2>{title}</h2><p>A timely, practical story selected from the ArticleHub community.</p><a href={`#latest-${index}`}>Open story <b>&rarr;</b></a></div>
    </article>)}</div>
  </section>
}

function PopularStories() {
  const stories = [...articles, ...picks.map((post, index) => ({ ...post, slug: `pick-${index}`, summary: `An editor-selected story by ${post.author}.` }))]
  return <section className="popular-layout" aria-label="Popular stories">
    <div className="popular-leaders">{stories.slice(0, 3).map((story, index) => <a href={`#${story.slug.startsWith('pick-') ? story.slug : `article-${story.slug}`}`} className="popular-leader" key={story.slug}>
      <span>0{index + 1}</span><small>{story.topic}</small><h2>{story.title}</h2><p>{index === 0 ? 'Most discussed this week' : `${12 - index * 3} reader conversations`}</p>
    </a>)}</div>
    <div className="popular-list"><header><span>More to read</span><p>Stories gaining momentum</p></header>{stories.slice(3).map((story, index) => <a href={`#${story.slug.startsWith('pick-') ? story.slug : `article-${story.slug}`}`} key={story.slug}><b>{String(index + 4).padStart(2, '0')}</b><div><small>{story.topic}</small><h2>{story.title}</h2></div><i aria-hidden="true">&rarr;</i></a>)}</div>
  </section>
}

function ResourceLibrary() {
  const guides = [
    ['01', 'Plan your point of view', 'A simple method for turning an interesting topic into a useful reader promise.', '#write'],
    ['02', 'Shape a clearer draft', 'Use a dependable structure that carries your reader from the opening to the takeaway.', '#write'],
    ['03', 'Prepare for review', 'A practical pre-submission checklist for original, accurate and well-presented work.', '#write'],
    ['04', 'Get community help', 'Find answers to common questions about publishing and your ArticleHub account.', '#faq'],
  ]
  return <section className="resource-library" aria-label="Writer resources"><aside><span>Writer toolkit</span><h2>Build a writing practice that lasts.</h2><p>Short, useful guidance for every stage of your next article.</p><a href="#write">Submit an article &rarr;</a></aside><div>{guides.map(([number, title, description, href]) => <a href={href} className="resource-guide" key={title}><span>{number}</span><h2>{title}</h2><p>{description}</p><b>Read guide &rarr;</b></a>)}</div></section>
}

function DirectoryGrid() {
  const services = [['Digital & technology', 'Web, systems, security and digital operations.', '24'], ['Creative & marketing', 'Brand, content, design and growth expertise.', '18'], ['Professional services', 'Finance, legal and business support partners.', '16'], ['Home & property', 'Property, construction and improvement specialists.', '21']]
  return <section className="directory-layout" aria-label="Business service categories"><header><span>Browse by need</span><p>Find a capable starting point for your next project.</p></header><div>{services.map(([title, description, count], index) => <a href="#contact" className="directory-category" key={title}><span>0{index + 1}</span><small>{count} categories</small><h2>{title}</h2><p>{description}</p><b>Explore directory &rarr;</b></a>)}</div><footer><p>Looking for something specific?</p><a href="#contact">Tell us what you need <b>&rarr;</b></a></footer></section>
}

const pageConfig = {
  topics: { eyebrow: 'Explore topics', title: 'Find an idea worth following.', description: 'Original stories and practical perspectives, organised around the things you care about.', body: <TopicExplorer /> },
  latest: { eyebrow: 'Fresh from ArticleHub', title: 'New reads, right on time.', description: 'A living stream of useful ideas from writers in our community.', body: <LatestTimeline /> },
  'popular-posts': { eyebrow: 'Reader favourites', title: 'The ideas people are talking about.', description: 'A weekly editorial snapshot of the stories earning attention and starting conversations.', body: <PopularStories /> },
  resources: { eyebrow: 'Writer resources', title: 'Make your next story stronger.', description: 'Practical editorial support for contributors who want to write with clarity and confidence.', body: <ResourceLibrary /> },
  'business-directory': { eyebrow: 'Business directory', title: 'Find practical expertise.', description: 'An organised way to begin your search for trusted services and capable partners.', body: <DirectoryGrid /> },
}

export default function DiscoveryPage({ type }) {
  const config = pageConfig[type] || pageConfig.topics
  return <div className={`discovery-shell discovery-shell--${type}`}><SiteHeader /><main className="discovery-main"><header className="discovery-hero"><p>{config.eyebrow}</p><h1>{config.title}</h1><span>{config.description}</span></header>{config.body}</main><SiteFooter /></div>
}
