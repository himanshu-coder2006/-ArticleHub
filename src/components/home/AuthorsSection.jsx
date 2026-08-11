import { authors } from '../../data/content'

export default function AuthorsSection() {
  return <section className="authors-section" id="authors" aria-labelledby="authors-title"><div className="center-heading"><h2 id="authors-title">Authors Leading the Way</h2><p>Meet the voices shaping our community.</p></div><div className="author-grid">{authors.map(([initials, name, bio], index) => <article className="author-card" key={name} style={{ '--item-delay': `${index * 45}ms` }}><span>{initials}</span><h3>{name}</h3><p>{bio}</p><a href={`#author-${index}`}>View Profile</a></article>)}</div></section>
}
