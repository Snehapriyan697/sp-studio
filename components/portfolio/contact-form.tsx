'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Something went wrong. Please try again.')
      form.reset()
      setStatus('success')
      setFeedback(result.message || 'Message sent successfully.')
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message right now.')
    }
  }

  return (
    <form className="pro-contact-form" onSubmit={handleSubmit}>
      <div className="pro-form-row">
        <label>Your name<input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder="How should I call you?" required disabled={status === 'sending'} /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required disabled={status === 'sending'} /></label>
      </div>
      <label>Your message<textarea name="message" minLength={10} maxLength={4000} rows={5} placeholder="Tell me a little about what you have in mind..." required disabled={status === 'sending'} /></label>
      <div className="pro-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="pro-form-bottom">
        <button className="pro-button pro-button-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? <>SENDING <LoaderCircle size={15} className="pro-spin" /></> : <>SEND MESSAGE <ArrowUpRight size={15} /> </>}
        </button>
        <p className={`pro-form-feedback pro-form-${status}`} aria-live="polite">
          {status === 'success' && <CheckCircle2 size={15} />}
          {feedback}
        </p>
      </div>
    </form>
  )
}
