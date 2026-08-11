export function saveSession(user, token) {
  localStorage.setItem('articlehubUser', JSON.stringify(user))
  localStorage.setItem('articlehubSession', JSON.stringify({ email: user.email, signedInAt: Date.now(), token }))
}

export function getSessionToken() {
  try {
    return JSON.parse(localStorage.getItem('articlehubSession') || 'null')?.token || ''
  } catch {
    return ''
  }
}

export function clearSession() {
  localStorage.removeItem('articlehubUser')
  localStorage.removeItem('articlehubSession')
}

export async function submitToApi(endpoint, data) {
  let response
  try {
    const token = getSessionToken()
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(data),
    })
  } catch {
    throw new Error('Unable to reach the submission service. Please start the ArticleHub API and try again.')
  }
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message || 'Something went wrong. Please try again.')
  return result
}

export async function getFromApi(endpoint) {
  let response
  try {
    const token = getSessionToken()
    response = await fetch(endpoint, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  } catch {
    throw new Error('Unable to reach the ArticleHub service. Please try again.')
  }
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message || 'Something went wrong. Please try again.')
  return result
}

export function signUp(data) {
  return submitToApi('/api/auth/signup', data)
}

export function logIn(data) {
  return submitToApi('/api/auth/login', data)
}
