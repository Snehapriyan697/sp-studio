import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowDownRight, ArrowUpRight, Asterisk, Braces, Cpu, Layers3, Mail, Sparkles } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/portfolio/hero-scene'), {
  ssr: false,
  loading: () => <div className="pro-scene pro-scene-loading" aria-hidden="true"><div className="pro-scene-glow" /><div className="scene-fallback-orb" /></div>,
})

const explorations = [
  {
    number: '01',
    name: 'OVERDRIVE',
    type: 'GAME SYSTEMS / INTERACTIVE WORLDS',
    description: 'A modular 2D action-game experiment exploring procedural weapon combinations, responsive combat, and replayable systems.',
    status: 'IN DEVELOPMENT',
    image: '/images/little-world.png',
    alt: 'A stylised miniature world representing an experimental game environment',
    tags: ['GODOT', 'GAME SYSTEMS', 'PROCEDURAL DESIGN'],
  },
  {
    number: '02',
    name: 'CODEBOUND / ASCENSION',
    type: 'EDTECH / LEARNING EXPERIENCE',
    description: 'An idea for turning programming fundamentals into a world of quests, progression, and hands-on problem solving.',
    status: 'CONCEPT',
    image: '/images/quiet-studio.png',
    alt: 'A warm, considered creative workspace',
    tags: ['PYTHON', 'C++', 'INTERACTIVE LEARNING'],
  },
]

const capabilities = [
  { icon: Braces, index: '01', title: 'Web engineering', text: 'Responsive interfaces, thoughtful component systems, and fast experiences built with modern web technologies.' },
  { icon: Sparkles, index: '02', title: 'AI & automation', text: 'Practical experiments with AI tools, agents, and workflows that make complex tasks feel simpler.' },
  { icon: Layers3, index: '03', title: 'Creative technology', text: 'Exploring motion, 3D, generative visuals, and the details that make digital products memorable.' },
]

export default function ProfessionalHome() {
  return (
    <main className="pro-site">
      <a className="pro-skip" href="#main">Skip to content</a>
      <header className="pro-header">
        <a className="pro-brand" href="#home" aria-label="Snehapriyan, home"><span className="pro-brand-mark">S<span>.</span></span><span className="pro-brand-name">SNEHAPRIYAN<small>CREATIVE DEVELOPER</small></span></a>
        <nav className="pro-nav" aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#capabilities">What I do</a>
          <a href="#about">About</a>
        </nav>
        <a className="pro-header-cta" href="#contact">LET’S TALK <ArrowUpRight size={14} /></a>
      </header>

      <section className="pro-hero" id="home" aria-labelledby="pro-hero-title">
        <div className="pro-hero-grid" />
        <div className="pro-hero-copy" id="main">
          <p className="pro-eyebrow"><span className="pro-live-dot" /> INDEPENDENT CREATIVE DEVELOPER <span className="pro-eyebrow-rule" /></p>
          <h1 id="pro-hero-title">Ideas into<br /><em>experiences.</em></h1>
          <p className="pro-hero-description">I’m Snehapriyan — an AI developer and web designer exploring the space between thoughtful design, modern code, and emerging technology.</p>
          <div className="pro-hero-actions">
            <a className="pro-button pro-button-primary" href="#work">EXPLORE MY WORK <ArrowDownRight size={16} /></a>
            <a className="pro-text-link" href="#about">A LITTLE ABOUT ME <ArrowUpRight size={14} /></a>
          </div>
          <div className="pro-hero-meta"><span>BASED IN KERALA, INDIA</span><span>DESIGN-LED · CODE-DRIVEN</span></div>
        </div>
        <HeroScene />
        <div className="pro-hero-side-note">DIGITAL CRAFT<br />WITH A HUMAN EDGE</div>
      </section>

      <section className="pro-intro">
        <span className="pro-section-index">01 / THE APPROACH</span>
        <p>Good digital work should feel <em>clear, considered, and a little unexpected.</em> I care about how things work — and just as much about how they make people feel.</p>
        <Asterisk className="pro-intro-mark" strokeWidth={1} />
      </section>

      <section className="pro-work section-pad" id="work" aria-labelledby="work-title">
        <div className="pro-section-head">
          <div><span className="pro-section-index">02 / SELECTED EXPLORATIONS</span><h2 id="work-title">Curiosity, made<br /><em>tangible.</em></h2></div>
          <p>A few ideas and experiments from the workbench. These are works in progress — built to learn, test, and push an idea a little further.</p>
        </div>
        <div className="pro-project-grid">
          {explorations.map((item) => (
            <article className="pro-project" key={item.number}>
              <div className="pro-project-visual">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                <span className="pro-project-number">{item.number} / EXPLORATION</span>
                <span className="pro-project-status">{item.status}</span>
                <div className="pro-project-image-title">{item.name}</div>
              </div>
              <div className="pro-project-info">
                <span className="pro-project-type">{item.type}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="pro-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pro-capabilities section-pad" id="capabilities" aria-labelledby="capabilities-title">
        <div className="pro-section-head">
          <div><span className="pro-section-index">03 / CAPABILITIES</span><h2 id="capabilities-title">Different tools.<br /><em>One curiosity.</em></h2></div>
          <p>I like working across disciplines. The right tools depend on the problem, the people, and the experience we want to create.</p>
        </div>
        <div className="pro-capability-list">
          {capabilities.map(({ icon: Icon, index, title, text }) => (
            <article className="pro-capability" key={index}>
              <span className="pro-capability-index">{index}</span>
              <div className="pro-capability-icon"><Icon size={21} strokeWidth={1.35} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowUpRight className="pro-capability-arrow" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="pro-about section-pad" id="about" aria-labelledby="about-title">
        <div className="pro-about-art">
          <Image src="/images/northern-shore.png" alt="A quiet northern shoreline under a soft, atmospheric sky" fill sizes="(max-width: 760px) 100vw, 45vw" />
          <span>NOT JUST HOW IT LOOKS.<br />HOW IT WORKS.</span>
        </div>
        <div className="pro-about-copy">
          <span className="pro-section-index">04 / THE PERSON BEHIND THE PIXELS</span>
          <h2 id="about-title">Building with<br /><em>intention.</em></h2>
          <p>I’m drawn to the process of turning an open-ended idea into something real. Sometimes that means shaping an interface; sometimes it means experimenting with an AI workflow, a game mechanic, or a small 3D world.</p>
          <p>I’m still learning, testing, and refining — and I think that’s part of the point. The best work usually starts with a better question.</p>
          <div className="pro-about-signoff"><span className="pro-signature">Snehapriyan</span><span>DESIGN · DEVELOPMENT · EXPERIMENTATION</span></div>
        </div>
      </section>

      <section className="pro-contact" id="contact" aria-labelledby="contact-title">
        <div className="pro-contact-orbit" aria-hidden="true" />
        <span className="pro-section-index">05 / HAVE SOMETHING IN MIND?</span>
        <h2 id="contact-title">Let’s make<br /><em>something matter.</em></h2>
        <p>Have an interesting idea, a project to explore, or just want to talk about creative technology?</p>
        <a className="pro-button pro-button-primary" href="https://github.com/Snehapriyan697" target="_blank" rel="noopener noreferrer">FIND ME ON GITHUB <ArrowUpRight size={16} /></a>
      </section>

      <footer className="pro-footer">
        <a className="pro-footer-brand" href="#home">SNEHAPRIYAN<span>.</span></a>
        <span>INDEPENDENTLY CURIOUS. ALWAYS BUILDING.</span>
        <div><a href="https://github.com/Snehapriyan697" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={13} /></a><a href="#home">BACK TO TOP ↑</a></div>
        <small>© {new Date().getFullYear()} SNEHAPRIYAN</small>
      </footer>
    </main>
  )
}
