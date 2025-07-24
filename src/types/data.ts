export interface NewsPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: Date;
  category: 'announcement' | 'update' | 'event' | 'achievement';
  image?: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  createdAt: Date;
  labels: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
  type: 'meeting' | 'event' | 'deadline' | 'reminder';
  isAllDay: boolean;
}

export interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    trend: 'up' | 'down' | 'stable';
    data: { month: string; value: number; }[];
  };
  productivity: {
    current: number;
    previous: number;
    trend: 'up' | 'down' | 'stable';
    data: { date: string; value: number; }[];
  };
  projects: {
    completed: number;
    inProgress: number;
    upcoming: number;
    data: { status: string; count: number; }[];
  };
}

export interface Recognition {
  id: string;
  recipient: {
    name: string;
    avatar?: string;
    role: string;
  };
  sender: {
    name: string;
    avatar?: string;
  };
  message: string;
  type: 'kudos' | 'achievement' | 'milestone';
  createdAt: Date;
  reactions: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}