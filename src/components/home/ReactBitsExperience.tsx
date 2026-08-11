import { useEffect, useMemo, useRef, type CSSProperties, type PointerEvent } from 'react'
import { authors, editorCards } from '../../data/content'
import './reactbits-experience.css'

function StrokeText({ children }: { children: string }) {
  return <span className="rb-stroke-text" aria-label={children}><span aria-hidden="true">{children}</span></span>
}

function CircularText({ text }: { text: string }) {
  const letters = useMemo(() => Array.from(text), [text])
  return <span className="rb-circular-text" aria-label={text}>{letters.map((letter, index) => <i key={`${letter}-${index}`} style={{ '--rb-angle': `${(360 / letters.length) * index}deg` } as CSSProperties}>{letter}</i>)}</span>
}

function ScrollExpand() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = sectionRef.current
    if (!element) return undefined
    const update = () => {
      const rect = element.getBoundingClientRect()
      const range = Math.max(1, window.innerHeight * 0.8)
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / range))
      element.style.setProperty('--rb-progress', progress.toFixed(3))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <section className="rb-scroll-expand" ref={sectionRef} aria-label="Featured ArticleHub story"><div className="rb-scroll-frame"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=85" alt="Writer working at a desk" /><div><span>ArticleHub editorial</span><h3>Ideas become more useful when they are shared.</h3><a href="#write">Write with us &rarr;</a></div></div></section>
}

function DriftWall() {
  const photos = [...editorCards, ...editorCards].map((item) => item.image)
  return <div className="rb-drift-wall" aria-hidden="true">{[0, 1, 2, 3].map((column) => <div className="rb-drift-column" key={column}>{photos.filter((_, index) => index % 4 === column).map((image, index) => <img src={image} alt="" key={`${column}-${index}`} />)}</div>)}</div>
}

function ChromaGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--rb-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--rb-y', `${event.clientY - rect.top}px`)
  }
  return <div className="rb-chroma-grid" ref={gridRef} onPointerMove={onMove}>{authors.slice(0, 3).map(([initials, name, bio], index) => <a href={`#author-${index}`} className="rb-chroma-card" key={name}><span>{initials}</span><small>ArticleHub voice</small><h3>{name}</h3><p>{bio}</p><b>View profile &rarr;</b></a>)}</div>
}

export default function ReactBitsExperience() {
  return <section className="rb-experience" aria-labelledby="rb-experience-title"><div className="rb-experience-hero"><DriftWall /><div className="rb-experience-copy"><p>Discover ArticleHub</p><h2 id="rb-experience-title"><StrokeText>Read beyond the headline.</StrokeText></h2><span>Perspectives that stay with you, from a community that has something meaningful to say.</span><a href="#topics">Explore every topic <b>&rarr;</b></a></div><CircularText text="ARTICLEHUB • IDEAS WORTH READING • " /></div><ScrollExpand /><div className="rb-voices-heading"><p>Meet the voices</p><h2>Different experiences. <em>One thoughtful community.</em></h2></div><ChromaGrid /></section>
}
