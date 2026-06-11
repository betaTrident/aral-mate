export type Urgency = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  subject: string
  deadline: string // ISO date string
  urgency: Urgency
  details: string
  completed: boolean
  createdAt: string
}

export interface Announcement {
  id: string
  title: string
  date: string
  details: string
}

export interface Reminder {
  id: string
  title: string
  date: string
  details: string
}

export interface ParsedResult {
  tasks: Omit<Task, 'id' | 'completed' | 'createdAt'>[]
  announcements: Omit<Announcement, 'id'>[]
  reminders: Omit<Reminder, 'id'>[]
  summary: string
}

export interface Settings {
  childName: string
  childGrade: string
}
