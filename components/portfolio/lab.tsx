'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { experiments } from '@/lib/portfolio'

export function Lab() {
  const [active, setActive] = useState<number | null>(null)
  const [preview, setPreview] = useState(0)

  return (
    <section id="experiments" className="lab-section section-shell page-width" aria-labelledby="lab-heading">
      <div className="section-label"><span>02</span><span className="label-line" /><span>Play is part of the process</span></div>
      <div className="section-heading"><h2 id="lab-heading">The <em>Lab.</em><span className="heading-asterisk" aria-hidden="true">*</span></h2><p>Smaller ideas. Open-ended questions.<br />A place to follow the interesting bits.</p></div>
      <div className="lab-layout">
        <div className="lab-list">{experiments.map((item, index) => <div className={`lab-item ${active === index ? 'is-open' : ''}`} key={item.name} onMouseEnter={() => setPreview(index)}>
          <button id={`lab-trigger-${index}`} className="lab-trigger" aria-expanded={active === index} aria-controls={`lab-panel-${index}`} onFocus={() => setPreview(index)} onClick={() => { setActive(active === index ? null : index); setPreview(index) }}><span className="lab-number">0{index + 1}</span><span className="lab-name">{item.name}</span><span className="lab-toggle">{active === index ? <Minus size={17} /> : <Plus size={17} />}</span></button>
          <div id={`lab-panel-${index}`} role="region" aria-labelledby={`lab-trigger-${index}`} hidden={active !== index} className="lab-description"><span className="eyebrow">{item.category}</span><p>{item.description}</p></div>
        </div>)}</div>
        <aside className="lab-preview" aria-label="Experiment atmosphere"><div className="lab-preview-image">{experiments.map((item, index) => <Image key={item.name} src={item.image} alt={preview === index ? item.alt : ''} fill sizes="(max-width: 700px) 90vw, 35vw" className={preview === index ? 'preview-visible' : ''} aria-hidden={preview !== index} />)}<span className="preview-mark" aria-hidden="true"><ArrowUpRight size={21} /></span></div><div className="preview-caption"><span>{experiments[preview].category}</span><span>Exploration, not a finished thing.</span></div></aside>
      </div>
    </section>
  )
}
