export const navLinks = ['Home', 'Topics', 'Submit', 'Latest', 'Resources', 'Popular Posts', 'Contact']

export const topicCatalog = [
  ['Art & Culture', 'Creative work, media, books and ideas worth sharing.'], ['Automotive', 'Practical ownership, design and mobility insights.'], ['Business', 'Growth, leadership and better ways to build a company.'], ['Careers', 'Skills and strategies for meaningful work.'], ['Communication', 'Clearer messages, stronger teams and better relationships.'], ['Education', 'Learning ideas for every stage of life.'], ['Finance', 'Money habits and practical financial decisions.'], ['Food & Drink', 'Food stories, cooking ideas and hospitality.'], ['Gaming', 'Games, communities and digital play.'], ['Health & Fitness', 'Thoughtful guidance for everyday wellbeing.'], ['Hobbies', 'Make time for the things that make life richer.'], ['Home & Garden', 'Comfortable, useful and beautiful living spaces.'], ['Home & Family', 'Family life, routines and connection.'], ['Home Improvement', 'Projects and smart choices for your home.'], ['Internet', 'Digital culture, online work and modern tools.'], ['Law', 'Everyday legal awareness and responsible decisions.'], ['News & Society', 'Ideas shaping communities and public life.'], ['Pets', 'Care and connection with animal companions.'], ['Real Estate', 'Property, places and informed decisions.'], ['Relationships', 'Connection, communication and community.'], ['Self Improvement', 'Small habits that create real progress.'], ['Shopping', 'Clearer buying decisions and useful products.'], ['Spirituality', 'Reflection, values and inner life.'], ['Sports', 'Training, performance and the joy of sport.'], ['Technology', 'Tools, product thinking and the digital future.'], ['Travel', 'Better journeys and local perspectives.'], ['Writing', 'Ideas to plan, write and publish with confidence.'],
]

export const trending = [
  ['05', 'The Quiet Systems That Make Great Teams Move Faster', 'Business', '12'],
  ['06', 'A Practical Guide to Creating a More Restful Home', 'Home & Garden', '8'],
  ['07', 'Why Better Digital Habits Start With One Small Boundary', 'Technology', '16'],
  ['08', 'The Sunday Reset: Planning a Calmer Week Ahead', 'Self Improvement', '5'],
]

export const editorCards = [
  { tag: 'Technology', title: 'Build a Useful AI Workflow Before You Buy Another Tool', author: 'Maya Desai', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80' },
  { tag: 'Relationships', title: 'The Small Conversation Habit That Changed Our Evenings', author: 'Elias Grant', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80' },
  { tag: 'Health & Fitness', title: 'Four Gentle Ways to Look After Your Heart Each Day', author: 'Nora Fields', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' },
]

export const authors = [
  ['MS', 'Maya Shah', 'Product writer focused on human-centred technology.'], ['AG', 'Arjun Gill', 'Business editor and independent research writer.'], ['NF', 'Nora Fields', 'Wellbeing writer with a practical, gentle approach.'], ['LC', 'Leah Chen', 'Travel storyteller and city-guide contributor.'], ['DR', 'Daniel Ross', 'Writer covering careers, learning and modern work.'], ['PR', 'Priya Rao', 'Home and lifestyle editor interested in small improvements.'], ['EK', 'Elena Kim', 'Culture writer and lifelong reader.'], ['JP', 'Jon Patel', 'Technology analyst and digital-product educator.'], ['SM', 'Sofia Martin', 'Food and hospitality writer.'], ['OT', 'Owen Taylor', 'Sports writer and recreational coach.'], ['YA', 'Yasmin Ali', 'Finance contributor focused on everyday confidence.'], ['MB', 'Micah Brown', 'Community writer and interview host.'],
]

export const picks = [
  { title: 'What Makes a Small Home Feel Spacious? Seven Ideas to Try', author: 'Priya Rao', tag: 'Home Improvement', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80' },
  { title: 'How a Fractional Technology Lead Helps a Growing Team', author: 'Maya Shah', tag: 'Technology', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80' },
  { title: 'Five Digital Trends Worth Understanding Before They Arrive', author: 'Jon Patel', tag: 'Innovation', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
]

export const latestPosts = [
  ['How to Make Your First Hour at Work More Focused', 'Careers', 'Aug 05, 2026'], ['A Beginner-Friendly Way to Start a Balcony Garden', 'Home & Garden', 'Aug 04, 2026'], ['What a Thoughtful Customer Journey Actually Looks Like', 'Business', 'Aug 04, 2026'], ['A Simple Checklist for Planning a Weekend Away', 'Travel', 'Aug 03, 2026'], ['How to Choose Technology That Your Team Will Actually Use', 'Technology', 'Aug 03, 2026'], ['The No-Pressure Guide to Building a Reading Habit', 'Self Improvement', 'Aug 02, 2026'], ['When a Pet Routine Needs a Little More Flexibility', 'Pets', 'Aug 02, 2026'], ['Three Budgeting Questions to Ask Before a Big Purchase', 'Finance', 'Aug 01, 2026'],
]

export const articlePages = {
  'quote-workflows': ['How Useful Software Helps Service Teams Respond With Confidence', 'Technology', 'Simple, connected tools can remove busywork and leave more space for thoughtful customer service.'],
  '05': ['The Quiet Systems That Make Great Teams Move Faster', 'Business', 'A closer look at the shared routines that help teams make better decisions without adding more meetings.'],
  '06': ['A Practical Guide to Creating a More Restful Home', 'Home & Garden', 'Small changes to light, storage and daily rituals can make a home feel calmer and more restorative.'],
  '07': ['Why Better Digital Habits Start With One Small Boundary', 'Technology', 'A realistic approach to attention, notifications and choosing when to be online.'],
  '08': ['The Sunday Reset: Planning a Calmer Week Ahead', 'Self Improvement', 'A simple weekly reflection that makes room for priorities, rest and everyday life.'],
}

const articleCards = Object.entries(articlePages).map(([slug, [title, topic, summary]]) => [title, `${topic} · ${summary}`, `#article-${slug}`])
const topicCards = topicCatalog.map(([title, description]) => [title, description, `#category-${title.toLowerCase().replaceAll(' & ', '-and-').replaceAll(' ', '-')}`])

const infoPages = {
  topics: { kicker: 'Explore topics', title: 'Find ideas worth reading.', description: 'Browse original stories and practical perspectives across the subjects our community cares about.', cards: topicCards },
  resources: { kicker: 'Writer resources', title: 'Create with more confidence.', description: 'Useful original guides to help you plan, write and publish a stronger article for your readers.', cards: [['Writing guide', 'Build a clear structure that keeps readers engaged from the opening line.', '#write'], ['Contributor guide', 'Understand the quality and formatting expectations for an ArticleHub submission.', '#write'], ['Community help', 'Get answers to common ArticleHub questions.', '#faq']] },
  'popular-posts': { kicker: 'Most read', title: 'Popular posts this week.', description: 'Stories ArticleHub readers are discussing, sharing and returning to.', cards: articleCards },
  'business-directory': { kicker: 'Business directory', title: 'Discover useful services.', description: 'A starting point for skills and services relevant to modern businesses.', cards: [['Technology partners', 'Development, security and digital operations specialists.', '#category-technology'], ['Marketing services', 'Brand, growth and content strategy expertise.', '#category-business'], ['Property & construction', 'Practical services for real-estate projects.', '#category-real-estate']] },
  'hand-picked': { kicker: 'Top picks', title: 'Hand-picked for you.', description: 'Our editorial team selected these original stories for their usefulness and point of view.', cards: picks.map((post, index) => [post.title, `${post.tag} · By ${post.author}`, `#pick-${index}`]) },
  authors: { kicker: 'Our community', title: 'Authors leading the way.', description: 'Meet the writers sharing practical experience and original perspectives on ArticleHub.', cards: authors.map(([initials, name, bio], index) => [name, `${initials} · ${bio}`, `#author-${index}`]) },
  faq: { kicker: 'Support', title: 'Frequently asked questions.', description: 'Everything you need to know about reading, writing and publishing on ArticleHub.', cards: [['How do I submit an article?', 'Open the submission form, add your article details and send it for editorial review.', '#write'], ['When will I hear back?', 'Our editorial team reviews submissions and replies using the email you provide.', '#contact'], ['Can I create an account?', 'Yes. Create a free account to join the ArticleHub community.', '#signup']] },
  'privacy-policy': { kicker: 'Legal', title: 'Your privacy matters.', description: 'ArticleHub uses the information you submit only to provide our services and respond to your requests.', cards: [['Information you share', 'Contact and submission details are used to respond to you and review your content.', '#contact'], ['Your choices', 'You can contact us with questions about the information you have shared.', '#contact']] },
  terms: { kicker: 'Legal', title: 'ArticleHub terms.', description: 'By using ArticleHub, you agree to submit original, respectful content and use the platform responsibly.', cards: [['Submitting content', 'You are responsible for the accuracy and originality of articles you submit.', '#write'], ['Community standards', 'We want ArticleHub to remain helpful, welcoming and respectful.', '#contact']] },
  'social-x': { kicker: 'Stay connected', title: 'Follow us on X.', description: 'Get the latest ArticleHub stories, writing ideas and community highlights.', cards: [['Explore recent stories', 'Read what our community is sharing today.', '#latest']] },
  'social-facebook': { kicker: 'Stay connected', title: 'Follow us on Facebook.', description: 'Join conversations around new stories and useful ideas from ArticleHub.', cards: [['Explore recent stories', 'Read what our community is sharing today.', '#latest']] },
  'social-linkedin': { kicker: 'Stay connected', title: 'Connect on LinkedIn.', description: 'Follow ArticleHub for professional insights and contributor updates.', cards: [['Explore writer resources', 'Find useful guidance for your next article.', '#resources']] },
  'forgot-password': { kicker: 'Account support', title: 'Reset your password.', description: 'To reset your password, contact the ArticleHub support team from the form below.', cards: [['Contact support', 'Send your account email and request a password reset.', '#contact']] },
  'google-signin': { kicker: 'Account access', title: 'Continue with Google.', description: 'Google sign-in can be enabled for your ArticleHub account through our account support team.', cards: [['Create an account', 'Sign up with your email to get started right away.', '#signup'], ['Contact support', 'Get help with account access.', '#contact']] },
}

export function getPageContent(route) {
  if (infoPages[route]) return infoPages[route]
  if (route === 'latest') return { kicker: 'Fresh from ArticleHub', title: 'Latest posts.', description: 'New original ideas and practical insights from our writer community.', cards: latestPosts.map(([title, category, date], index) => [title, `${category} · ${date}`, `#latest-${index}`]) }
  if (route.startsWith('category-')) {
    const category = route.slice(9).split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
    return { kicker: 'Browse category', title: `${category} stories.`, description: `Discover useful ${category.toLowerCase()} perspectives selected for ArticleHub readers.`, cards: articleCards }
  }
  if (route.startsWith('article-')) {
    const article = articlePages[route.slice(8)] || articlePages['quote-workflows']
    return { kicker: article[1], title: article[0], description: article[2], cards: [['About this story', 'A concise introduction to the topic and key takeaways for ArticleHub readers.', '#topics'], ['Write your perspective', 'Submit your own useful story to ArticleHub.', '#write']] }
  }
  if (route.startsWith('pick-')) { const post = picks[Number(route.slice(5))] || picks[0]; return { kicker: post.tag, title: post.title, description: `A hand-picked ArticleHub feature by ${post.author}.`, cards: [['More top picks', 'Continue exploring editor-selected content.', '#hand-picked'], ['Start writing', 'Share your own perspective with our readers.', '#write']] } }
  if (route.startsWith('latest-')) { const post = latestPosts[Number(route.slice(7))] || latestPosts[0]; return { kicker: post[1], title: post[0], description: `Published ${post[2]} - a fresh perspective from the ArticleHub community.`, cards: [['More recent stories', 'See the latest work from ArticleHub writers.', '#latest'], ['Submit an article', 'Have an idea to share? Send it to our editorial team.', '#write']] } }
  if (route.startsWith('author-')) { const author = authors[Number(route.slice(7))] || authors[0]; return { kicker: 'Author profile', title: author[1], description: author[2], cards: [['Explore more authors', 'Meet the voices shaping the ArticleHub community.', '#authors'], ['Start writing', 'Create your own author journey with ArticleHub.', '#write']] } }
  return { kicker: 'ArticleHub', title: 'Discover something useful.', description: 'Explore original stories, writers and resources from the ArticleHub community.', cards: [['Browse topics', 'Find a subject that interests you.', '#topics'], ['Contact us', 'Our team is here to help.', '#contact']] }
}
