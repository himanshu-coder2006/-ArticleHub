import { useEffect, useState } from 'react'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { getFromApi } from '../lib/api'

export default function ContributorPage({ id }) {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getFromApi(`/api/authors/${id}`).then(setProfile).catch((requestError) => setError(requestError.message))
  }, [id])

  if (error) return <div className="author-page"><SiteHeader /><main className="contributor-status"><h1>Contributor unavailable</h1><p>{error}</p><a href="#authors">Back to authors</a></main><SiteFooter /></div>
  if (!profile) return <div className="author-page"><SiteHeader /><main className="contributor-status"><p>Loading contributor profile…</p></main><SiteFooter /></div>

  const { author, stories } = profile
  return <div className="author-page"><SiteHeader /><main className="author-profile"><header className="author-profile-hero"><span>{author.initials}</span><div><p>ArticleHub contributor</p><h1>{author.name}</h1><h2>{author.bio}</h2><div><b>{author.articleCount}</b><small>Articles submitted</small></div></div><a href="#write">Write an article</a></header><section className="author-stories"><p>From {author.name.split(' ')[0]}</p><h2>Submitted articles</h2>{stories.map((story) => <article className="contributor-story" key={story.id}><span>{story.topic}</span><h3>{story.title}</h3><small>Submitted {new Date(story.createdAt).toLocaleDateString()}</small></article>)}</section></main><SiteFooter /></div>
}
