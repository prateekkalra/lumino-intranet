export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface TeamMember extends User {
  status: 'available' | 'busy' | 'away' | 'offline';
  currentProject?: string;
  workHours: {
    start: string;
    end: string;
    timezone: string;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  dashboardLayout: string; // JSON string of widget positions
  notifications: {
    email: boolean;
    push: boolean;
    mentions: boolean;
  };
  language: string;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  badgeIcon: string;
  earnedAt: Date;
  category: 'performance' | 'collaboration' | 'innovation' | 'leadership';
}