import { useState } from 'react'
import AuthHeader from '../components/layout/AuthHeader'
import { logIn, saveSession, signUp } from '../lib/api'

export default function AuthPage({ mode }) {
  const isSignUp = mode === 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')
    setIsSubmitting(true)

    const form = new FormData(event.currentTarget)
    const data = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email')).trim().toLowerCase(),
      password: String(form.get('password')),
    }

    try {
      const result = isSignUp ? await signUp(data) : await logIn(data)
      saveSession(result.user, result.token)
      setMessage(result.message)
      if (isSignUp) event.currentTarget.reset()
    } catch (authError) {
      setError(authError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return <div className="auth-shell"><AuthHeader /><main className="auth-main"><section className="auth-intro"><p className="auth-kicker">ArticleHub Community</p><h1>{isSignUp ? 'Share ideas that matter.' : 'Welcome back, writer.'}</h1><p>{isSignUp ? 'Create your free account and join a community built around meaningful stories.' : 'Sign in to discover fresh perspectives and continue sharing your work.'}</p><div className="auth-benefits" aria-label="ArticleHub benefits"><span>✦ Publish your story</span><span>✦ Connect with readers</span><span>✦ Grow your audience</span></div></section><section className="auth-card" aria-labelledby="auth-title"><p className="auth-card-kicker">{isSignUp ? 'Start for free' : 'Member sign in'}</p><h2 id="auth-title">{isSignUp ? 'Create your account' : 'Sign in to ArticleHub'}</h2><p className="auth-switch">{isSignUp ? 'Already have an account?' : 'New to ArticleHub?'} <a href={isSignUp ? '#login' : '#signup'}>{isSignUp ? 'Log in' : 'Create an account'}</a></p><form className="auth-form" onSubmit={handleSubmit}>{isSignUp && <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" required /></label>}<label>Email address<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label><label>Password<span className="password-field"><input type={showPassword ? 'text' : 'password'} name="password" placeholder={isSignUp ? 'Create a password' : 'Enter your password'} autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength="6" required /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button></span></label>{!isSignUp && <a className="forgot-link" href="#forgot-password">Forgot password?</a>}{isSignUp && <label className="terms-check"><input type="checkbox" required /><span>I agree to the Terms of Service and Privacy Policy.</span></label>}<button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'} <span>→</span></button>{message && <p className="auth-success" role="status">{message}</p>}{error && <p className="form-error" role="alert">{error}</p>}</form><div className="auth-divider"><span>or continue with</span></div><a className="google-button" href="#google-signin">G <span>Google</span></a></section></main></div>
}
