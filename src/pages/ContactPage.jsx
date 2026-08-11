import { useState } from 'react'
import AuthHeader from '../components/layout/AuthHeader'
import { submitToApi } from '../lib/api'

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  async function handleSubmit(event) {
    event.preventDefault(); setMessage(''); setError(''); setIsSubmitting(true)
    try { const result = await submitToApi('/api/contact', Object.fromEntries(new FormData(event.currentTarget).entries())); setMessage(result.message); event.currentTarget.reset() } catch (submissionError) { setError(submissionError.message) } finally { setIsSubmitting(false) }
  }
  return <div className="write-shell"><AuthHeader /><main className="write-main"><section className="write-intro"><p className="auth-kicker">Contact ArticleHub</p><h1>Let's talk.</h1><p>Have a question, feedback or a partnership idea? Send us a message and our team will be happy to help.</p><div className="write-tips"><span>✦ Get help with your ArticleHub account</span><span>✦ Share feedback and suggestions</span><span>✦ Ask about contributor opportunities</span></div></section><section className="write-card" aria-labelledby="contact-title"><p className="auth-card-kicker">Send a message</p><h2 id="contact-title">Contact us</h2><p>Complete the form and we will reply as soon as possible.</p><form className="write-form" onSubmit={handleSubmit}><div className="write-form-row"><label>Your name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label></div><label>Subject<input name="subject" type="text" placeholder="What can we help with?" required /></label><label>Message<textarea name="message" rows="7" placeholder="Write your message here..." required /></label><button className="write-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'} <span>&rarr;</span></button>{message && <p className="auth-success" role="status">{message}</p>}{error && <p className="form-error" role="alert">{error}</p>}</form></section></main></div>
}
