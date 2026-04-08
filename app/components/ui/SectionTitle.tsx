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
