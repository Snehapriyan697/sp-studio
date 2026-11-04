'use client'

import { ArrowDown, ArrowUpRight, Asterisk, Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

const links = [
  ['The world', '#north'],
  ['The journey', '#journey'],
  ['Philosophy', '#philosophy'],
  ['About', '#about'],
]

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const art = useRef<HTMLDivElement>(null)

  function moveLandscape(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    if (art.current) art.current.style.transform = `translate3d(${x * -9}px, ${y * -6}px, 0) scale(1.04)`
  }

  function resetLandscape() {
    if (art.current) art.current.style.transform = 'translate3d(0, 0, 0) scale(1.04)'
  }

  return (
    <section id="home" className="hero saga-hero" aria-labelledby="hero-heading" onPointerMove={moveLandscape} onPointerLeave={resetLandscape}>
      <div className="hero-art saga-art" ref={art}>
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/images/northern-shore.png" aria-hidden="true">
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade saga-shade" />
      <header className="site-header page-width">
        <a href="#home" className="wordmark" aria-label="Beyond the Horizon, home"><Asterisk aria-hidden="true" /><span>BEYOND<span className="wordmark-dot">.</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}{label === 'About' && <ArrowUpRight aria-hidden="true" />}</a>)}
        </nav>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false) }}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight aria-hidden="true" /></a>)}
        </nav>}
      </header>
      <div className="hero-content page-width saga-hero-content">
        <div className="eyebrow hero-eyebrow"><span className="status-dot" /> A story written by wind and water</div>
        <h1 id="hero-heading">BEYOND<br /><em>THE HORIZON</em></h1>
        <p>Some journeys are not about conquest.<br className="desktop-break" /> They are about discovering who we truly are.</p>
        <a href="#north" className="text-link hero-link">Enter the north <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
      <div className="hero-bottom page-width">
        <a href="#intro" className="scroll-link"><span className="scroll-line" />Scroll to wander</a>
        <span className="hero-note">A quieter world lies beyond the waves.</span>
        <span className="landscape-label"><span className="tiny-cross">+</span> 63° NORTH · OPEN WATER</span>
      </div>
    </section>
  )
}
