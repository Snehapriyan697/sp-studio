'use client'

import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Asterisk, Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

const links = [ ['Work', '#work'], ['Experiments', '#experiments'], ['About', '#about'], ['Contact', '#contact'] ]

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const art = useRef<HTMLDivElement>(null)

  function moveLandscape(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    if (art.current) art.current.style.transform = `translate3d(${x * -10}px, ${y * -7}px, 0) scale(1.025)`
  }

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading" onPointerMove={moveLandscape} onPointerLeave={() => { if (art.current) art.current.style.transform = 'translate3d(0, 0, 0) scale(1.025)' }}>
      <div className="hero-art" ref={art}>
        <Image src="/images/northern-shore.png" alt="A quiet northern coastline, distant mountains, and a small cabin with a warmly lit window" fill priority sizes="100vw" quality={85} className="object-cover" />
      </div>
      <div className="hero-shade" />
      <header className="site-header page-width">
        <a href="#home" className="wordmark" aria-label="Snehapriyan, home"><Asterisk aria-hidden="true" /><span>Snehapriyan<span className="wordmark-dot">.</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}{label === 'Contact' && <ArrowUpRight aria-hidden="true" />}</a>)}
        </nav>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false) }}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight aria-hidden="true" /></a>)}
        </nav>}
      </header>
      <div className="hero-content page-width">
        <div className="eyebrow hero-eyebrow"><span className="status-dot" /> A small corner of the internet</div>
        <h1 id="hero-heading">I build things with<br />AI, code, and <em>curiosity.</em></h1>
        <p>AI developer &amp; web designer creating thoughtful digital<br className="desktop-break" /> experiences, experiments, and useful little systems.</p>
        <a href="#work" className="text-link hero-link">Explore my work <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
      <div className="hero-bottom page-width">
        <a href="#intro" className="scroll-link"><span className="scroll-line" />Scroll to wander</a>
        <span className="hero-note">Somewhere between imagination &amp; the internet.</span>
        <span className="landscape-label"><span className="tiny-cross">+</span> A quieter perspective</span>
      </div>
    </section>
  )
}
