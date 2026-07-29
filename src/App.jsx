import { useEffect, useState } from 'react'
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

const articlePages = {
  'quote-workflows': ['How Software Solutions Help Insurance Brokers Build Real-Time Quote Workflows', 'Technology', 'Modern broker software connects systems, reduces handoffs and helps agencies respond to customers faster.'],
  '05': ['Citizenship and its Privileges in a Globalised Society', 'Travel Tips', 'A thoughtful look at identity, belonging and opportunity in an increasingly connected world.'],
  '06': ['The Strategic Engine - Budget Estimation Services for Profitable Construction', 'Real Estate', 'Practical ways that accurate planning supports healthier construction projects.'],
  '07': ['How Encrypted Ticketing and Linux Systems Protect Revenue in Skill Gaming', 'Technology', 'Why secure infrastructure is essential for reliable digital experiences.'],
  '08': ['Living a Purposeful, Productive and Prosperous Life', 'Self Improvement', 'Simple habits for building a more intentional everyday life.'],
}

const infoPages = {
  topics: {
    kicker: 'Explore topics', title: 'Find ideas worth reading.',
    description: 'Browse practical insights and fresh perspectives across the subjects our community cares about.',
    cards: [
      ['Technology', 'Smart tools, digital trends and useful product thinking.', '#category-technology'],
      ['Business', 'Strategies, leadership and ideas for growing meaningful work.', '#category-business'],
      ['Health & Fitness', 'Clear, practical guidance for feeling your best.', '#category-health-fitness'],
      ['Travel', 'Stories and tips for more thoughtful travel.', '#category-travel'],
      ['Self Improvement', 'Habits and ideas that help you make progress.', '#category-self-improvement'],
      ['Gadgets', 'Helpful guides to the devices shaping everyday life.', '#category-gadgets'],
    ],
  },
  resources: {
    kicker: 'Writer resources', title: 'Create with more confidence.',
    description: 'Useful guides to help you plan, write and publish a stronger article for your readers.',
    cards: [
      ['Writing guide', 'Build a clear structure that keeps your readers engaged.', '#write'],
      ['Contributor guide', 'Learn what ArticleHub editors look for in a submission.', '#write'],
      ['Community help', 'Get answers to common ArticleHub questions.', '#faq'],
    ],
  },
  'popular-posts': {
    kicker: 'Most read', title: 'Popular posts this week.',
    description: 'The stories readers are discussing, sharing and returning to.',
    cards: Object.entries(articlePages).slice(0, 4).map(([slug, [title, topic, summary]]) => [title, `${topic} · ${summary}`, `#article-${slug}`]),
  },
  'business-directory': {
    kicker: 'Business directory', title: 'Discover trusted services.',
    description: 'A curated starting point for services and expertise relevant to modern businesses.',
    cards: [
      ['Technology partners', 'Development, security and digital operations specialists.', '#category-technology'],
      ['Marketing services', 'Brand, growth and content strategy expertise.', '#category-business'],
      ['Property & construction', 'Practical services for real-estate projects.', '#article-06'],
    ],
  },
  'hand-picked': {
    kicker: 'Top picks', title: 'Hand-picked for you.',
    description: 'Our editorial team selected these stories for their usefulness and point of view.',
    cards: picks.map((post, index) => [post.title, `${post.tag} · By ${post.author}`, `#pick-${index}`]),
  },
  authors: {
    kicker: 'Our community', title: 'Authors leading the way.',
    description: 'Meet the writers sharing practical experience and original perspectives on ArticleHub.',
    cards: authors.slice(0, 6).map(([initials, name, bio], index) => [name, `${initials} · ${bio}`, `#author-${index}`]),
  },
  faq: {
    kicker: 'Support', title: 'Frequently asked questions.',
    description: 'Everything you need to know about reading, writing and publishing on ArticleHub.',
    cards: [
      ['How do I submit an article?', 'Open the submission form, add your article details and send it for editorial review.', '#write'],
      ['When will I hear back?', 'Our editorial team reviews submissions and replies using the email you provide.', '#contact'],
      ['Can I create an account?', 'Yes. Create a free account to join the ArticleHub community.', '#signup'],
    ],
  },
  'privacy-policy': {
    kicker: 'Legal', title: 'Your privacy matters.',
    description: 'ArticleHub uses the information you submit only to provide our services and respond to your requests.',
    cards: [
      ['Information you share', 'Contact and submission details are used to respond to you and review your content.', '#contact'],
      ['Your choices', 'You can contact us with questions about the information you have shared.', '#contact'],
    ],
  },
  terms: {
    kicker: 'Legal', title: 'ArticleHub terms.',
    description: 'By using ArticleHub, you agree to submit original, respectful content and use the platform responsibly.',
    cards: [
      ['Submitting content', 'You are responsible for the accuracy and originality of articles you submit.', '#write'],
      ['Community standards', 'We want ArticleHub to remain helpful, welcoming and respectful.', '#contact'],
    ],
  },
  'social-x': { kicker: 'Stay connected', title: 'Follow us on X.', description: 'Get the latest ArticleHub stories, writing ideas and community highlights.', cards: [['Explore recent stories', 'Read what our community is sharing today.', '#latest']] },
  'social-facebook': { kicker: 'Stay connected', title: 'Follow us on Facebook.', description: 'Join conversations around new stories and useful ideas from ArticleHub.', cards: [['Explore recent stories', 'Read what our community is sharing today.', '#latest']] },
  'social-linkedin': { kicker: 'Stay connected', title: 'Connect on LinkedIn.', description: 'Follow ArticleHub for professional insights and contributor updates.', cards: [['Explore writer resources', 'Find useful guidance for your next article.', '#resources']] },
  'forgot-password': { kicker: 'Account support', title: 'Reset your password.', description: 'To reset your password, contact the ArticleHub support team from the form below.', cards: [['Contact support', 'Send your account email and request a password reset.', '#contact']] },
  'google-signin': { kicker: 'Account access', title: 'Continue with Google.', description: 'Google sign-in can be enabled for your ArticleHub account through our account support team.', cards: [['Create an account', 'Sign up with your email to get started right away.', '#signup'], ['Contact support', 'Get help with account access.', '#contact']] },
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('articlehubUser') || 'null')
  } catch {
    return null
  }
}

function saveSession(user) {
  localStorage.setItem('articlehubUser', JSON.stringify(user))
  localStorage.setItem('articlehubSession', JSON.stringify({ email: user.email, signedInAt: Date.now() }))
}

async function submitToApi(endpoint, data) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong. Please try again.')
  }

  return result
}

function ArticleLogo({ className = '' }) {
  return (
    <span className={`article-logo ${className}`} aria-hidden="true">
      <span></span>
    </span>
  )
}

function AuthPage({ mode }) {
  const isSignUp = mode === 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email')).trim().toLowerCase()
    const password = String(form.get('password'))
    const name = String(form.get('name') || '').trim()
    const storedUser = getStoredUser()

    if (isSignUp) {
      const user = { name, email, password }
      saveSession(user)
      setMessage('Account created. You are signed in now.')
      event.currentTarget.reset()
      return
    }

    if (!storedUser) {
      setMessage('No account found. Please create an account first.')
      return
    }

    if (storedUser.email !== email || storedUser.password !== password) {
      setMessage('Email or password is incorrect.')
      return
    }

    saveSession(storedUser)
    setMessage(`Welcome back, ${storedUser.name || 'reader'}!`)
  }

  return (
    <div className="auth-shell">
      <header className="auth-header">
        <a className="brand" href="#home" aria-label="ArticleHub home">
          <ArticleLogo />
          <strong><span>Article</span><span>Hub</span></strong>
        </a>
        <a className="auth-back-link" href="#home">← Back to articles</a>
      </header>

      <main className="auth-main">
        <section className="auth-intro">
          <p className="auth-kicker">ArticleHub Community</p>
          <h1>{isSignUp ? 'Share ideas that matter.' : 'Welcome back, writer.'}</h1>
          <p>
            {isSignUp
              ? 'Create your free account and join a community built around meaningful stories.'
              : 'Sign in to discover fresh perspectives and continue sharing your work.'}
          </p>
          <div className="auth-benefits" aria-label="ArticleHub benefits">
            <span>✦ Publish your story</span>
            <span>✦ Connect with readers</span>
            <span>✦ Grow your audience</span>
          </div>
        </section>

        <section className="auth-card" aria-labelledby="auth-title">
          <p className="auth-card-kicker">{isSignUp ? 'Start for free' : 'Member sign in'}</p>
          <h2 id="auth-title">{isSignUp ? 'Create your account' : 'Sign in to ArticleHub'}</h2>
          <p className="auth-switch">
            {isSignUp ? 'Already have an account?' : 'New to ArticleHub?'}{' '}
            <a href={isSignUp ? '#login' : '#signup'}>{isSignUp ? 'Log in' : 'Create an account'}</a>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label>
                Full name
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
              </label>
            )}
            <label>
              Email address
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              Password
              <span className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  minLength="6"
                  required
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>
            {!isSignUp && <a className="forgot-link" href="#forgot-password">Forgot password?</a>}
            {isSignUp && (
              <label className="terms-check">
                <input type="checkbox" required />
                <span>I agree to the Terms of Service and Privacy Policy.</span>
              </label>
            )}
            <button className="auth-submit" type="submit">
              {isSignUp ? 'Create account' : 'Sign in'} <span>→</span>
            </button>
            {message && <p className="auth-success" role="status">{message}</p>}
          </form>

          <div className="auth-divider"><span>or continue with</span></div>
          <a className="google-button" href="#google-signin">G <span>Google</span></a>
        </section>
      </main>
    </div>
  )
}

function WritePage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
      const result = await submitToApi('/api/submissions', Object.fromEntries(form.entries()))
      setMessage(result.message)
      event.currentTarget.reset()
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="write-shell">
      <header className="auth-header">
        <a className="brand" href="#home" aria-label="ArticleHub home">
          <ArticleLogo />
          <strong><span>Article</span><span>Hub</span></strong>
        </a>
        <a className="auth-back-link" href="#home">← Back to articles</a>
      </header>

      <main className="write-main">
        <section className="write-intro">
          <p className="auth-kicker">Writer's Platform</p>
          <h1>Tell your story.</h1>
          <p>Share your knowledge, perspective and ideas with ArticleHub readers around the world.</p>
          <div className="write-tips">
            <span>✦ Add a clear, useful title</span>
            <span>✦ Choose the best matching topic</span>
            <span>✦ Review your story before submitting</span>
          </div>
        </section>

        <section className="write-card" aria-labelledby="write-title">
          <p className="auth-card-kicker">New submission</p>
          <h2 id="write-title">Submit your article</h2>
          <p>Fill in the details below and our editorial team will review it.</p>
          <form className="write-form" onSubmit={handleSubmit}>
            <label>
              Article title
              <input name="title" type="text" placeholder="Give your article a compelling title" required />
            </label>
            <div className="write-form-row">
              <label>
                Topic
                <select name="topic" defaultValue="" required>
                  <option value="" disabled>Select a topic</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                  <option>Seo</option>
                  <option>Technology</option>
                  <option>Health & Fitness</option>
                  <option>Finence</option>
                  <option>Self Improvement</option>
                </select>
              </label>
              <label>
                Your name
                <input name="author" type="text" placeholder="Your name" required />
              </label>
            </div>
            <label>
              Email address
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Your article
              <textarea name="article" rows="6" placeholder="Write your article here..." required />
            </label>
            <button className="write-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit for review'} <span>→</span>
            </button>
            {message && <p className="auth-success" role="status">{message}</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        </section>
      </main>
    </div>
  )
}

function ContactPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
      const result = await submitToApi('/api/contact', Object.fromEntries(form.entries()))
      setMessage(result.message)
      event.currentTarget.reset()
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="write-shell">
      <header className="auth-header">
        <a className="brand" href="#home" aria-label="ArticleHub home">
          <ArticleLogo />
          <strong><span>Article</span><span>Hub</span></strong>
        </a>
        <a className="auth-back-link" href="#home">← Back to articles</a>
      </header>

      <main className="write-main">
        <section className="write-intro">
          <p className="auth-kicker">Contact ArticleHub</p>
          <h1>Let's talk.</h1>
          <p>Have a question, feedback or a partnership idea? Send us a message and our team will be happy to help.</p>
          <div className="write-tips">
            <span>✦ Get help with your ArticleHub account</span>
            <span>✦ Share feedback and suggestions</span>
            <span>✦ Ask about contributor opportunities</span>
          </div>
        </section>

        <section className="write-card" aria-labelledby="contact-title">
          <p className="auth-card-kicker">Send a message</p>
          <h2 id="contact-title">Contact us</h2>
          <p>Complete the form and we will reply as soon as possible.</p>
          <form className="write-form" onSubmit={handleSubmit}>
            <div className="write-form-row">
              <label>
                Your name
                <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
            </div>
            <label>
              Subject
              <input name="subject" type="text" placeholder="What can we help with?" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="7" placeholder="Write your message here..." required />
            </label>
            <button className="write-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'} <span>→</span>
            </button>
            {message && <p className="auth-success" role="status">{message}</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        </section>
      </main>
    </div>
  )
}

function getPageContent(route) {
  if (infoPages[route]) return infoPages[route]

  if (route === 'latest') return {
    kicker: 'Fresh from ArticleHub',
    title: 'Latest posts.',
    description: 'New ideas and practical insights from our writer community.',
    cards: latestPosts.map(([title, category, date], index) => [title, `${category} · ${date}`, `#latest-${index}`]),
  }

  if (route.startsWith('category-')) {
    const category = route.slice(9).split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
    return {
      kicker: 'Browse category', title: `${category} stories.`,
      description: `Discover useful ${category.toLowerCase()} perspectives selected for ArticleHub readers.`,
      cards: Object.entries(articlePages).slice(0, 3).map(([slug, [title, topic, summary]]) => [title, `${topic} · ${summary}`, `#article-${slug}`]),
    }
  }

  if (route.startsWith('article-')) {
    const article = articlePages[route.slice(8)] || articlePages['quote-workflows']
    return {
      kicker: article[1], title: article[0], description: article[2],
      cards: [['About this story', 'A concise introduction to the topic and key takeaways for ArticleHub readers.', '#topics'], ['Write your perspective', 'Submit your own useful story to ArticleHub.', '#write']],
    }
  }

  if (route.startsWith('pick-')) {
    const post = picks[Number(route.slice(5))] || picks[0]
    return { kicker: post.tag, title: post.title, description: `A hand-picked ArticleHub feature by ${post.author}.`, cards: [['More top picks', 'Continue exploring editor-selected content.', '#hand-picked'], ['Start writing', 'Share your own perspective with our readers.', '#write']] }
  }

  if (route.startsWith('latest-')) {
    const post = latestPosts[Number(route.slice(7))] || latestPosts[0]
    return { kicker: post[1], title: post[0], description: `Published ${post[2]} — a fresh perspective from the ArticleHub community.`, cards: [['More recent stories', 'See the latest work from ArticleHub writers.', '#latest'], ['Submit an article', 'Have an idea to share? Send it to our editorial team.', '#write']] }
  }

  if (route.startsWith('author-')) {
    const author = authors[Number(route.slice(7))] || authors[0]
    return { kicker: 'Author profile', title: author[1], description: author[2], cards: [['Explore more authors', 'Meet the voices shaping the ArticleHub community.', '#authors'], ['Start writing', 'Create your own author journey with ArticleHub.', '#write']] }
  }

  return { kicker: 'ArticleHub', title: 'Discover something useful.', description: 'Explore stories, writers and resources from the ArticleHub community.', cards: [['Browse topics', 'Find a subject that interests you.', '#topics'], ['Contact us', 'Our team is here to help.', '#contact']] }
}

function ContentPage({ route }) {
  const page = getPageContent(route)

  return (
    <div className="content-shell">
      <header className="auth-header">
        <a className="brand" href="#home" aria-label="ArticleHub home"><ArticleLogo /><strong><span>Article</span><span>Hub</span></strong></a>
        <a className="auth-back-link" href="#home">← Back to home</a>
      </header>
      <main className="content-main">
        <section className="content-hero">
          <p className="auth-kicker">{page.kicker}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <a className="content-primary" href="#write">Start writing <span>→</span></a>
        </section>
        <section className="content-cards" aria-label={`${page.title} links`}>
          {page.cards.map(([title, description, href], index) => (
            <a className="content-card" href={href} key={`${title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div><b>→</b>
            </a>
          ))}
        </section>
      </main>
    </div>
  )
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || 'home')

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  if (route === 'login' || route === 'signup') {
    return <AuthPage mode={route} />
  }

  if (route === 'write') {
    return <WritePage />
  }

  if (route === 'contact') {
    return <ContactPage />
  }

  if (route !== 'home') {
    return <ContentPage route={route} />
  }

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
            <a href={item === 'Submit' ? '#write' : `#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="business-btn" href="#business-directory">Business Directory</a>
          <a className="auth-login" href="#login">Log in</a>
          <a className="auth-signup" href="#signup">Sign up</a>
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
                  <a href="#article-quote-workflows">Read Full Story</a>
                </div>
              </div>
            </div>
          </article>

          <aside className="trending-panel" aria-labelledby="trending-title">
            <h2 id="trending-title">Hot Right Now</h2>
            <div className="trend-list">
              {trending.map(([number, title, category, comments]) => (
                <a className="trend-item" href={`#article-${number}`} key={title}>
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
            <a href="#popular-posts">View All</a>
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
              <a href="#write">Start Writing</a>
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
                <a href={`#author-${index}`}>View Profile</a>
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
              <a href={`#category-${item.toLowerCase().replaceAll(' ', '-').replace('all-categories', 'all')}`} key={item}>{item}</a>
            ))}
          </div>
          <div className="picked-actions">
            <a href="#write">Start Writing</a>
            <a href="#topics">Explore Content</a>
          </div>
          <div className="picked-grid">
            {picks.map((post, index) => (
              <article className="picked-card" key={post.title} style={{ '--item-delay': `${index * 90}ms` }}>
                <img src={post.image} alt="" />
                <div>
                  <span>{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.author} - 3 months ago</p>
                  <a href={`#pick-${index}`}>Read Post</a>
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
                <a href={`#latest-${index}`}>Read</a>
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
            <a href="#write">Submit</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy-policy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials" aria-label="Social links">
            <a href="#social-x" aria-label="X">X</a>
            <a href="#social-facebook" aria-label="Facebook">f</a>
            <a href="#social-linkedin" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <p className="footer-copy">&copy; 2009-2026 ArticleHub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
