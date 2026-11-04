import { Hero } from '@/components/portfolio/hero'
import { Introduction, SelectedWork, About, Contact, Journey, Philosophy, TheNorth } from '@/components/portfolio/sections'
import { Lab } from '@/components/portfolio/lab'
import { LittleWorld } from '@/components/portfolio/little-world'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Hero />
      <main id="main-content">
        <Introduction />
        <TheNorth />
        <SelectedWork />
        <Journey />
        <Philosophy />
        <Lab />
        <LittleWorld />
        <About />
        <Contact />
      </main>
    </>
  )
}
