'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ArrowUpRight, Box, RotateCcw, X } from 'lucide-react'
import { Component, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { currentlyBuilding } from '@/lib/portfolio'

const IslandScene = dynamic(() => import('./island-scene'), { ssr: false, loading: () => <div className="scene-loading" role="status">Finding our little island…</div> })

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="scene-loading">A still moment. Interactive 3D isn&apos;t available on this device.</div> : this.props.children }
}

export function LittleWorld() {
  const [entered, setEntered] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [visible, setVisible] = useState(false)
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    if (stage.current) observer.observe(stage.current)
    return () => observer.disconnect()
  }, [])

  function enter() {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setEntered(true)
  }

  return (
    <section className="world-section" aria-labelledby="world-heading">
      <div className="page-width world-heading"><div className="section-label"><span>03</span><span className="label-line" /><span>A small detour</span></div><h2 id="world-heading">Somewhere between<br />code and <em>imagination.</em></h2><p>Sometimes, an idea just needs a little room to exist.</p></div>
      <div ref={stage} className="world-stage" aria-label="An interactive miniature island with a cabin and trees">
        <Image src="/images/little-world.png" alt="A miniature mossy island, evergreen trees, and a warmly lit wooden cabin on a dark ocean" fill sizes="100vw" className="world-still" />
        {entered && visible && <div className="world-canvas"><SceneBoundary><IslandScene reducedMotion={reducedMotion} onCabinClick={() => setRevealed(true)} /></SceneBoundary></div>}
        <div className="world-controls">{entered ? <><span className="world-hint">Move slowly. Find the light.</span><button className="world-button" onClick={() => setRevealed(!revealed)} aria-expanded={revealed} aria-controls="island-note">{revealed ? 'Close field note' : 'Visit the cabin'}<ArrowUpRight size={14} aria-hidden="true" /></button><button className="world-reset" aria-label="Return to the still landscape" onClick={() => { setEntered(false); setRevealed(false) }}><RotateCcw size={15} aria-hidden="true" /></button></> : <button className="world-button" onClick={enter}><Box size={15} aria-hidden="true" />Enter the little world<ArrowUpRight size={14} aria-hidden="true" /></button>}</div>
        {revealed && <div id="island-note" className="island-note" role="region" aria-label="Currently building"><button aria-label="Close field note" onClick={() => setRevealed(false)}><X size={16} /></button><span className="eyebrow"><span className="status-dot" /> Currently building</span><h3>A light left on<br />for the next idea.</h3><p>{currentlyBuilding}</p></div>}
      </div>
      <div className="currently-building page-width"><span className="eyebrow"><span className="status-dot" /> Currently building</span><p>{currentlyBuilding}</p><ArrowUpRight className="building-mark" size={20} aria-hidden="true" /></div>
    </section>
  )
}
