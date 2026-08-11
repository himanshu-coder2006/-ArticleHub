import { useRef, useState } from 'react'
import { submitToApi } from '../lib/api'

const categories = [
  'Travel',
  'Real Estate',
  'Technology',
  'Health and Fitness',
  'Shopping',
  'Finance',
  'Automotive',
  'Home Improvement',
  'Communications',
  'Gaming',
  'Internet',
  'Food and Drinks',
  'Art and Entertainment',
  'Business',
  'Careers',
  'Education',
  'Hobbies',
  'Home and Family',
  'Law',
]

export default function WritePage() {
  const editorRef = useRef(null)
  const selectionRef = useRef(null)
  const [articleHtml, setArticleHtml] = useState('')
  const [sourceMode, setSourceMode] = useState(false)
  const [activeTools, setActiveTools] = useState({ bold: false, italic: false, orderedList: false, unorderedList: false })
  const [stats, setStats] = useState({ paragraphs: 0, words: 0 })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function isSelectionInsideEditor(range) {
    return Boolean(range && editorRef.current?.contains(range.commonAncestorContainer))
  }

  function saveSelection() {
    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)
    if (isSelectionInsideEditor(range)) {
      selectionRef.current = range.cloneRange()
    }
  }

  function restoreSelection() {
    if (!selectionRef.current) return

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(selectionRef.current)
  }

  function updateEditorState(isSourceMode = sourceMode) {
    const editor = editorRef.current
    if (!editor) return

    const html = isSourceMode ? editor.textContent ?? '' : editor.innerHTML
    const text = (isSourceMode ? new DOMParser().parseFromString(html, 'text/html').body.innerText : editor.innerText).replace(/\u00a0/g, ' ').trim()
    const words = text ? text.split(/\s+/).length : 0
    const paragraphs = text ? text.split(/\n+/).filter((paragraph) => paragraph.trim()).length : 0

    setArticleHtml(html)
    setStats({ paragraphs, words })
  }

  function updateToolbarState(isSourceMode = sourceMode) {
    if (isSourceMode) {
      setActiveTools({ bold: false, italic: false, orderedList: false, unorderedList: false })
      return
    }
    setActiveTools({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      orderedList: document.queryCommandState('insertOrderedList'),
      unorderedList: document.queryCommandState('insertUnorderedList'),
    })
  }

  function focusEditor() {
    editorRef.current?.focus()
  }

  function runCommand(command, value = null) {
    focusEditor()
    restoreSelection()
    document.execCommand(command, false, value)
    saveSelection()
    updateEditorState()
    updateToolbarState()
  }

  function handleCommand(event, command, value = null) {
    event.preventDefault()
    runCommand(command, value)
  }

  function toggleSourceMode(event) {
    event.preventDefault()
    const editor = editorRef.current
    if (!editor) return

    if (sourceMode) {
      editor.innerHTML = editor.textContent
      updateEditorState(false)
      updateToolbarState(false)
    } else {
      editor.textContent = editor.innerHTML
      updateEditorState(true)
      updateToolbarState(true)
    }

    setSourceMode((value) => !value)
    requestAnimationFrame(focusEditor)
  }

  function handleCreateLink(event) {
    event.preventDefault()
    if (sourceMode) return
    focusEditor()
    restoreSelection()

    const href = window.prompt('Enter link URL')
    if (!href) return

    const normalizedHref = /^https?:\/\//i.test(href) ? href : `https://${href}`
    const selection = window.getSelection()
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null
    if (range?.collapsed) {
      const safeUrl = normalizedHref.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      runCommand('insertHTML', `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>`)
      return
    }
    runCommand('createLink', normalizedHref)
  }

  async function getFeaturedImage(file) {
    if (!file) return null

    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!supportedTypes.includes(file.type)) throw new Error('Please choose a JPG, JPEG, PNG, or GIF image.')
    if (file.size > 200 * 1024) throw new Error('Featured image must be 200 KB or smaller.')

    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('The featured image could not be read. Please choose it again.'))
      reader.readAsDataURL(file)
    })

    return { name: file.name, type: file.type, size: file.size, dataUrl }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    const editor = editorRef.current
    const source = sourceMode ? editor?.textContent.trim() ?? '' : editor?.innerHTML.trim() ?? ''
    const articleText = sourceMode
      ? new DOMParser().parseFromString(source, 'text/html').body.innerText.replace(/\u00a0/g, ' ').trim()
      : editor?.innerText.replace(/\u00a0/g, ' ').trim() ?? ''
    if (!articleText) {
      setError('Please add article content before submitting.')
      focusEditor()
      return
    }

    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    const imageFile = data.featuredImage instanceof File ? data.featuredImage : null
    const article = source

    setIsSubmitting(true)

    try {
      const featuredImage = await getFeaturedImage(imageFile)
      const result = await submitToApi('/api/submissions', { title: data.title, topic: data.category, article, copyright: data.copyright === 'true', featuredImage })
      setMessage(result.message)
      event.currentTarget.reset()
      if (editorRef.current) editorRef.current.innerHTML = ''
      setArticleHtml('')
      setStats({ paragraphs: 0, words: 0 })
      setSourceMode(false)
      window.setTimeout(() => { window.location.hash = 'authors' }, 500)
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="submission-page">
      <section className="submission-card" aria-labelledby="submission-title">
        <a className="submission-back" href="#home">← Back to home</a>
        <header className="submission-header">
          <p>ArticleHub contributors</p>
          <h1 id="submission-title">Share a story worth reading.</h1>
          <span>Submit your original article for editorial review.</span>
        </header>
        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="submission-form-row">
            <label>Category<select name="category" defaultValue="" required><option value="" disabled>Select category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label>Article title<input name="title" placeholder="Give your article a clear title" required /></label>
          </div>
          <label className="content-field">Article content
            <div className="article-editor" onClick={focusEditor}>
              <div className="editor-tools" aria-label="Editor toolbar">
                <button type="button" className={`source-button ${sourceMode ? 'is-active' : ''}`} title="Source" aria-label="Source" onMouseDown={toggleSourceMode}><i aria-hidden="true"></i>Source</button>
                <span className="toolbar-divider"></span>
                <button type="button" className={activeTools.bold ? 'is-active' : ''} title="Bold" aria-label="Bold" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'bold')}>B</button>
                <button type="button" className={`is-italic ${activeTools.italic ? 'is-active' : ''}`} title="Italic" aria-label="Italic" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'italic')}>I</button>
                <span className="toolbar-divider"></span>
                <button type="button" className={`toolbar-icon list-numbered ${activeTools.orderedList ? 'is-active' : ''}`} title="Numbered list" aria-label="Numbered list" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'insertOrderedList')}>1≡</button>
                <button type="button" className={`toolbar-icon list-bulleted ${activeTools.unorderedList ? 'is-active' : ''}`} title="Bulleted list" aria-label="Bulleted list" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'insertUnorderedList')}>•≡</button>
                <span className="toolbar-divider"></span>
                <button type="button" className="toolbar-icon indent-outdent" title="Decrease indent" aria-label="Decrease indent" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'outdent')}>⇤≡</button>
                <button type="button" className="toolbar-icon indent-indent" title="Increase indent" aria-label="Increase indent" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'indent')}>⇥≡</button>
                <span className="toolbar-divider"></span>
                <button type="button" className="toolbar-icon link-button" title="Insert link" aria-label="Insert link" disabled={sourceMode} onMouseDown={handleCreateLink}><i aria-hidden="true"></i></button>
                <button type="button" className="toolbar-icon link-button unlink-button" title="Remove link" aria-label="Remove link" disabled={sourceMode} onMouseDown={(event) => handleCommand(event, 'unlink')}><i aria-hidden="true"></i></button>
                <span className="toolbar-divider"></span>
                <button type="button" className="toolbar-help" title="Editor help" aria-label="Editor help" onMouseDown={(event) => event.preventDefault()}>?</button>
              </div>
              <div
                ref={editorRef}
                className="rich-editor-area"
                role="textbox"
                aria-label="Article content"
                aria-multiline="true"
                contentEditable
                suppressContentEditableWarning
                tabIndex={0}
                onBlur={saveSelection}
                onInput={updateEditorState}
                onFocus={() => { saveSelection(); updateToolbarState() }}
                onKeyUp={() => { saveSelection(); updateToolbarState() }}
                onMouseUp={() => { saveSelection(); updateToolbarState() }}
              />
              <input type="hidden" name="article" value={articleHtml} />
              <small>Paragraphs: {stats.paragraphs} - Words: {stats.words}</small>
            </div>
          </label>
          <div className="featured-image"><b>Featured image <em>Optional</em></b><small>JPG, PNG or GIF · maximum file size 200 KB</small><input name="featuredImage" type="file" accept="image/jpeg,image/png,image/gif" /></div>
          <label className="copyright-check"><input type="checkbox" name="copyright" value="true" required /><span>I confirm this article is unique and has not been published anywhere before. The content found duplicated elsewhere will be removed from approval.</span></label>
          <p className="submission-note">We only publish unique and well-written posts. Your post may not be published elsewhere. Our editors manually check each post. Depending upon the queue and maintenance it may take 48-72 hours to review your post and send it live.</p>
          <button className="submission-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : <>Submit article <span>→</span></>}</button>
          {message && <p className="submission-success" role="status">{message}</p>}
          {error && <p className="submission-error" role="alert">{error}</p>}
        </form>
      </section>
    </main>
  )
}
