'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Technologies I work with, grouped by domain">
          Skills
        </SectionTitle>

        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-cyan font-mono text-sm font-medium tracking-widest uppercase mb-5">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm cursor-default transition-all duration-300 hover:border-cyan hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-6 h-6 relative flex-shrink-0">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
