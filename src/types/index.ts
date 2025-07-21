// Core types for the intranet application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  title: string
  department: string
  location: string
  skills: string[]
  pronouns?: string
  bio?: string
  status: 'online' | 'offline' | 'away' | 'busy'
  lastSeen?: Date
}

export interface Widget {
  id: string
  type: 'welcome' | 'quick-actions' | 'tasks' | 'team-pulse' | 'analytics'
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  settings?: Record<string, any>
}

export interface NewsPost {
  id: string
  type: 'announcement' | 'achievement' | 'event' | 'media'
  title: string
  content: string
  author: User
  timestamp: Date
  tags: string[]
  reactions: Array<{ emoji: string; count: number; users: string[] }>
  comments: Comment[]
  attachments?: string[]
  pinned?: boolean
}

export interface Comment {
  id: string
  content: string
  author: User
  timestamp: Date
  replies?: Comment[]
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignee?: User
  dueDate?: Date
  tags: string[]
  project?: string
}

export interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  location?: string
  type: 'meeting' | 'social' | 'training' | 'all-hands'
  attendees: User[]
  organizer: User
  isVirtual: boolean
  meetingLink?: string
}

export interface Resource {
  id: string
  name: string
  type: 'room' | 'equipment' | 'parking'
  capacity?: number
  location: string
  amenities?: string[]
  availability: Array<{ start: Date; end: Date }>
  bookings: Array<{ user: User; start: Date; end: Date }>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
  actionUrl?: string
}