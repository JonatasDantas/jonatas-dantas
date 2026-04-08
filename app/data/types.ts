export interface Skill {
  name: string
  /** Path to icon under /public/skills/ */
  icon: string
}

export interface SkillGroup {
  category: string
  items: Skill[]
}

export interface Project {
  id: string
  name: string
  description: string
  /** Path to image under /public/projects/ */
  image: string
  tags: string[]
  url: string
}
