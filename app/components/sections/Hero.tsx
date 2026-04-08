'use client'

import { motion } from 'framer-motion'
import { useTypingAnimation } from '@/hooks/useTypingAnimation'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { Button } from '@/components/ui/Button'

const TYPING_WORDS = [
  'Senior Software Engineer',
  'Full-Stack Developer',
  'JavaScript / TypeScript Expert',
  'AWS Certified Developer',
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
          Jonatas Dantas
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
