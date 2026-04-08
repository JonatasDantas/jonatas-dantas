# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **⚠️ REQUIRED BEFORE ANY CODE:** Read `node_modules/next/dist/docs/` (per AGENTS.md). The installed Next.js 16 has breaking changes from prior versions.

**Goal:** Build a single-page personal portfolio in Next.js 16 (App Router) with a dark premium design, scroll-triggered animations, and all five original sections (Hero, About, Skills, Projects, Contact).

**Architecture:** All section components are Client Components (`'use client'`) because they use Framer Motion or browser APIs. `app/page.tsx` stays a Server Component and composes the sections. Static data lives in `app/data/`. UI primitives in `app/components/ui/` are reusable across sections.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, @tsparticles/react + @tsparticles/slim, React Hook Form + Zod + @hookform/resolvers, @emailjs/browser, react-icons

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/globals.css` | Modify | Design tokens, Tailwind @theme, base body styles |
| `app/layout.tsx` | Modify | Inter + JetBrains Mono fonts, metadata, bg color |
| `app/page.tsx` | Modify | Server Component — composes all sections |
| `app/data/types.ts` | Create | Shared TypeScript types (Project, SkillGroup, Skill) |
| `app/data/projects.ts` | Create | All 6 project entries |
| `app/data/skills.ts` | Create | 4 skill categories with items |
| `app/hooks/useTypingAnimation.ts` | Create | Typing/deleting animation hook |
| `app/components/ui/Button.tsx` | Create | Outlined + filled button variants |
| `app/components/ui/Badge.tsx` | Create | Cyan tech tag badge |
| `app/components/ui/SectionTitle.tsx` | Create | Section heading with cyan underline |
| `app/components/ui/Card.tsx` | Create | Glass card wrapper with optional hover lift |
| `app/components/ui/ParticlesBackground.tsx` | Create | tsparticles client component |
| `app/components/nav/Navbar.tsx` | Create | Floating pill navbar with active section + mobile |
| `app/components/sections/Hero.tsx` | Create | Full-viewport hero with particles + typing |
| `app/components/sections/About.tsx` | Create | Two-column about with value cards |
| `app/components/sections/Skills.tsx` | Create | Grouped skill cards |
| `app/components/sections/Projects.tsx` | Create | 2-column project grid |
| `app/components/sections/Contact.tsx` | Create | Split contact form with EmailJS |
| `app/components/Footer.tsx` | Create | Minimal footer |
| `.env.local` | Create | EmailJS keys (not committed) |
| `.env.local.example` | Create | Committed template for env vars |
| `public/avatar.jpg` | Place manually | Developer photo (circular crop) |
| `public/projects/*.jpg` | Place manually | One image per project (device mockup) |

---

## Task 1: Install Dependencies and Bootstrap Git

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local`, `.env.local.example`, `.gitignore`

- [ ] **Step 1: Install all runtime dependencies**

```bash
cd /Users/jowalmeida/dev/jonatas-new-portfolio/jonatas-dantas
npm install framer-motion @tsparticles/react @tsparticles/slim react-hook-form zod @hookform/resolvers @emailjs/browser react-icons
```

Expected: All packages installed, no peer dep errors. `package.json` will show new entries under `dependencies`.

- [ ] **Step 2: Create `.env.local.example`**

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EOF
```

- [ ] **Step 3: Create `.env.local` with real values**

The EmailJS values come from https://dashboard.emailjs.com — Service ID, Template ID, and Public Key from your account.

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_EMAILJS_SERVICE_ID=REPLACE_ME
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=REPLACE_ME
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=REPLACE_ME
EOF
```

- [ ] **Step 4: Initialize git and first commit**

```bash
git init
git add -A
git commit -m "chore: initial Next.js 16 scaffold with dependencies"
```

---

## Task 2: Foundation — Design Tokens and Layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite `app/globals.css` with design tokens**

Replace the entire file with:

```css
@import "tailwindcss";

@theme inline {
  --color-bg: #0a0f1e;
  --color-surface: #111827;
  --color-surface-alt: #1a2235;
  --color-cyan: #22d3ee;
  --color-orange: #f97316;
  --color-text-primary: #f1f5f9;
  --color-text-muted: #94a3b8;
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background-color: #0a0f1e;
  color: #f1f5f9;
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
}
```

> **Tailwind v4 note:** `@theme inline` registers custom design tokens. `bg-bg`, `bg-surface`, `text-cyan`, `text-orange`, `text-text-primary`, `text-text-muted`, `font-sans`, `font-mono` are now valid utility classes.

- [ ] **Step 2: Rewrite `app/layout.tsx` with Inter + JetBrains Mono and correct metadata**

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Jonatas de Almeida Dantas — Full-Stack & Mobile Developer',
  description:
    'Personal portfolio of Jonatas de Almeida Dantas, a Full-Stack and Mobile Developer with 5+ years of experience building web and mobile applications.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text-primary">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Update `tsconfig.json` path alias**

The scaffold maps `@/*` to the project root (`./*`), but all source files live under `app/`. Update the alias so `@/components/...` resolves to `app/components/...`:

In `tsconfig.json`, change:
```json
"paths": {
  "@/*": ["./*"]
}
```
to:
```json
"paths": {
  "@/*": ["./app/*"]
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx tsconfig.json
git commit -m "feat: add design tokens, font configuration, and fix @/ path alias"
```

---

## Task 3: Data Layer — Types, Skills, Projects

**Files:**
- Create: `app/data/types.ts`
- Create: `app/data/skills.ts`
- Create: `app/data/projects.ts`

- [ ] **Step 1: Create `app/data/types.ts`**

```typescript
export interface Skill {
  name: string
  /** Path to icon under /public/skills/, e.g. "javascript.svg" */
  icon: string
}

export interface SkillGroup {
  category: string
  items: Skill[]
}

export interface Project {
  id: string
  name: string
  description: string
  /** Path to image under /public/projects/, e.g. "my-pool.jpg" */
  image: string
  tags: string[]
  url: string
}
```

- [ ] **Step 2: Create `app/data/skills.ts`**

```typescript
import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', icon: '/skills/javascript.svg' },
      { name: 'TypeScript', icon: '/skills/typescript.svg' },
      { name: 'React', icon: '/skills/react.svg' },
      { name: 'Angular', icon: '/skills/angular.svg' },
      { name: 'Vue.js', icon: '/skills/vue.svg' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '/skills/nodejs.svg' },
      { name: 'Java', icon: '/skills/java.svg' },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: '/skills/flutter.svg' },
      { name: 'React Native', icon: '/skills/react.svg' },
      { name: 'Ionic', icon: '/skills/ionic.svg' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { name: 'Docker', icon: '/skills/docker.svg' },
      { name: 'AWS', icon: '/skills/aws.svg' },
      { name: 'Linux', icon: '/skills/linux.svg' },
      { name: 'SQL', icon: '/skills/sql.svg' },
    ],
  },
]
```

> **Note:** Place SVG icons at `public/skills/<name>.svg`. Simple colored SVG logos work fine. DevIcons CDN or Skill Icons (skillicons.dev) are good sources.

- [ ] **Step 3: Create `app/data/projects.ts`**

```typescript
import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'my-pool',
    name: 'My Pool',
    description:
      'A Flutter app for pool service management, enabling customers to schedule and track pool maintenance.',
    image: '/projects/my-pool.jpg',
    tags: ['Flutter', 'Dart'],
    url: '#',
  },
  {
    id: 'onecard',
    name: 'OneCard',
    description:
      'Digital business card app built with TypeScript and Capacitor for cross-platform mobile deployment.',
    image: '/projects/onecard.jpg',
    tags: ['TypeScript', 'Capacitor', 'React'],
    url: '#',
  },
  {
    id: 'estoque-total',
    name: 'Estoque Total',
    description:
      'Full-stack inventory management system with microservices architecture and real-time stock tracking.',
    image: '/projects/estoque-total.jpg',
    tags: ['React', 'Node.js', 'SQL', 'Microservices'],
    url: '#',
  },
  {
    id: 'trinity-gifts',
    name: 'Trinity Gifts',
    description:
      'E-commerce platform for a gifts store, built with React and Next.js with SSR product pages.',
    image: '/projects/trinity-gifts.jpg',
    tags: ['React', 'Next.js'],
    url: '#',
  },
  {
    id: 'victor-julio',
    name: 'Victor Julio Fotografia',
    description:
      'Photography portfolio website for a professional photographer, built with Angular.',
    image: '/projects/victor-julio.jpg',
    tags: ['Angular', 'TypeScript'],
    url: '#',
  },
  {
    id: 'dantas-party',
    name: 'Dantas Party Hall',
    description:
      'Event hall booking website with gallery, packages, and contact form built with React and Next.js.',
    image: '/projects/dantas-party.jpg',
    tags: ['React', 'Next.js'],
    url: '#',
  },
]
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/data/
git commit -m "feat: add data types, skills, and projects data"
```

---

## Task 4: UI Primitives — Button, Badge, SectionTitle, Card

**Files:**
- Create: `app/components/ui/Button.tsx`
- Create: `app/components/ui/Badge.tsx`
- Create: `app/components/ui/SectionTitle.tsx`
- Create: `app/components/ui/Card.tsx`

- [ ] **Step 1: Create `app/components/ui/Button.tsx`**

```tsx
'use client'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'filled'
}

export function Button({ variant = 'filled', className = '', children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan'

  const variants = {
    outlined:
      'border border-cyan text-cyan hover:bg-cyan hover:text-bg',
    filled:
      'bg-orange text-white hover:bg-orange/80',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `app/components/ui/Badge.tsx`**

```tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono font-medium text-cyan border border-cyan/30 rounded-full bg-cyan/5">
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create `app/components/ui/SectionTitle.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-sans font-extrabold text-text-primary inline-block relative pb-3">
        {children}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-cyan" />
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-base max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 4: Create `app/components/ui/Card.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function Card({ children, className = '', hover = false, delay = 0 }: CardProps) {
  return (
    <motion.div
      className={`rounded-xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm p-6 ${
        hover ? 'hover:border-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300' : ''
      } ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      {...(hover ? { whileHover: { scale: 1.02 } } : {})}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/components/ui/
git commit -m "feat: add UI primitives (Button, Badge, SectionTitle, Card)"
```

---

## Task 5: Typing Animation Hook and Particles Background

**Files:**
- Create: `app/hooks/useTypingAnimation.ts`
- Create: `app/components/ui/ParticlesBackground.tsx`

- [ ] **Step 1: Create `app/hooks/useTypingAnimation.ts`**

```typescript
'use client'

import { useState, useEffect, useRef } from 'react'

export function useTypingAnimation(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseMs = 1500,
): string {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const wordIndex = useRef(0)
  const charIndex = useRef(0)

  useEffect(() => {
    const current = words[wordIndex.current]

    if (phase === 'typing') {
      if (charIndex.current < current.length) {
        const timer = setTimeout(() => {
          charIndex.current++
          setText(current.slice(0, charIndex.current))
        }, typingSpeed)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setPhase('deleting'), pauseMs)
        return () => clearTimeout(timer)
      }
    }

    if (phase === 'deleting') {
      if (charIndex.current > 0) {
        const timer = setTimeout(() => {
          charIndex.current--
          setText(current.slice(0, charIndex.current))
        }, deletingSpeed)
        return () => clearTimeout(timer)
      } else {
        wordIndex.current = (wordIndex.current + 1) % words.length
        setPhase('typing')
      }
    }
  }, [text, phase, words, typingSpeed, deletingSpeed, pauseMs])

  return text
}
```

- [ ] **Step 2: Create `app/components/ui/ParticlesBackground.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 80 },
          color: { value: '#22d3ee' },
          links: {
            enable: true,
            color: '#22d3ee',
            opacity: 0.15,
            distance: 150,
          },
          move: { enable: true, speed: 0.8 },
          size: { value: { min: 1, max: 2.5 } },
          opacity: { value: { min: 0.3, max: 0.7 } },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
          },
        },
      }}
    />
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/hooks/ app/components/ui/ParticlesBackground.tsx
git commit -m "feat: add typing animation hook and particles background"
```

---

## Task 6: Navbar

**Files:**
- Create: `app/components/nav/Navbar.tsx`

- [ ] **Step 1: Create `app/components/nav/Navbar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Show navbar after hero scrolls past
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          {/* Desktop pill */}
          <div className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full border border-cyan/30 bg-[rgba(17,24,39,0.85)] backdrop-blur-md shadow-lg">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  active === id
                    ? 'text-orange'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3 px-4 py-2 rounded-full border border-cyan/30 bg-[rgba(17,24,39,0.85)] backdrop-blur-md shadow-lg">
            <span className="text-sm font-medium text-text-primary capitalize">{active}</span>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex flex-col gap-1 p-1 cursor-pointer"
            >
              <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 flex flex-col rounded-2xl border border-cyan/30 bg-[rgba(17,24,39,0.95)] backdrop-blur-md overflow-hidden"
              >
                {SECTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`px-6 py-3 text-sm text-left transition-colors cursor-pointer ${
                      active === id ? 'text-orange' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/nav/
git commit -m "feat: add floating pill navbar with active section detection"
```

---

## Task 7: Hero Section

**Files:**
- Create: `app/components/sections/Hero.tsx`

- [ ] **Step 1: Create `app/components/sections/Hero.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useTypingAnimation } from '@/hooks/useTypingAnimation'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { Button } from '@/components/ui/Button'

const TYPING_WORDS = [
  'Full-Stack Developer',
  'Mobile Developer',
  'JavaScript Engineer',
  'Flutter Developer',
]

export function Hero() {
  const typedText = useTypingAnimation(TYPING_WORDS)

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen bg-bg overflow-hidden"
    >
      <ParticlesBackground />

      {/* Gradient overlay blending to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surface z-10" />

      <div className="relative z-20 text-center px-6 max-w-3xl">
        <motion.p
          className="text-cyan font-mono text-sm mb-4 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-sans font-extrabold text-text-primary leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Jonatas de Almeida Dantas
        </motion.h1>

        <motion.div
          className="h-10 mb-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="font-mono text-xl md:text-2xl text-orange">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Button variant="outlined" onClick={scrollToAbout} className="text-base px-8 py-3">
            View my work ↓
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/Hero.tsx
git commit -m "feat: add Hero section with particles and typing animation"
```

---

## Task 8: About Section

**Files:**
- Create: `app/components/sections/About.tsx`

> **Note:** This section requires `public/avatar.jpg`. Place a circular-cropped developer photo there before first run. A placeholder image is fine for development.

- [ ] **Step 1: Create `app/components/sections/About.tsx`**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'

const VALUES = [
  {
    icon: '✦',
    title: 'Clean Code',
    description: 'Readable, maintainable code following SOLID principles and best practices.',
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Optimized for speed — fast load times, smooth UX, and efficient architecture.',
  },
  {
    icon: '📱',
    title: 'Responsiveness',
    description: 'Pixel-perfect layouts that work flawlessly on any screen size.',
  },
  {
    icon: '🔀',
    title: 'Multidisciplinary',
    description: 'Comfortable across frontend, backend, and mobile — full product ownership.',
  },
]

export function About() {
  return (
    <section id="about" className="bg-surface py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="A little about who I am and how I work">
          About Me
        </SectionTitle>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Photo */}
          <motion.div
            className="flex-shrink-0 flex justify-center w-full md:w-auto"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-cyan/40 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                <Image
                  src="/avatar.jpg"
                  alt="Jonatas de Almeida Dantas"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyan text-bg text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                5+ years
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + cards */}
          <div className="flex-1">
            <motion.p
              className="text-text-muted text-base leading-relaxed mb-8 max-w-2xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              I&apos;m a Full-Stack and Mobile Developer with over 5 years of experience designing
              and building production-ready web and mobile applications. I&apos;m passionate about
              clean architecture, performance, and delivering user experiences that feel effortless.
              My background spans frontend frameworks, backend APIs, mobile apps, and cloud
              infrastructure — letting me own features end-to-end.
            </motion.p>

            {/* Value cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((item, i) => (
                <Card key={item.title} hover delay={i * 0.1} className="flex gap-4 items-start">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-sans font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/About.tsx
git commit -m "feat: add About section with bio and value cards"
```

---

## Task 9: Skills Section

**Files:**
- Create: `app/components/sections/Skills.tsx`

- [ ] **Step 1: Create `app/components/sections/Skills.tsx`**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Technologies I work with, grouped by domain">
          Skills
        </SectionTitle>

        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-cyan font-mono text-sm font-medium tracking-widest uppercase mb-5">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm cursor-default transition-all duration-300 hover:border-cyan hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-6 h-6 relative flex-shrink-0">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

> **Note:** Skill icons are loaded from `/public/skills/<name>.svg`. Download SVG logos for each skill and place them there. Simple mono-color SVGs work well against the dark background.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/Skills.tsx
git commit -m "feat: add Skills section with grouped animated cards"
```

---

## Task 10: Projects Section

**Files:**
- Create: `app/components/sections/Projects.tsx`

> **Note:** Project images are loaded from `/public/projects/<id>.jpg`. Place device mockup screenshots there. Use 16:9 or 4:3 aspect ratio images for consistent layout.

- [ ] **Step 1: Create `app/components/sections/Projects.tsx`**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="bg-surface py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="A selection of projects I've built">
          Projects
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="group rounded-2xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm overflow-hidden hover:border-cyan/50 hover:shadow-[0_8px_40px_rgba(34,211,238,0.1)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <h3 className="text-lg font-sans font-bold text-text-primary mb-2">
                  {project.name}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-orange hover:text-orange/80 transition-colors"
                >
                  View project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/Projects.tsx
git commit -m "feat: add Projects section with 2-column card grid"
```

---

## Task 11: Contact Section

**Files:**
- Create: `app/components/sections/Contact.tsx`

> **Prerequisite:** `.env.local` must have real EmailJS values (from Task 1). The template in EmailJS should accept `from_name`, `from_email`, and `message` fields.

- [ ] **Step 1: Create `app/components/sections/Contact.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { send } from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const WHATSAPP_NUMBER = '5521999999999' // Replace with actual number

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/jonatas-dantas',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jonatas-dantas',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
]

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface-alt border border-surface-alt rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-cyan transition-colors'

  return (
    <section id="contact" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Let's build something great together">
          Contact
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: invite + social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-sans font-bold text-text-primary mb-4">
              Let&apos;s talk
            </h3>
            <p className="text-text-muted leading-relaxed mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hi —
              I&apos;m always happy to connect. Fill out the form or reach me directly on any of
              the platforms below.
            </p>

            <div className="space-y-4">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted hover:text-cyan transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <input {...register('name')} placeholder="Your name" className={inputClass} />
              {errors.name && (
                <p className="mt-1 text-xs text-orange">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input {...register('email')} placeholder="your@email.com" className={inputClass} />
              {errors.email && (
                <p className="mt-1 text-xs text-orange">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Tell me about your project..."
                rows={5}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-orange">{errors.message.message}</p>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="submit"
                variant="filled"
                disabled={status === 'sending'}
                className="flex-1 justify-center"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-cyan text-cyan text-sm font-medium hover:bg-cyan hover:text-bg transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {status === 'success' && (
              <p className="text-sm text-cyan font-medium">
                ✓ Message sent! I&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-orange">
                Something went wrong. Please try WhatsApp or email directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
```

> **Note:** Update `WHATSAPP_NUMBER` and `SOCIAL_LINKS` hrefs with real URLs before going live.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/Contact.tsx
git commit -m "feat: add Contact section with React Hook Form, Zod, and EmailJS"
```

---

## Task 12: Footer and Final Page Assembly

**Files:**
- Create: `app/components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/Footer.tsx`**

```tsx
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = '5521999999999' // Keep in sync with Contact.tsx

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-alt py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          Designed &amp; built by{' '}
          <span className="text-text-primary font-medium">Jonatas de Almeida</span> · 2026
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jonatas-dantas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/jonatas-dantas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Rewrite `app/page.tsx` to compose all sections**

```tsx
import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer and wire all sections in page.tsx"
```

---

## Task 13: Build Verification and Public Assets

**Files:**
- `public/avatar.jpg` — place manually
- `public/projects/*.jpg` — place manually (6 images)
- `public/skills/*.svg` — place manually (14 icons)

- [ ] **Step 1: Add placeholder public assets**

For development, create placeholder images so the build succeeds even without real photos. If real images are available, use them directly.

```bash
# Create placeholder directories
mkdir -p public/projects public/skills

# Download a simple placeholder avatar (optional — or copy a real photo)
# The build will succeed even with a broken image path; Next.js Image won't throw at build time
```

For skill SVGs: Download from https://skillicons.dev (e.g., `https://skillicons.dev/icons?i=js` renders to an SVG you can save) or use simple colored SVGs. File names must match exactly what's in `app/data/skills.ts`:
- `public/skills/javascript.svg`
- `public/skills/typescript.svg`
- `public/skills/react.svg`
- `public/skills/angular.svg`
- `public/skills/vue.svg`
- `public/skills/nodejs.svg`
- `public/skills/java.svg`
- `public/skills/flutter.svg`
- `public/skills/ionic.svg`
- `public/skills/docker.svg`
- `public/skills/aws.svg`
- `public/skills/linux.svg`
- `public/skills/sql.svg`

- [ ] **Step 2: Configure Next.js image domains if needed**

If using external image URLs in any project data, add domains to `next.config.ts`. For local `/public/` images, no config is needed.

- [ ] **Step 3: Run full production build**

```bash
npm run build
```

Expected: Build succeeds. All pages pre-rendered. No TypeScript errors. No missing module errors.

If build fails due to missing `@tsparticles` types, install:
```bash
npm install --save-dev @types/node
```

- [ ] **Step 4: Run dev server and manually verify**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- [ ] Particles render in Hero with cyan node-connection network
- [ ] Typing animation cycles through all 4 roles with cursor blink
- [ ] "View my work ↓" scrolls to About section
- [ ] Navbar appears after scrolling past Hero, highlights active section
- [ ] Mobile hamburger works (test at ≤768px)
- [ ] About section: photo, bio, 4 value cards with stagger animation
- [ ] Skills section: 4 category groups, card hover glow
- [ ] Projects section: 6 cards in 2-column grid, hover lift effect
- [ ] Contact form: validation errors show inline, form submits via EmailJS
- [ ] WhatsApp button opens correct number
- [ ] Footer: social icons link correctly
- [ ] All scroll animations trigger on enter (no layout shift)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — all sections assembled and verified"
```

---

## Post-Implementation Checklist

Before going live, update these placeholders with real values:

| Location | Placeholder | Replace with |
|---|---|---|
| `app/components/sections/Contact.tsx:16` | `WHATSAPP_NUMBER = '5521999999999'` | Real WhatsApp number with country code |
| `app/components/sections/Contact.tsx:19-27` | GitHub/LinkedIn URLs | Real profile URLs |
| `app/components/Footer.tsx:4` | `WHATSAPP_NUMBER` | Same real number |
| `app/components/Footer.tsx:16,22` | GitHub/LinkedIn URLs | Real profile URLs |
| `app/data/projects.ts` | `url: '#'` | Real project URLs |
| `.env.local` | `REPLACE_ME` values | Real EmailJS credentials |
| `public/avatar.jpg` | placeholder | Real developer photo |
| `public/projects/*.jpg` | placeholders | Real device mockup screenshots |
| `public/skills/*.svg` | missing files | Real skill logo SVGs |
