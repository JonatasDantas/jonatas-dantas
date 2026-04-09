'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/Badge'

interface Job {
  role: string
  company: string
  companyDescription: string
  location: string
  period: string
  current: boolean
  highlights: string[]
  tags: string[]
}

const jobs: Job[] = [
  {
    role: 'Dev Lead & Senior Full Stack Engineer',
    company: 'Orbital',
    companyDescription:
      'UK-based blockchain infrastructure and fintech platform enabling businesses to send, receive, and manage both fiat and crypto payments at scale.',
    location: 'United Kingdom · Remote',
    period: 'Jan 2024 – Present',
    current: true,
    highlights: [
      'Designed and developed highly scalable applications handling hundreds of thousands of requests per day.',
      'Worked daily in the Blockchain and Fintech sector with major cryptocurrencies: Bitcoin, Ethereum, Solana, Tron, Tether, BNB, and others.',
      "Built the company's core Accounting solution — one of the most critical components in a fintech environment.",
      'Contributed to the Payment Engine: compliance checks, accounting, fund movements across FIAT and crypto vendors, and error-handling via the SAGA pattern.',
      'Stepped into a Tech Lead role: cross-team communication with PMs and stakeholders, driving technical decisions, and providing developer support.',
    ],
    tags: ['TypeScript', 'Node.js', 'AWS', 'React', 'Blockchain', 'Web3', 'Fintech'],
  },
  {
    role: 'Senior Software Engineer',
    company: 'CI&T',
    companyDescription:
      'Global IT services and digital transformation company headquartered in Brazil, delivering outsourced engineering teams to major enterprises worldwide.',
    location: 'Brazil · Remote',
    period: 'Mar 2022 – Jan 2024',
    current: false,
    highlights: [
      'Allocated to one of the top audio industry companies in the US, building testable, scalable code used by thousands of customers.',
      'Designed and developed the Subscriptions feature: recurring payments, fraud checks, and access provisioning.',
      'Built automated CI/CD pipelines using GitHub Actions, AWS CloudFormation/CDK, Sonar, Jest, and Bash.',
      'Built new features and improved existing ones in Salesforce for an optimal end-user experience.',
    ],
    tags: ['TypeScript', 'Node.js', 'AWS', 'React', 'Jest', 'Playwright', 'Salesforce'],
  },
  {
    role: 'Full Stack Software Engineer',
    company: 'Cleartech',
    companyDescription:
      'Brazilian software house specialising in custom web and mobile application development for clients across various industries.',
    location: 'São Paulo, Brazil',
    period: 'Jul 2019 – Mar 2022',
    current: false,
    highlights: [
      'Developed web applications using React, Angular, Vue.js, Java (Spring Boot), SQL databases, MongoDB, and Docker.',
      'Built cross-platform mobile applications with Ionic, Flutter, Android Studio, and Xcode.',
      'Deployed web applications on Linux servers using Bash scripts and Docker containers.',
      'Published iOS and Android apps to the App Store and Google Play.',
    ],
    tags: ['React', 'Angular', 'Vue.js', 'Java', 'Flutter', 'Ionic', 'Docker', 'MongoDB'],
  },
  {
    role: 'IT Intern',
    company: 'Delivery Direto',
    companyDescription:
      'Brazilian food-delivery SaaS startup providing white-label ordering platforms and delivery management tools for restaurants.',
    location: 'São Paulo, Brazil',
    period: 'Jul 2018 – Jul 2019',
    current: false,
    highlights: [
      'Created features for the food-delivery app using JavaScript, PHP, SQL, HTML, CSS, and Git.',
      'Wrote automated end-to-end tests with Cypress, Selenium, Playwright, and Jest.',
    ],
    tags: ['JavaScript', 'PHP', 'SQL', 'Cypress', 'Playwright', 'Jest'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="bg-bg py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Companies I've worked with and the impact I made">
          Experience
        </SectionTitle>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cyan/20 -translate-x-1/2 hidden sm:block" />

          <div className="flex flex-col gap-12">
            {jobs.map((job, i) => (
              <motion.div
                key={job.company + job.period}
                className="relative flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot — hidden on mobile */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full border-2 border-cyan bg-bg hidden sm:block z-10" />

                {/* Left column: period (desktop only) */}
                <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10 pt-5">
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${
                        job.current
                          ? 'border-cyan/50 text-cyan'
                          : 'border-surface-alt text-text-muted'
                      }`}
                    >
                      {job.period}
                    </span>
                    <p className="mt-1 text-xs text-text-muted">{job.location}</p>
                  </div>
                </div>

                {/* Card */}
                <div className="sm:pl-10 md:w-1/2 md:pl-10">
                  {/* Mobile period badge */}
                  <div className="flex items-center gap-2 mb-3 md:hidden">
                    <span
                      className={`inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${
                        job.current
                          ? 'border-cyan/50 text-cyan'
                          : 'border-surface-alt text-text-muted'
                      }`}
                    >
                      {job.period}
                    </span>
                    <span className="text-xs text-text-muted">{job.location}</span>
                  </div>

                  <div className="rounded-2xl border border-surface-alt bg-[rgba(17,24,39,0.7)] backdrop-blur-sm p-6 hover:border-cyan/30 hover:shadow-[0_8px_40px_rgba(34,211,238,0.07)] transition-all duration-300">
                    {/* Role & company */}
                    <h3 className="text-base font-sans font-bold text-text-primary leading-snug">
                      {job.role}
                    </h3>
                    <p className="text-cyan text-sm font-medium mt-0.5 mb-2">{job.company}</p>

                    {/* Company description */}
                    <p className="text-text-muted text-sm leading-relaxed mb-4 italic border-l-2 border-cyan/30 pl-3">
                      {job.companyDescription}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-5">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-text-muted leading-relaxed">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
