import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
const reply = (message: string, status: number) => NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || new URL(origin).origin !== new URL(request.url).origin) return reply('Request not allowed.', 403)
  if (Number(request.headers.get('content-length') || 0) > 8000) return reply('Message is too large.', 413)

  let body: Record<string, unknown>
  try {
    const rawBody = await request.text()
    if (rawBody.length > 8000) return reply('Message is too large.', 413)
    const parsed: unknown = JSON.parse(rawBody)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reply('Please send a valid message.', 400)
    body = parsed as Record<string, unknown>
  } catch { return reply('Please send a valid message.', 400) }
  if (typeof body.website === 'string' && body.website.trim()) return reply('Thanks — your message was received.', 200)

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (name.length < 2 || name.length > 80) return reply('Please enter a name between 2 and 80 characters.', 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) return reply('Please enter a valid email address.', 400)
  if (message.length < 10 || message.length > 4000) return reply('Your message should be between 10 and 4,000 characters.', 400)

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return reply('Contact service is not configured yet.', 503)
  const supabaseHeaders = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  const ip = (request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  const ipHash = createHash('sha256').update(ip).digest('hex')
  let limitResponse: Response
  try {
    limitResponse = await fetch(`${url}/rest/v1/rpc/check_contact_rate_limit`, {
      method: 'POST', headers: supabaseHeaders,
      body: JSON.stringify({ ip_hash: ipHash, max_requests: 4, window_seconds: 3600 }),
      signal: AbortSignal.timeout(8000),
    })
  } catch { return reply('Contact service is temporarily unavailable.', 503) }
  if (!limitResponse.ok) {
    console.error('Contact rate-limit check failed:', limitResponse.status)
    return reply('Contact service is temporarily unavailable.', 503)
  }
  if (!await limitResponse.json()) return reply('Too many messages. Please try again in an hour.', 429)

  let saveResponse: Response
  try {
    saveResponse = await fetch(`${url}/rest/v1/contact_messages`, {
      method: 'POST', headers: { ...supabaseHeaders, Prefer: 'return=representation' },
      body: JSON.stringify({ name, email, message }),
      signal: AbortSignal.timeout(8000),
    })
  } catch { return reply('Your message could not be saved. Please try again later.', 503) }
  const savedRows = saveResponse.ok ? await saveResponse.json() : []
  const saved = Array.isArray(savedRows) ? savedRows[0] : null
  if (!saveResponse.ok || !saved?.id) {
    console.error('Contact message save failed:', saveResponse.status)
    return reply('Your message could not be saved. Please try again later.', 503)
  }

  let emailSent = false
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL && process.env.CONTACT_FROM_EMAIL) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_EMAIL], reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nMessage ID: ${saved.id}`,
        }),
        signal: AbortSignal.timeout(8000),
      })
      emailSent = response.ok
      if (!response.ok) console.error('Contact notification email failed:', response.status)
    } catch (err) { console.error('Contact notification email failed:', err) }
  }
  return NextResponse.json({ message: 'Thanks — your message has been saved. I’ll be in touch soon.', emailSent }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
}
