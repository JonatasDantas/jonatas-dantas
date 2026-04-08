'use client'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'filled'
}

export function Button({ variant = 'filled', className = '', children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-medium text-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan'

  const variants = {
    outlined: 'border border-cyan text-cyan hover:bg-cyan hover:text-bg',
    filled: 'bg-orange text-white hover:bg-orange/80',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
