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
      if (document.hidden) {
        containerRef.current?.pause()
      } else {
        containerRef.current?.play()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [ready])

  if (!ready) return null

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0">
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
    </div>
  )
}
