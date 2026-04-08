import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = '5511960126820'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-alt py-8 px-6 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          Designed &amp; built by{' '}
          <span className="text-text-primary font-medium">Jonatas Dantas</span> · 2026
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jdantas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/jonatas-de-almeida"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-text-muted hover:text-cyan transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
