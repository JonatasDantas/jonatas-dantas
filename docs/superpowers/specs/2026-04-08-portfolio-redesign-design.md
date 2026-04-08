# Portfolio Redesign — Design Spec
**Date:** 2026-04-08
**Project:** jonatas-dantas (Next.js)
**Status:** Approved

---

## Overview

Rebuild Jonatas de Almeida Dantas's personal portfolio from React (CRA) to Next.js 16 (App Router) with a modernized dark design, rich scroll animations, and an improved developer experience. The new portfolio preserves all original sections and features while elevating the visual quality and code architecture.

---

## Goals

- Modern, premium dark aesthetic that retains the original navy + cyan + orange brand identity
- Smooth scroll-triggered animations throughout
- Grouped, animated skills section replacing the old carousel
- Richer project cards with hover effects
- Cleaner contact form with less friction
- Single-page layout (no route changes except project detail)
- English only (no i18n in v1)

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | Already scaffolded, modern, SSR-ready |
| Language | TypeScript | Already configured, strict mode |
| Styling | Tailwind CSS v4 | Already configured, utility-first |
| Animations | Framer Motion | Best DX for scroll-triggered and stagger animations in React |
| Particles | @tsparticles/react | Matches original effect, configurable |
| Forms | React Hook Form + Zod | Modern replacement for Unform + Yup |
| Email | EmailJS | No backend required, proven integration |
| Fonts | Inter + JetBrains Mono | Via next/font/google |

---

## File Structure

```
app/
├── page.tsx                  # Single page, renders all sections in order
├── layout.tsx                # Metadata, font loading, global styles
├── globals.css               # Tailwind base + CSS custom properties
├── components/
│   ├── nav/
│   │   └── Navbar.tsx        # Floating pill navbar
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── SectionTitle.tsx
└── data/
    ├── projects.ts           # All project data (replaces projectsHelper.js)
    └── skills.ts             # Skills grouped by category
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#0a0f1e` | Page base |
| Surface | `#111827` | Cards, nav |
| Surface Alt | `#1a2235` | Alternating section backgrounds |
| Accent Cyan | `#22d3ee` | Borders, icons, highlights, links |
| Accent Orange | `#f97316` | Active nav, typing text, CTAs |
| Text Primary | `#f1f5f9` | Headings, main text |
| Text Muted | `#94a3b8` | Subtitles, descriptions |
| Glass | `rgba(17,24,39,0.7)` | Card backgrounds with backdrop-blur |

---

## Typography

- **Inter** (400, 500, 700, 800) — headings and body
- **JetBrains Mono** — typing animation, code-style accents
- Section titles: 3.5–4rem desktop, Inter 800, with a 2px cyan underline accent
- Body: 1rem–1.1rem, Inter 400, `#94a3b8` for muted text

---

## Animations (Framer Motion)

- **Scroll reveal:** All sections fade up + slide in on enter (y: 40 → 0, opacity: 0 → 1, duration 0.5s ease-out)
- **Card stagger:** 0.1s delay between each card in a group
- **Hover lift:** Cards scale to 1.02 + shadow increase on hover
- **Nav fade-in:** Navbar fades in after hero scrolls past viewport

---

## Sections

### 1. Hero
- Full-viewport, background `#0a0f1e`
- tsparticles: node-connection network, ~80 particles (lighter than original 150)
- Gradient overlay at bottom blending into next section
- **Content:**
  - Name: "Jonatas de Almeida Dantas" — Inter 800, `#f1f5f9`, large
  - Typing animation: JetBrains Mono, `#f97316`, cycles through:
    - "Full-Stack Developer"
    - "Mobile Developer"
    - "JavaScript Engineer"
    - "Flutter Developer"
  - CTA: "View my work ↓" — outlined button, cyan border, hover fills cyan

### 2. About Me
- Background: `#111827`
- Two-column layout (left: photo, right: text + cards)
- Photo: circular or rounded, subtle cyan glow border, floating badge "5+ years"
- Bio paragraph
- 4 value cards below bio (glass style, stagger animation):
  - Clean Code
  - High Performance
  - Responsiveness
  - Multidisciplinary

### 3. Skills
- Background: `#0a0f1e`
- Section title + skills grouped into categories:
  - **Frontend:** JavaScript, TypeScript, React, Angular, Vue.js
  - **Backend:** Node.js, Java
  - **Mobile:** Flutter, React Native, Ionic
  - **Infrastructure:** Docker, AWS, Linux, SQL
- Each category: label + row of animated glass cards (logo + name)
- Hover: cyan glow border
- Groups stagger-reveal on scroll

### 4. Projects
- Background: `#111827`
- Section title + 2-column responsive grid
- Each project card:
  - Device mockup image (top)
  - Tech tag badges (cyan, small)
  - Project name (Inter 700)
  - Short description (1–2 lines, muted text)
  - "View project →" link (orange)
- Hover: card lifts (scale 1.02 + deeper shadow), image brightness increases
- Cards stagger-animate in on scroll
- Projects (carried from old portfolio):
  1. My Pool (Flutter)
  2. OneCard (TypeScript, Capacitor)
  3. Estoque Total (React, Node.js, SQL, Microservices)
  4. Trinity Gifts (React/Next.js)
  5. Victor Julio Fotografia (Angular)
  6. Dantas Party Hall (React/Next.js)

### 5. Contact
- Background: `#0a0f1e`
- Split layout: left = invite text + social links, right = form
- Social links: GitHub, LinkedIn, WhatsApp (icon + label)
- Form fields: Name, Email, Message (Phone removed to reduce friction)
- Validation: React Hook Form + Zod, inline error messages
- Buttons:
  - "Send Message" — filled orange
  - "WhatsApp" — outlined, WhatsApp icon
- EmailJS integration (same service/template IDs as original)

### 6. Navigation
- Floating pill, fixed top, centered horizontally
- Glass background (`backdrop-blur`), thin cyan border
- Links: Home, About, Skills, Projects, Contact
- Active link: orange, smooth color transition
- Mobile: collapses to hamburger → drawer or dropdown

### 7. Footer
- Minimal: "Designed & built by Jonatas de Almeida · 2026"
- Small social icon row (GitHub, LinkedIn, WhatsApp)

---

## Out of Scope (v1)

- i18n / multilingual support
- Project detail pages (can be added in v2)
- Blog section
- Dark/light mode toggle
- Analytics integration (can be re-added after launch)

---

## Success Criteria

- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices
- All sections visible and functional on mobile (≥ 375px) and desktop (≥ 1280px)
- Contact form successfully sends via EmailJS
- All scroll animations trigger correctly without layout shift
