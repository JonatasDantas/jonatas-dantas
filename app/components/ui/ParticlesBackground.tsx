'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container } from '@tsparticles/engine'

let enginePromise: Promise<void> | null = null

function getEngine(): Promise<void> {
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })
  }
  return enginePromise
}

export function ParticlesBackground() {
  const [ready, setReady] = useState(false)
  const containerRef = useRef<Container | undefined>(undefined)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    getEngine().then(() => setReady(true))
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    containerRef.current = container
  }, [])

  useEffect(() => {
    if (!ready) return

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          containerRef.current?.play()
        } else {
          containerRef.current?.pause()
        }
      },
      { threshold: 0 },
    )
    observer.observe(wrapper)

    const handleVisibility = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight

      // Check if container is at least partially in the viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isVisible)
    }
    document.addEventListener('scroll', handleVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('scroll', handleVisibility)
    }
  }, [ready])

  if (!ready) return null

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0">
      {isVisible && (
      <Particles
        id="hero-particles"
        className="absolute inset-0"
        particlesLoaded={particlesLoaded}
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
    )}
    </div>
  )
}
