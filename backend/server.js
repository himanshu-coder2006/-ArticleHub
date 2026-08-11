import { createServer } from 'node:http'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { createHmac, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const dataDirectory = process.env.DATA_DIRECTORY ? resolve(process.env.DATA_DIRECTORY) : join(currentDirectory, 'data')
const port = Number(process.env.PORT || 3001)
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])
const scrypt = promisify(scryptCallback)
const categories = new Set(['Travel', 'Real Estate', 'Technology', 'Health and Fitness', 'Shopping', 'Finance', 'Automotive', 'Home Improvement', 'Communications', 'Gaming', 'Internet', 'Food and Drinks', 'Art and Entertainment', 'Business', 'Careers', 'Education', 'Hobbies', 'Home and Family', 'Law'])
const jwtSecret = process.env.JWT_SECRET || 'articlehub-development-secret-change-me'
const jwtLifetimeSeconds = 60 * 60 * 24 * 7

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(body))
}

function setCorsHeaders(request, response) {
  const origin = request.headers.origin
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

async function readJsonBody(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > 1_000_000) {
      throw new Error('Request is too large.')
    }
  }

  try {
    return JSON.parse(body || '{}')
  } catch {
    throw new Error('Invalid JSON request body.')
  }
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function cleanFeaturedImage(image) {
  if (image == null) return null
  if (typeof image !== 'object') return null

  const name = cleanText(image.name, 180)
  const type = cleanText(image.type, 40)
  const size = Number(image.size)
  const dataUrl = typeof image.dataUrl === 'string' ? image.dataUrl : ''
  const supportedTypes = new Set(['image/jpeg', 'image/png', 'image/gif'])

  if (!name || !supportedTypes.has(type) || !Number.isFinite(size) || size < 1 || size > 200 * 1024 || !dataUrl.startsWith(`data:${type};base64,`)) return null
  return { name, type, size, dataUrl }
}

async function saveRecord(filename, record) {
  await mkdir(dataDirectory, { recursive: true })
  const filePath = join(dataDirectory, filename)
  let records = []

  try {
    records = JSON.parse(await readFile(filePath, 'utf8'))
    if (!Array.isArray(records)) records = []
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  records.push(record)
  const temporaryPath = `${filePath}.tmp`
  await writeFile(temporaryPath, JSON.stringify(records, null, 2), 'utf8')
  await rename(temporaryPath, filePath)
}

async function getRecords(filename) {
  try {
    const records = JSON.parse(await readFile(join(dataDirectory, filename), 'utf8'))
    return Array.isArray(records) ? records : []
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = await scrypt(password, salt, 64)
  return { salt, hash: hash.toString('hex') }
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email }
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url')
}

function signToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const header = encodeBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = encodeBase64Url(JSON.stringify({ sub: user.id, email: user.email, iat: now, exp: now + jwtLifetimeSeconds }))
  const signature = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${signature}`
}

function verifyToken(token) {
  if (typeof token !== 'string') return null
  const [header, payload, signature] = token.split('.')
  if (!header || !payload || !signature) return null

  const expectedSignature = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest()
  const receivedSignature = Buffer.from(signature, 'base64url')
  if (receivedSignature.length !== expectedSignature.length || !timingSafeEqual(receivedSignature, expectedSignature)) return null

  try {
    const decodedHeader = JSON.parse(Buffer.from(header, 'base64url').toString('utf8'))
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (decodedHeader.alg !== 'HS256' || !decodedPayload.sub || !Number.isFinite(decodedPayload.exp) || decodedPayload.exp <= Math.floor(Date.now() / 1000)) return null
    return decodedPayload
  } catch {
    return null
  }
}

async function getAuthenticatedUser(request) {
  const [scheme, token] = (request.headers.authorization || '').split(' ')
  if (scheme !== 'Bearer' || !token) return null
  const payload = verifyToken(token)
  if (!payload) return null
  const users = await getRecords('users.json')
  const user = users.find((candidate) => candidate.id === payload.sub && candidate.email === payload.email)
  return user ? publicUser(user) : null
}

function createRecord(data) {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  }
}

function createAuthorSummary(author, articleCount) {
  const initials = author.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return {
    id: author.id,
    initials: initials || 'AH',
    name: author.name,
    bio: `ArticleHub contributor · ${articleCount} article${articleCount === 1 ? '' : 's'} submitted`,
    articleCount,
  }
}

async function handleAuthors(request, response) {
  const submissions = await getRecords('article-submissions.json')
  const groupedAuthors = new Map()

  for (const submission of submissions) {
    if (!submission.author?.id || !submission.author?.name) continue
    const entry = groupedAuthors.get(submission.author.id) || { author: submission.author, articleCount: 0 }
    entry.articleCount += 1
    groupedAuthors.set(submission.author.id, entry)
  }

  const authors = [...groupedAuthors.values()]
    .map(({ author, articleCount }) => createAuthorSummary(author, articleCount))
    .sort((first, second) => second.articleCount - first.articleCount || first.name.localeCompare(second.name))
  return sendJson(response, 200, { authors })
}

async function handleContributor(request, response, contributorId) {
  const submissions = (await getRecords('article-submissions.json')).filter((submission) => submission.author?.id === contributorId)
  if (!submissions.length) return sendJson(response, 404, { message: 'Contributor not found.' })

  const author = createAuthorSummary(submissions[0].author, submissions.length)
  const stories = submissions.map((submission) => ({ id: submission.id, title: submission.title, topic: submission.topic, createdAt: submission.createdAt }))
  return sendJson(response, 200, { author, stories })
}

async function handleContact(request, response) {
  const body = await readJsonBody(request)
  const contact = {
    name: cleanText(body.name, 100),
    email: cleanText(body.email, 254).toLowerCase(),
    subject: cleanText(body.subject, 180),
    message: cleanText(body.message, 5000),
  }

  if (!contact.name || !contact.subject || !contact.message || !isValidEmail(contact.email)) {
    return sendJson(response, 400, { message: 'Please complete all fields with a valid email address.' })
  }

  await saveRecord('contact-messages.json', createRecord(contact))
  return sendJson(response, 201, { message: `Thanks, ${contact.name}! Your message has been received.` })
}

async function handleSubmission(request, response, author) {
  const body = await readJsonBody(request)
  const submission = {
    title: cleanText(body.title, 180),
    topic: cleanText(body.topic, 80),
    article: cleanText(body.article, 30000),
    copyright: body.copyright === true,
    featuredImage: cleanFeaturedImage(body.featuredImage),
  }

  if (!submission.title || !submission.topic || !submission.article || !submission.copyright) {
    return sendJson(response, 400, { message: 'Please complete the category, title and article content, then confirm it is original.' })
  }

  if (!categories.has(submission.topic)) {
    return sendJson(response, 400, { message: 'Please choose a valid category.' })
  }

  if (body.featuredImage != null && !submission.featuredImage) {
    return sendJson(response, 400, { message: 'Featured image must be a JPG, JPEG, PNG, or GIF no larger than 200 KB.' })
  }

  await saveRecord('article-submissions.json', createRecord({ ...submission, author }))
  return sendJson(response, 201, { message: `Thanks! “${submission.title}” has been submitted for editorial review.` })
}

async function handleSignup(request, response) {
  const body = await readJsonBody(request)
  const name = cleanText(body.name, 100)
  const email = cleanText(body.email, 254).toLowerCase()
  const password = typeof body.password === 'string' ? body.password : ''

  if (!name || !isValidEmail(email) || password.length < 6 || password.length > 128) {
    return sendJson(response, 400, { message: 'Enter your name, a valid email address and a password of at least 6 characters.' })
  }

  const users = await getRecords('users.json')
  if (users.some((user) => user.email === email)) {
    return sendJson(response, 409, { message: 'An account already exists for this email address.' })
  }

  const passwordData = await hashPassword(password)
  const user = createRecord({ name, email, ...passwordData })
  await saveRecord('users.json', user)
  return sendJson(response, 201, { message: 'Account created. You are signed in now.', user: publicUser(user), token: signToken(user) })
}

async function handleLogin(request, response) {
  const body = await readJsonBody(request)
  const email = cleanText(body.email, 254).toLowerCase()
  const password = typeof body.password === 'string' ? body.password : ''
  const users = await getRecords('users.json')
  const user = users.find((candidate) => candidate.email === email)

  if (!user || !password || !user.salt || !user.hash) {
    return sendJson(response, 401, { message: 'Email or password is incorrect.' })
  }

  const { hash } = await hashPassword(password, user.salt)
  const isCorrect = timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(user.hash, 'hex'))
  if (!isCorrect) return sendJson(response, 401, { message: 'Email or password is incorrect.' })

  return sendJson(response, 200, { message: `Welcome back, ${user.name || 'reader'}!`, user: publicUser(user), token: signToken(user) })
}

const server = createServer(async (request, response) => {
  setCorsHeaders(request, response)

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    return response.end()
  }

  try {
    if (request.method === 'GET' && request.url === '/api/health') {
      return sendJson(response, 200, { status: 'ok' })
    }
    if (request.method === 'POST' && request.url === '/api/contact') {
      return await handleContact(request, response)
    }
    if (request.method === 'POST' && request.url === '/api/submissions') {
      const user = await getAuthenticatedUser(request)
      if (!user) return sendJson(response, 401, { message: 'Please sign in before submitting an article.' })
      return await handleSubmission(request, response, user)
    }
    if (request.method === 'POST' && request.url === '/api/auth/signup') {
      return await handleSignup(request, response)
    }
    if (request.method === 'POST' && request.url === '/api/auth/login') {
      return await handleLogin(request, response)
    }
    if (request.method === 'GET' && request.url === '/api/auth/me') {
      const user = await getAuthenticatedUser(request)
      if (!user) return sendJson(response, 401, { message: 'Your session has expired. Please sign in again.' })
      return sendJson(response, 200, { user })
    }
    if (request.method === 'GET' && request.url === '/api/authors') {
      return await handleAuthors(request, response)
    }
    const contributorMatch = request.method === 'GET' ? request.url.match(/^\/api\/authors\/([a-f0-9-]+)$/i) : null
    if (contributorMatch) {
      return await handleContributor(request, response, contributorMatch[1])
    }
    return sendJson(response, 404, { message: 'Route not found.' })
  } catch (error) {
    const statusCode = error.message === 'Request is too large.' || error.message === 'Invalid JSON request body.' ? 400 : 500
    console.error(error)
    return sendJson(response, statusCode, { message: statusCode === 400 ? error.message : 'Unable to save your request. Please try again.' })
  }
})

server.listen(port, () => {
  console.log(`ArticleHub API is running at http://localhost:${port}`)
})
