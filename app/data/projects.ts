import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'my-pool',
    name: 'My Pool',
    description:
      'Flutter app for pool service management — customers can schedule and track pool maintenance. Published on Google Play.',
    image: '/projects/my-pool.png',
    tags: ['Flutter', 'Dart', 'Mobile'],
    url: 'https://play.google.com/store/apps/details?id=com.jdantas.my_pool&hl=en&gl=BR',
  },
  {
    id: 'onecard',
    name: 'OneCard',
    description:
      'Digital business card platform built with TypeScript and Capacitor for cross-platform mobile deployment.',
    image: '/projects/onecard.png',
    tags: ['TypeScript', 'Capacitor', 'React'],
    url: 'https://onecard.com.br/login',
  },
  {
    id: 'estoque-total',
    name: 'Estoque Total',
    description:
      'Full-stack inventory management platform with microservices architecture, real-time stock tracking, and multi-warehouse support.',
    image: '/projects/estoque-total.png',
    tags: ['React', 'Node.js', 'SQL', 'Microservices', 'AWS'],
    url: '#',
  },
  {
    id: 'trinity-gifts',
    name: 'Trinity Gifts',
    description:
      'E-commerce platform for a custom gifts store, built with React and Next.js featuring SSR product pages.',
    image: '/projects/trinity-gifts.png',
    tags: ['React', 'Next.js'],
    url: 'https://trinitypersonalizados.com.br',
  },
  {
    id: 'victor-julio',
    name: 'Victor Julio Fotografia',
    description:
      'Photography portfolio website for a professional photographer, built with Angular and a clean gallery layout.',
    image: '/projects/victor-julio.png',
    tags: ['Angular', 'TypeScript'],
    url: '#',
  },
  {
    id: 'dantas-party',
    name: 'Dantas Party Hall',
    description:
      'Event hall booking website with gallery, packages, and contact form built with React and Next.js.',
    image: '/projects/dantas-party.png',
    tags: ['React', 'Next.js'],
    url: '#',
  },
]
