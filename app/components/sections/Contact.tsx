'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { send } from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const WHATSAPP_NUMBER = '5511960126820'

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/jdantas',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jonatas-de-almeida',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
]

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface-alt border border-surface-alt rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-cyan transition-colors'

  return (
    <section id="contact" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Let's build something great together">
          Contact
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: invite + social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-sans font-bold text-text-primary mb-4">
              Let&apos;s talk
            </h3>
            <p className="text-text-muted leading-relaxed mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hi —
              I&apos;m always happy to connect. Fill out the form or reach me directly on any of
              the platforms below.
            </p>

            <div className="space-y-4">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted hover:text-cyan transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <input {...register('name')} placeholder="Your name" className={inputClass} />
              {errors.name && (
                <p className="mt-1 text-xs text-orange">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input {...register('email')} placeholder="your@email.com" className={inputClass} />
              {errors.email && (
                <p className="mt-1 text-xs text-orange">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Tell me about your project..."
                rows={5}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-orange">{errors.message.message}</p>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="submit"
                variant="filled"
                disabled={status === 'sending'}
                className="flex-1 justify-center"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-cyan text-cyan text-sm font-medium hover:bg-cyan hover:text-bg transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {status === 'success' && (
              <p className="text-sm text-cyan font-medium">
                ✓ Message sent! I&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-orange">
                Something went wrong. Please try WhatsApp or email directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
