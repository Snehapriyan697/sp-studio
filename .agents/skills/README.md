# Frontend AI Skills

Project-local agent skills installed from [JustineBijuPaul/frontend-ai-skills](https://github.com/JustineBijuPaul/frontend-ai-skills).

These are instruction packs for compatible AI coding agents, not npm dependencies. They do not install packages or execute code. Agents should load the relevant `SKILL.md` when a task matches its description.

## Installed skills

### Core engineering and design
- `01-frontend-architecture` — architecture and project structure
- `02-react` — React patterns and component design
- `03-nextjs` — Next.js App Router and framework conventions
- `04-typescript` — type-safe TypeScript
- `05-html` — semantic HTML
- `06-css` — modern CSS
- `07-responsive-design` — responsive layouts
- `08-ui-ux-design` — visual and interaction design
- `09-design-systems` — tokens and reusable design systems
- `10-component-engineering` — robust reusable components
- `11-accessibility` — accessible interfaces
- `16-frontend-security` — frontend security practices
- `17-frontend-performance` — frontend performance
- `18-image-optimization` — responsive and efficient images

### Motion, animation and 3D
- `22-gsap` — GSAP animation
- `23-gsap-scrolltrigger` — scroll-linked GSAP animation
- `25-framer-motion` — React motion
- `27-scroll-storytelling` — cinematic scroll narratives
- `41-threejs` — Three.js scenes
- `42-react-three-fiber` — declarative 3D in React
- `43-drei` — React Three Fiber helpers
- `45-glsl-shaders` — shader effects
- `50-motion-accessibility` — accessible motion
- `51-animation-performance` — smooth, efficient animation

### Quality and delivery
- `55-frontend-testing` — frontend tests
- `57-web-vitals` — Core Web Vitals
- `58-seo` — technical SEO
- `63-frontend-code-review` — review and risk checks
- `65-design-to-code` — translate design references into code
- `70-frontend-skill-router` — route tasks to relevant skills

## Agent instructions

1. Inspect the existing app, package manager, conventions and components before changing code.
2. Load the most relevant skills before implementation; combine only those needed for the task.
3. Preserve the established stack unless a change is justified. Do not add dependencies just because a skill mentions them.
4. Build complete, responsive, accessible interfaces; test relevant states and viewport sizes.
5. Respect reduced-motion preferences and optimize 3D/animation for mobile and low-power devices.
6. Run available lint, typecheck, test and build scripts when practical. Report what was actually run and any failures.
7. Never claim a test, deployment or visual check succeeded unless it was performed.

## License and attribution

The included skill documents are from the MIT-licensed project above. See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for the license and attribution.
