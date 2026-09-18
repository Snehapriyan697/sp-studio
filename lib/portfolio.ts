export type Project = {
  name: string
  description: string
  technologies: string[]
  year: string
  image: string
  imageAlt: string
  url: string
}

// Add only real projects here. An empty collection intentionally shows an honest unpublished state.
export const projects: Project[] = []

// Replace null with your real profile URLs or email address to enable the contact links.
export const contact = {
  github: null as string | null,
  linkedin: null as string | null,
  email: null as string | null,
}

export const experiments = [
  { name: 'AI agents', category: 'Intelligence & interaction', description: 'Exploring how small, focused agents can turn a complicated task into a useful little system.', image: '/images/quiet-studio.png', alt: 'A quiet workspace with a laptop and notebook' },
  { name: 'Generative web', category: 'Code as a creative medium', description: 'Interfaces that respond, evolve, and leave a little room for the unexpected.', image: '/images/northern-shore.png', alt: 'An atmospheric northern coastline' },
  { name: 'Creative coding & 3D', category: 'Small worlds, new perspectives', description: 'Playing with light, space, and interaction to make the browser feel a little less like a flat surface.', image: '/images/little-world.png', alt: 'A miniature island with trees and a wooden cabin' },
  { name: 'Automation', category: 'Less friction, more possibility', description: 'Connecting the pieces and finding quieter, simpler ways to get things done.', image: '/images/quiet-studio.png', alt: 'A warm, lamp-lit desk in a forest cabin' },
  { name: 'Game development', category: 'Learning through play', description: 'An open-ended interest in tiny worlds, playful mechanics, and the things that make an experience worth exploring.', image: '/images/little-world.png', alt: 'A small explorable island world' },
]

export const currentlyBuilding = 'AI agents, experimental web experiences, and tools that make complicated things feel simple.'
