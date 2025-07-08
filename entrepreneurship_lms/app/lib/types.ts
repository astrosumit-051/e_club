
export interface CaseStudy {
  company: string
  industry: string
  founding_story: string
  problem_identification: string
  solution_development: string
  business_model_evolution: string
  growth_strategies: string
  challenges: string
  pivots: string
  financial_milestones: string
  lessons_learned: string
}

export interface StateResource {
  state_name: string
  state_code: string
  funding_programs: ResourceItem[]
  accelerators_incubators: ResourceItem[]
  communities_networking: ResourceItem[]
  legal_business_resources: ResourceItem[]
  university_programs: ResourceItem[]
  startup_ecosystems: ResourceItem[]
}

export interface ResourceItem {
  name: string
  description: string
  website_url: string
  contact_info: string
  eligibility_criteria: string
  application_deadlines: string
  funding_amount: string
  program_duration: string
  location: string
}

export interface WeekModule {
  weekNumber: number
  title: string
  theme: string
  learningObjectives: string[]
  content: {
    videos: VideoContent[]
    readings: ReadingContent[]
    activities: ActivityContent[]
  }
  caseStudies: string[]
  achievements: string[]
}

export interface VideoContent {
  title: string
  description: string
  duration: string
  placeholder?: boolean
}

export interface ReadingContent {
  title: string
  type: "article" | "guide" | "framework"
  content: string
}

export interface ActivityContent {
  title: string
  type: "exercise" | "template" | "tool"
  description: string
  instructions: string[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  iconName: string
  category: "discovery" | "innovation" | "business" | "leadership" | "impact"
  points: number
}

export interface UserProgress {
  weekNumber: number
  isCompleted: boolean
  progress: number
  completedAt?: Date
}
