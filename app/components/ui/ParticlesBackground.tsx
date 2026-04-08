'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
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
  )
}
