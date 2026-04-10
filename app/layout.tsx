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

const BASE_URL = 'https://jonatasdantas.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Jonatas Dantas — Senior Software Engineer',
  description:
    'Personal portfolio of Jonatas Dantas, a Senior Software Engineer with 7 years of experience building highly scalable web, mobile, and cloud applications using TypeScript, Node.js, React, and AWS.',
  keywords: [
    'Jonatas Dantas',
    'Senior Software Engineer',
    'Full Stack Engineer',
    'AI Engineer',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Next.js',
    'Angular',
    'NestJS',
    'Python',
    'Java',
    'Spring Boot',
    'Flutter',
    'React Native',
    'AWS',
    'Docker',
    'MongoDB',
    'SQL',
    'LLM Engineering',
    'RAG',
    'AI Agents',
    'Blockchain',
    'Fintech',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Jonatas Dantas', url: BASE_URL }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Jonatas Dantas',
    title: 'Jonatas Dantas — Senior Software Engineer',
    description:
      'Senior Software Engineer with 7 years of experience in TypeScript, Node.js, React, and AWS. Currently Dev Lead at Orbital (UK fintech).',
    locale: 'en_US',
    images: [
      {
        url: `${BASE_URL}/avatar.png`,
        width: 256,
        height: 256,
        alt: 'Jonatas Dantas — Senior Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonatas Dantas — Senior Software Engineer',
    description:
      'Senior Software Engineer with 7 years of experience in TypeScript, Node.js, React, and AWS. Currently Dev Lead at Orbital (UK fintech).',
    images: [`${BASE_URL}/avatar.png`],
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jonatas Dantas',
  jobTitle: 'Senior Software Engineer',
  url: BASE_URL,
  image: `${BASE_URL}/avatar.png`,
  sameAs: [
    'https://github.com/jdantas',
    'https://www.linkedin.com/in/jonatas-de-almeida/',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jonatas Dantas',
  url: BASE_URL,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full bg-bg text-text-primary" suppressHydrationWarning>{children}</body>
    </html>
  )
}
