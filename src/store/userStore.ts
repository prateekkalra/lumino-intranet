import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserPreferences, TeamMember } from '../types/user';

interface UserStore {
  currentUser: User | null;
  preferences: UserPreferences;
  teamMembers: TeamMember[];
  setCurrentUser: (user: User) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setTeamMembers: (members: TeamMember[]) => void;
  updateMemberStatus: (userId: string, status: TeamMember['status']) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  dashboardLayout: '',
  notifications: {
    email: true,
    push: true,
    mentions: true,
  },
  language: 'en',
};

// Mock team members data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b60bb8d9?w=150&h=150&fit=crop&crop=face',
    role: 'Product Manager',
    department: 'Product',
    isOnline: true,
    status: 'available',
    currentProject: 'Dashboard Redesign',
    workHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'UTC-5',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Senior Developer',
    department: 'Engineering',
    isOnline: true,
    status: 'busy',
    currentProject: 'API Integration',
    workHours: {
      start: '10:00',
      end: '18:00',
      timezone: 'UTC-8',
    },
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'UX Designer',
    department: 'Design',
    isOnline: false,
    status: 'away',
    currentProject: 'Mobile App Design',
    workHours: {
      start: '09:30',
      end: '17:30',
      timezone: 'UTC-3',
    },
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Marketing Lead',
    department: 'Marketing',
    isOnline: true,
    status: 'available',
    currentProject: 'Q1 Campaign',
    workHours: {
      start: '08:00',
      end: '16:00',
      timezone: 'UTC-6',
    },
  },
];

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: {
        id: 'current-user',
        name: 'Alex Thompson',
        email: 'alex.thompson@company.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        role: 'Senior Product Manager',
        department: 'Product',
        isOnline: true,
      },
      preferences: defaultPreferences,
      teamMembers: mockTeamMembers,

      setCurrentUser: (user: User) => set({ currentUser: user }),

      updatePreferences: (newPreferences: Partial<UserPreferences>) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      setTeamMembers: (members: TeamMember[]) => set({ teamMembers: members }),

      updateMemberStatus: (userId: string, status: TeamMember['status']) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((member) =>
            member.id === userId ? { ...member, status } : member
          ),
        })),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        preferences: state.preferences,
      }),
    }
  )
);