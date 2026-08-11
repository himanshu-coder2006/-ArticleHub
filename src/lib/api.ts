export type ApiRecord = Record<string, unknown>

export interface SessionUser {
  email: string
  name?: string
  [key: string]: unknown
}

export interface AuthPayload {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  user: SessionUser
  token: string
  message: string
}

export function saveSession(user: SessionUser, token: string): void {
  localStorage.setItem('articlehubUser', JSON.stringify(user))
  localStorage.setItem('articlehubSession', JSON.stringify({ email: user.email, signedInAt: Date.now(), token }))
}

export function getSessionToken(): string {
  try {
    return JSON.parse(localStorage.getItem('articlehubSession') || 'null')?.token || ''
  } catch {
    return ''
  }
}

export function clearSession(): void {
  localStorage.removeItem('articlehubUser')
  localStorage.removeItem('articlehubSession')
}

export async function submitToApi<T extends object = ApiRecord>(endpoint: string, data: object): Promise<T> {
  let response: Response
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
  const result: ApiRecord = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(typeof result.message === 'string' ? result.message : 'Something went wrong. Please try again.')
  return result as T
}

export async function getFromApi<T extends object = ApiRecord>(endpoint: string): Promise<T> {
  let response: Response
  try {
    const token = getSessionToken()
    response = await fetch(endpoint, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  } catch {
    throw new Error('Unable to reach the ArticleHub service. Please try again.')
  }
  const result: ApiRecord = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(typeof result.message === 'string' ? result.message : 'Something went wrong. Please try again.')
  return result as T
}

export function signUp(data: AuthPayload): Promise<AuthResponse> {
  return submitToApi<AuthResponse>('/api/auth/signup', data)
}

export function logIn(data: AuthPayload): Promise<AuthResponse> {
  return submitToApi<AuthResponse>('/api/auth/login', data)
}
