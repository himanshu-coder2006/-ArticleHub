import { useEffect, useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import ArticlePage from './pages/ArticlePage'
import AuthorPage from './pages/AuthorPage'
import AuthorsPage from './pages/AuthorsPage'
import ContactPage from './pages/ContactPage'
import ContributorPage from './pages/ContributorPage'
import ContentPage from './pages/ContentPage'
import DiscoveryPage from './pages/DiscoveryPage'
import HomePage from './pages/HomePage'
import WritePage from './pages/WritePage'

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || 'home')

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  if (route === 'login' || route === 'signup') return <AuthPage mode={route} />
  if (route === 'write') return <WritePage />
  if (route === 'contact') return <ContactPage />
  if (route === 'authors') return <AuthorsPage />
  if (route.startsWith('author-contributor-')) return <ContributorPage id={route.slice(19)} />
  if (route.startsWith('article-')) return <ArticlePage slug={route.slice(8)} />
  if (route.startsWith('author-')) return <AuthorPage index={Number(route.slice(7))} />
  if (['topics', 'latest', 'popular-posts', 'resources', 'business-directory'].includes(route)) return <DiscoveryPage type={route} />
  if (route !== 'home') return <ContentPage route={route} />
  return <HomePage />
}
