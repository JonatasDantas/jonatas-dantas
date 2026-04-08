'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="bg-surface py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="A selection of projects I've built">
          Projects
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="group rounded-2xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm overflow-hidden hover:border-cyan/50 hover:shadow-[0_8px_40px_rgba(34,211,238,0.1)] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <h3 className="text-lg font-sans font-bold text-text-primary mb-2">
                  {project.name}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.url !== '#' ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-orange hover:text-orange/80 transition-colors"
                  >
                    View project →
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-text-muted">
                    Confidential / Coming soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
