import ArticleLogo from './ArticleLogo'

export default function BrandLink({ footer = false }) {
  return (
    <a className={footer ? 'footer-brand' : 'brand'} href="#home" aria-label="ArticleHub home">
      <ArticleLogo className={footer ? 'footer-mark' : ''} />
      <strong><span>Article</span><span>Hub</span></strong>
    </a>
  )
}
