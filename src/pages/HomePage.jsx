import SiteHeader from '../components/layout/SiteHeader'
import SiteFooter from '../components/layout/SiteFooter'
import EditorPick from '../components/home/EditorPick'
import VerifiedSection from '../components/home/VerifiedSection'
import StoryIntro from '../components/home/StoryIntro'
import AuthorsSection from '../components/home/AuthorsSection'
import PickedSection from '../components/home/PickedSection'
import LatestSection from '../components/home/LatestSection'
import ReactBitsExperience from '../components/home/ReactBitsExperience'

export default function HomePage() {
  return <div className="site-shell"><SiteHeader /><main id="home"><EditorPick /><VerifiedSection /><ReactBitsExperience /><StoryIntro /><AuthorsSection /><PickedSection /><LatestSection /></main><SiteFooter /></div>
}
