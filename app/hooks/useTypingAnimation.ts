'use client'

import { useState, useEffect, useRef } from 'react'

export function useTypingAnimation(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseMs = 1500,
): string {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')
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
