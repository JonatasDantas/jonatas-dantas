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
        hover
          ? 'hover:border-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300'
          : ''
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
