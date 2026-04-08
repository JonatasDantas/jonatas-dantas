import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', icon: '/skills/javascript.png' },
      { name: 'TypeScript', icon: '/skills/typescript.svg' },
      { name: 'React', icon: '/skills/react.png' },
      { name: 'Angular', icon: '/skills/angular.png' },
      { name: 'Vue.js', icon: '/skills/vue.png' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '/skills/nodejs.png' },
      { name: 'Python', icon: '/skills/python.svg' },
      { name: 'Java', icon: '/skills/java.png' },
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
      { name: 'Linux', icon: '/skills/linux.jpg' },
      { name: 'SQL', icon: '/skills/sql.jpg' },
    ],
  },
]
