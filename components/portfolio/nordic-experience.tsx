import Image from 'next/image'
import { ArrowDownRight, Compass, Waves, Mountain, ArrowUpRight } from 'lucide-react'

const chapters = [
  { number:'01', title:'The departure', text:'Leave the familiar shore. Let the open water redraw the map.', tag:'THE FIRST STEP' },
  { number:'02', title:'The crossing', text:'Weather changes. The sea tests every certainty you brought aboard.', tag:'THE UNKNOWN' },
  { number:'03', title:'The stillness', text:'Beyond the noise of conquest, there is room to hear yourself think.', tag:'A DIFFERENT KIND OF STRENGTH' },
  { number:'04', title:'A place of our own', text:'Build something worth protecting. Choose peace without mistaking it for weakness.', tag:'THE HORIZON' },
]

const worlds = [
  { title:'The old forest', note:'Where silence has roots.', image:'/images/nordic-forest.svg', number:'01' },
  { title:'The last coastline', note:'Where land gives way to possibility.', image:'/images/nordic-coast.svg', number:'02' },
  { title:'The northern settlement', note:'A small light against a vast world.', image:'/images/nordic-village.svg', number:'03' },
]

export default function NordicExperience() {
 return <main className="nordic-site">
  <a className="skip-link" href="#main-content">Skip to content</a>
  <section className="nordic-hero" id="top">
   <Image src="/images/nordic-hero.svg" alt="Original illustration of a Viking longship crossing a dark northern sea beneath distant mountains" fill priority sizes="100vw" className="hero-illustration"/>
   <div className="hero-grain"/>
   <header className="nordic-header">
    <a className="nordic-brand" href="#top"><span className="brand-mark">ᚠ</span><span>BEYOND THE HORIZON<small>A NORTHERN FIELD JOURNAL</small></span></a>
    <nav aria-label="Main navigation"><a href="#world">The world</a><a href="#journey">The journey</a><a href="#belief">The philosophy</a><a href="#end">The horizon</a></nav>
    <a className="header-index" href="#world">EXPLORE <ArrowUpRight size={13}/></a>
   </header>
   <div className="hero-copy">
    <div className="hero-kicker"><span/> AN ORIGINAL NORTHERN STORY <span className="kicker-line"/></div>
    <h1>BEYOND<br/><em>THE HORIZON</em></h1>
    <p>Some journeys are not about conquest.<br/>They are about discovering who we truly are.</p>
    <a className="hero-cta" href="#world">ENTER THE NORTH <ArrowDownRight size={16}/></a>
   </div>
   <div className="hero-bottom"><span>61° 08′ N &nbsp; / &nbsp; THE NORTHERN SEA</span><span className="hero-bottom-center">A WORLD BEYOND THE KNOWN</span><a href="#world">SCROLL TO WANDER <span>↓</span></a></div>
  </section>

  <section className="manifesto" id="main-content">
   <div className="manifesto-index">FIELD NOTE &nbsp; 001</div>
   <div className="manifesto-copy"><p className="overline">A DIFFERENT KIND OF DESTINATION</p><h2>The greatest journey<br/>is not <em>outward.</em></h2></div>
   <div className="manifesto-aside"><p>Across cold seas and unfamiliar lands, a quieter question waits: what does it mean to live well?</p><span>— THE NORTHERN CHRONICLES</span></div>
  </section>

  <section className="world-section" id="world">
   <div className="section-topline"><span>01 / THE WORLD</span><span>LANDSCAPES OF THE NORTH</span></div>
   <div className="world-heading"><h2>A world shaped<br/>by <em>wind & water.</em></h2><p>Vast, quiet, and indifferent to our ambitions.<br/>A place that reminds us how small—and alive—we are.</p></div>
   <div className="world-gallery">{worlds.map((world)=><article className="world-card" key={world.number}>
    <div className="world-art"><Image src={world.image} alt={world.title} fill sizes="(max-width:700px) 90vw, 33vw"/><span>{world.number}</span><div className="art-corner">NORTH / 01</div></div>
    <div className="world-card-caption"><h3>{world.title}</h3><p>{world.note}</p><ArrowUpRight size={17}/></div>
   </article>)}</div>
  </section>

  <section className="journey-section" id="journey">
   <div className="section-topline"><span>02 / THE JOURNEY</span><span>FOUR CHAPTERS · ONE TRANSFORMATION</span></div>
   <div className="journey-intro"><h2>Not every voyage<br/>needs a <em>victory.</em></h2><p>A passage through departure, uncertainty, reflection, and the courage to begin again.</p></div>
   <div className="chapter-list">{chapters.map((chapter)=><article className="chapter" key={chapter.number}><span className="chapter-number">{chapter.number}</span><div className="chapter-main"><span>{chapter.tag}</span><h3>{chapter.title}</h3></div><p>{chapter.text}</p><ArrowUpRight className="chapter-arrow" size={19}/></article>)}</div>
  </section>

  <section className="belief-section" id="belief">
   <Image src="/images/nordic-mountains.svg" alt="" fill sizes="100vw" className="belief-art"/>
   <div className="belief-shade"/>
   <div className="belief-content"><div className="section-topline"><span>03 / THE PHILOSOPHY</span><span>A QUIETER FORM OF COURAGE</span></div><span className="belief-quote-mark">“</span><blockquote>I have no enemies.<br/><em>The hardest battle is the one within.</em></blockquote><p>PEACE &nbsp; / &nbsp; FREEDOM &nbsp; / &nbsp; PURPOSE &nbsp; / &nbsp; HUMANITY</p></div>
  </section>

  <section className="north-principles">
   <div className="section-topline"><span>04 / WHAT REMAINS</span><span>NOTHING WORTH FINDING IS FOUND IN A HURRY</span></div>
   <div className="principle-grid"><article><Waves/><span>01 / PEACE</span><h3>Strength without<br/>the need to conquer.</h3><p>Peace is not surrender. It is the decision to stop making enemies of the world.</p></article><article><Compass/><span>02 / FREEDOM</span><h3>A direction of<br/>your own choosing.</h3><p>Freedom begins when the destination is no longer chosen for you.</p></article><article><Mountain/><span>03 / PURPOSE</span><h3>Build what<br/>outlives the storm.</h3><p>A meaningful life is measured by what it gives, not what it takes.</p></article></div>
  </section>

  <section className="final-horizon" id="end">
   <Image src="/images/nordic-sunset.svg" alt="A lone longship sailing toward a warm light on the distant horizon" fill sizes="100vw" className="final-art"/>
   <div className="final-overlay"/>
   <div className="final-content"><span className="overline">THE NORTH IS NOT THE END</span><h2>There is still<br/>a <em>world ahead.</em></h2><p>May the road be long. May the choices be yours.</p><a href="#top">RETURN TO THE BEGINNING <ArrowUpRight size={15}/></a></div>
   <footer className="nordic-footer"><a href="#top">BEYOND THE HORIZON</a><span>AN ORIGINAL DIGITAL EXPERIENCE</span><span>DESIGNED BY SNEHAPRIYAN · 2026</span></footer>
  </section>
 </main>
}
