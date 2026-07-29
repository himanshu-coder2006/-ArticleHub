import { createServer } from 'node:http'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const dataDirectory = join(currentDirectory, 'data')
const port = Number(process.env.PORT || 3001)
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])

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
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
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

function createRecord(data) {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  }
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

async function handleSubmission(request, response) {
  const body = await readJsonBody(request)
  const submission = {
    title: cleanText(body.title, 180),
    topic: cleanText(body.topic, 80),
    author: cleanText(body.author, 100),
    email: cleanText(body.email, 254).toLowerCase(),
    article: cleanText(body.article, 30000),
  }

  if (!submission.title || !submission.topic || !submission.author || !submission.article || !isValidEmail(submission.email)) {
    return sendJson(response, 400, { message: 'Please complete all article fields with a valid email address.' })
  }

  await saveRecord('article-submissions.json', createRecord(submission))
  return sendJson(response, 201, { message: `Thanks! “${submission.title}” has been submitted for editorial review.` })
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
      return await handleSubmission(request, response)
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
