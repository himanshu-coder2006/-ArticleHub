import './App.css'

const navLinks = ['Home', 'Topics', 'Submit', 'Latest', 'Resources', 'Popular Posts', 'Contact']

const trending = [
  ['05', 'Citizenship and its Privileges in a Globalised Society', 'Travel Tips', '0'],
  ['06', 'The Strategic Engine - Budget Estimation Services for Profitable Construction', 'Real Estate', '2'],
  ['07', 'How Encrypted Ticketing and Linux Systems Protect Revenue in Skill Gaming', 'Technology', '3'],
  ['08', 'Living a Purposeful, Productive and Prosperous Life', 'Self Improvement', '1'],
]

const editorCards = [
  {
    tag: 'Technology',
    title: 'Stop Buying AI Tools. Start Building AI Advantage With the Right Development Partner',
    author: 'Grace Bolton',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Relationship',
    title: 'I Gave My Wife Boring Birthday Gifts for Eight Years',
    author: 'Suhail Khan',
    image:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Health & Fitness',
    title: 'How to Take Care of Your Heart as a Woman Age 40+',
    author: 'Amanda Ramirez',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  },
]

const authors = [
  ['PS', 'Pamela Scott', 'Founder, brand strategist and publishing mentor.'],
  ['WH', 'Waqar Hassan', 'Writer, reviewer and business growth consultant.'],
  ['BG', 'Brian Garvin', 'SaaS and marketing technology analyst.'],
  ['SP', 'Samantha Pearce', 'Real estate writer focused on practical buying advice.'],
  ['RS', 'Rajnish Singh', 'Travel writer covering culture and local experiences.'],
  ['RT', 'Ranjeet Thakur', 'Entrepreneurship, tech and career columnist.'],
  ['SP', 'Sandra Prior', 'Lifestyle writer with a practical voice.'],
  ['RB', 'Ross Barkely', 'Law, finance and business contributor.'],
  ['TL', 'Thomas Lloyd', 'Management and leadership writer.'],
  ['BC', 'Brent Cullen', 'Consumer research and buying guide editor.'],
  ['JT', 'Jeremy Thompson', 'Technology educator and digital tools writer.'],
  ['DF', 'Dr Easton Patrick', 'Health writer focused on natural wellness.'],
]

const picks = [
  {
    title: 'What Is a Space Capsule House? 7 Things You Should Know',
    author: 'James Lucas',
    tag: 'Gadgets',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'How Startups Benefit from CTO as a Service Without Adding Full-Time Leadership Costs',
    author: 'Kristen Carter',
    tag: 'Technology News',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '5 More Highly Concerning Technologies in Development',
    author: 'Paul Philips',
    tag: 'Innovation',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
]

const latestPosts = [
  ['Portable Exhibition Stands - When They Work and When They Don\'t', 'Marketing', 'Jul 18, 2026'],
  ['How to Choose the Right Logistics CRM for Your Business', 'Technology', 'Jul 17, 2026'],
  ['Compliance Document Management Software for RIAs', 'Finance', 'Jul 17, 2026'],
  ['Seasonal Chocolate Demand for Small Retailers', 'Business Ideas', 'Jul 16, 2026'],
]

function ArticleLogo({ className = '' }) {
  return (
    <span className={`article-logo ${className}`} aria-hidden="true">
      <span></span>
    </span>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="ArticleHub home">
          <ArticleLogo />
          <strong>
            <span>Article</span>
            <span>Hub</span>
          </strong>
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="business-btn" href="#business-directory">Business Directory</a>
          <label className="search-pill">
            <span>Search</span>
            <input aria-label="Search articles" placeholder="Ctrl K" />
          </label>
          <a className="icon-link" href="#home" aria-label="Theme">○</a>
          <a className="icon-link" href="#home" aria-label="User">⌕</a>
        </div>
      </header>

      <main id="home">
        <section className="editor-header" aria-labelledby="editor-title">
          <h1 id="editor-title">Editor's Pick</h1>
          <p>Outstanding contributions from our authors.</p>
        </section>

        <section className="hero-grid" aria-label="Featured content">
          <article className="featured-story">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
              alt="Insurance brokers reviewing software reports"
            />
            <div className="featured-overlay">
              <span className="trend-badge">Trending</span>
              <div className="featured-content">
                <div className="author-row">
                  <span className="avatar">PH</span>
                  <span>Peter Hamilton</span>
                  <span>8 min read</span>
                </div>
                <h2>How Software Solutions Help Insurance Brokers Build Real-Time Quote Workflows</h2>
                <p>
                  Manual quoting slows teams down. Modern broker software connects systems,
                  reduces handoffs and helps agencies respond faster.
                </p>
                <div className="post-actions">
                  <span>2 likes</span>
                  <a href="#latest">Read Full Story</a>
                </div>
              </div>
            </div>
          </article>

          <aside className="trending-panel" aria-labelledby="trending-title">
            <h2 id="trending-title">Hot Right Now</h2>
            <div className="trend-list">
              {trending.map(([number, title, category, comments]) => (
                <a className="trend-item" href="#latest" key={title}>
                  <span>{number}</span>
                  <div>
                    <small>{category}</small>
                    <strong>{title}</strong>
                    <em>{comments} comments</em>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="verified-section" aria-labelledby="verified-title">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Editor Verified</p>
            </div>
            <a href="#latest">View All</a>
          </div>
          <div className="card-grid">
            {editorCards.map((post, index) => (
              <article
                className="article-card"
                key={post.title}
                style={{ '--item-delay': `${index * 90}ms` }}
              >
                <div className="card-image">
                  <img src={post.image} alt="" />
                  <span>{post.tag}</span>
                </div>
                <div className="card-copy">
                  <h3>{post.title}</h3>
                  <p>By {post.author} - 1 month ago</p>
                </div>
              </article>
            ))}
          </div>
          <a className="discover-btn" href="#hand-picked">Discover More Top Content</a>
        </section>

        <section className="story-intro" id="submit" aria-labelledby="story-title">
          <h2 id="story-title">
            Your story <span>deserves</span> to be told.
          </h2>
          <p>Join 800,000+ writers on ArticleHub where authentic voices find their audience.</p>

          <div className="writer-card">
            <div>
              <h3>Writer's Platform</h3>
              <p>Share your expertise with the world</p>
            </div>
            <blockquote>
              Publishing on ArticleHub has exceeded my expectations. The platform is
              intuitive, the readers are thoughtful, and I have grown so much as a writer.
            </blockquote>
            <div className="writer-bottom">
              <span>800K+ writers</span>
              <a href="#submit">Start Writing</a>
            </div>
          </div>

          <div className="stats-row" aria-label="Community statistics">
            <strong>800K+<span>Active Authors</span></strong>
            <strong>2M+<span>Monthly Readers</span></strong>
            <strong>1.9M+<span>Articles Published</span></strong>
          </div>
        </section>

        <section className="authors-section" id="authors" aria-labelledby="authors-title">
          <div className="center-heading">
            <h2 id="authors-title">Authors Leading the Way</h2>
            <p>Meet the voices shaping our community.</p>
          </div>
          <div className="author-grid">
            {authors.map(([initials, name, bio], index) => (
              <article
                className="author-card"
                key={name}
                style={{ '--item-delay': `${index * 45}ms` }}
              >
                <span>{initials}</span>
                <h3>{name}</h3>
                <p>{bio}</p>
                <a href="#authors">View Profile</a>
              </article>
            ))}
          </div>
        </section>

        <section className="picked-section" id="hand-picked" aria-labelledby="picked-title">
          <p className="pill-mini">Top Picks</p>
          <h2 id="picked-title">
            Hand <span>Picked</span>
          </h2>
          <p>Hand-selected quality content you should not miss.</p>
          <div className="category-pills">
            {['All Categories', 'Technology News', 'Investing', 'Business', 'Gadgets'].map((item) => (
              <a href="#latest" key={item}>{item}</a>
            ))}
          </div>
          <div className="picked-actions">
            <a href="#submit">Start Writing</a>
            <a href="#latest">Explore Content</a>
          </div>
          <div className="picked-grid">
            {picks.map((post, index) => (
              <article className="picked-card" key={post.title} style={{ '--item-delay': `${index * 90}ms` }}>
                <img src={post.image} alt="" />
                <div>
                  <span>{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.author} - 3 months ago</p>
                  <a href="#latest">Read Post</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="latest-section" id="latest" aria-labelledby="latest-title">
          <div className="center-heading">
            <h2 id="latest-title">Latest Posts</h2>
            <p>Just published: See what's new from our writers.</p>
          </div>
          <div className="latest-list">
            {latestPosts.map(([title, category, date], index) => (
              <article className="latest-item" key={title} style={{ '--item-delay': `${index * 55}ms` }}>
                <div>
                  <span>{category}</span>
                  <h3>{title}</h3>
                  <p>{date} - 6 min read - 3 views</p>
                </div>
                <a href="#latest">Read</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a className="footer-brand" href="#home" aria-label="ArticleHub home">
            <ArticleLogo className="footer-mark" />
            <strong>
              <span>Article</span>
              <span>Hub</span>
            </strong>
          </a>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#submit">Submit</a>
            <a href="#topics">FAQ</a>
            <a href="#latest">Privacy Policy</a>
            <a href="#authors">Terms</a>
            <a href="#authors">Contact</a>
          </nav>
          <div className="footer-socials" aria-label="Social links">
            <a href="#home" aria-label="X">X</a>
            <a href="#home" aria-label="Facebook">f</a>
            <a href="#home" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <p className="footer-copy">&copy; 2009-2026 ArticleHub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
