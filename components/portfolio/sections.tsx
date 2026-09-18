import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Asterisk, Code2, Link2, Mail, Plus } from 'lucide-react'
import { contact, projects } from '@/lib/portfolio'

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" /><span>{children}</span></div>
}

export function Introduction() {
  return (
    <section id="intro" className="intro-section page-width" aria-labelledby="intro-heading">
      <div className="intro-note"><Asterisk aria-hidden="true" /><span>A developer&apos;s mind.<br />A maker&apos;s curiosity.</span></div>
      <div className="intro-copy"><h2 id="intro-heading">Good things begin with<br />a little <em>“what if?”</em></h2><p>I&apos;m Snehapriyan. I work at the intersection of AI, design, and the web—following ideas and seeing where they lead.</p><a href="#about" className="text-link">A little more about me <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <span className="intro-index" aria-hidden="true">( Hello, world. )</span>
    </section>
  )
}

export function SelectedWork() {
  return (
    <section id="work" className="section-shell page-width" aria-labelledby="work-heading">
      <SectionLabel number="01">Ideas, made tangible</SectionLabel>
      <div className="section-heading"><h2 id="work-heading">Selected <em>work.</em></h2><p>A few things from the workbench.<br />Thoughtfully built. Always evolving.</p></div>
      {projects.length > 0 ? <div className="project-list">{projects.map((project, index) => (
        <a className="project-feature" href={project.url} target="_blank" rel="noopener noreferrer" key={project.name}>
          <div className="project-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 65vw" /><span className="project-view">View project <ArrowUpRight size={16} /></span></div>
          <div className="project-info"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.year}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-tech">{project.technologies.join(' / ')}</div><ArrowUpRight size={22} aria-hidden="true" /></div>
        </a>
      ))}</div> : <div className="workbench">
        <div className="workbench-image"><Image src="/images/quiet-studio.png" alt="An imagined quiet workbench: laptop, notebook, and warm lamplight overlooking a misty forest" fill sizes="(max-width: 700px) 100vw, 60vw" /><span className="image-caption">A little space for the next idea.</span></div>
        <div className="workbench-copy"><span className="eyebrow"><span className="status-dot" /> From the workbench</span><h3>A few things <br />are taking shape.</h3><p>I&apos;m making room here for the projects worth sharing. Real work, with the thinking and experiments behind it.</p><span className="unpublished-note">No projects published here yet.</span><a href="#experiments" className="text-link">In the meantime, explore the lab <ArrowDown size={15} aria-hidden="true" /></a></div>
      </div>}
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="about-section section-shell page-width" aria-labelledby="about-heading">
      <SectionLabel number="04">The person behind the pixels</SectionLabel>
      <div className="about-grid">
        <div className="about-art"><Image src="/images/northern-shore.png" alt="Warm light over a quiet rocky coastline" fill sizes="(max-width: 700px) 100vw, 40vw" /><div className="about-art-caption"><Asterisk size={22} aria-hidden="true" /><span>Room to think.<br />Space to build.</span></div></div>
        <div className="about-copy"><h2 id="about-heading">A little <em>about me.</em></h2><p>I&apos;m Snehapriyan, an AI developer and web designer interested in the space where software, design, and emerging technology meet.</p><p>I enjoy taking an idea, breaking it apart, experimenting with different approaches, and turning it into something people can actually interact with.</p><div className="beyond"><h3><Plus size={13} aria-hidden="true" /> Beyond the browser.</h3><p>Usually curious about something—AI, games, 3D, motorcycles, or a new thing to learn. Not everything needs to become a project.</p></div></div>
      </div>
      <div className="tools-section"><div><h3>Things I work with</h3><p>The tools follow the idea, not the other way around.</p></div><div className="tool-categories"><div><span className="eyebrow">AI</span><p>Agents &amp; automation</p></div><div><span className="eyebrow">Web</span><p>Design &amp; development</p></div><div><span className="eyebrow">Creative</span><p>Code &amp; little worlds</p></div></div></div>
      <p className="site-stack">This little corner is built with Next.js, React, TypeScript, and Three.js.</p>
    </section>
  )
}

export function Contact() {
  const links = [
    { label: 'GitHub', href: contact.github, Icon: Code2 },
    { label: 'LinkedIn', href: contact.linkedin, Icon: Link2 },
    { label: 'Email', href: contact.email ? `mailto:${contact.email}` : null, Icon: Mail },
  ]
  return (
    <>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-landscape" aria-hidden="true"><Image src="/images/northern-shore.png" alt="" fill sizes="100vw" /></div>
        <div className="page-width contact-content"><SectionLabel number="05">An open invitation</SectionLabel><h2 id="contact-heading">Let&apos;s make<br />something <em>interesting.</em></h2><p>Have an idea, experiment, or simply want to talk<br className="desktop-break" /> about something you&apos;re building?</p><div className="contact-links">{links.map(({ label, href, Icon }) => href ? <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel={label !== 'Email' ? 'noopener noreferrer' : undefined}><Icon size={15} aria-hidden="true" />{label}<ArrowUpRight size={15} aria-hidden="true" /></a> : <span key={label} className="contact-placeholder"><Icon size={15} aria-hidden="true" />{label}<span>{label === 'Email' ? 'Add email' : 'Add link'}</span></span>)}</div></div>
      </section>
      <footer className="footer page-width"><a href="#home" className="footer-brand">Snehapriyan<span>.</span><span className="footer-role">AI developer / Web designer</span></a><span className="footer-note">Built with curiosity.</span><div className="footer-end"><span>© 2026</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={17} aria-hidden="true" /></a></div></footer>
    </>
  )
}
