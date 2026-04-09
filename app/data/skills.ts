import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', icon: '/skills/javascript.png' },
      { name: 'TypeScript', icon: '/skills/typescript.svg' },
      { name: 'React', icon: '/skills/react.png' },
      { name: 'Next.js', icon: '/skills/nextjs.svg' },
      { name: 'Angular', icon: '/skills/angular.png' },
      { name: 'Cypress', icon: '/skills/cypress.svg' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '/skills/nodejs.png' },
      { name: 'NestJS', icon: '/skills/nestjs.svg' },
      { name: 'Python', icon: '/skills/python.svg' },
      { name: 'Java', icon: '/skills/java.png' },
      { name: 'Spring Boot', icon: '/skills/springboot.svg' },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: '/skills/flutter.png' },
      { name: 'React Native', icon: '/skills/react-native.png' },
      { name: 'Ionic', icon: '/skills/ionic.png' },
    ],
  },
  {
    category: 'Infrastructure & Cloud',
    items: [
      { name: 'AWS', icon: '/skills/aws.png' },
      { name: 'Docker', icon: '/skills/docker.png' },
      { name: 'GitHub Actions', icon: '/skills/githubactions.svg' },
      { name: 'Linux', icon: '/skills/linux.jpg' },
      { name: 'MongoDB', icon: '/skills/mongodb.svg' },
      { name: 'SQL', icon: '/skills/sql.jpg' },
    ],
  },
  {
    category: 'AI Engineering',
    items: [
      { name: 'LLM Engineering', icon: '/skills/openai.svg' },
      { name: 'RAG', icon: '/skills/langchain.svg' },
      { name: 'Fine-tuning', icon: '/skills/huggingface.svg' },
      { name: 'AI Agents', icon: '/skills/anthropic.svg' },
      { name: 'Open-source LLMs', icon: '/skills/ollama.svg' },
    ],
  },
]
