import { useEffect, useState } from 'react'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { authors } from '../data/content'
import { getFromApi } from '../lib/api'

export default function AuthorsPage() {
  const [submittedAuthors, setSubmittedAuthors] = useState([])

  useEffect(() => {
    let isCurrent = true
    getFromApi('/api/authors').then((result) => {
      if (isCurrent) setSubmittedAuthors(result.authors || [])
    }).catch(() => {})
    return () => { isCurrent = false }
  }, [])

  const directoryAuthors = [
    ...authors.map(([initials, name, bio], index) => ({ initials, name, bio, href: `#author-${index}` })),
    ...submittedAuthors.map((author) => ({ ...author, href: `#author-contributor-${author.id}` })),
  ]

  return <div className="authors-directory"><SiteHeader /><main className="authors-directory-main"><header className="authors-directory-heading"><p>Our community</p><h1>Authors Leading the Way</h1><span>Meet the voices shaping our community.</span></header><section className="authors-directory-grid" aria-label="ArticleHub authors">{directoryAuthors.map((author, index) => <article className="authors-directory-card" key={author.id || author.name} style={{ '--author-delay': `${index * 45}ms` }}><span className="authors-directory-avatar">{author.initials}</span><h2>{author.name}</h2><p>{author.bio}</p><a href={author.href}>View profile <b>→</b></a></article>)}</section></main><SiteFooter /></div>
}
