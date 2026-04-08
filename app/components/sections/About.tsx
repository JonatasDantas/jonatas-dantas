'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'

const VALUES = [
  {
    icon: '✦',
    title: 'Clean Code',
    description: 'Readable, maintainable code following SOLID principles, DRY, and best practices.',
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Optimised for scale — handling hundreds of thousands of requests per day.',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native',
    description: 'AWS 2× Certified. Designed and deployed production systems on ECS, Lambda, and RDS.',
  },
  {
    icon: '🔀',
    title: 'Multidisciplinary',
    description: 'Comfortable across frontend, backend, mobile, and infrastructure — full product ownership.',
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
                  src="/avatar.png"
                  alt="Jonatas Dantas"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyan text-bg text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                7+ years
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
              I&apos;m a Senior Software Engineer with 7 years of experience across the full
              development lifecycle — design, development, testing, deployment, and operations.
              I&apos;ve built highly scalable web and mobile applications for major players in
              the market, with a strong focus on TypeScript, Node.js, AWS, and React. Currently
              serving as Dev Lead at Orbital, a UK-based fintech operating in the blockchain and
              crypto space.
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
