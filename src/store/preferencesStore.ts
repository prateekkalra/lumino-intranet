import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  dashboardLayout: Record<string, any>
  notifications: {
    showDesktopNotifications: boolean
    soundEnabled: boolean
    emailDigest: 'none' | 'daily' | 'weekly'
  }
  display: {
    compactMode: boolean
    animationsEnabled: boolean
    reducedMotion: boolean
  }
  privacy: {
    onlineStatus: boolean
    activityStatus: boolean
  }
  accessibility: {
    highContrast: boolean
    largeText: boolean
    screenReader: boolean
  }
  recentSearches: string[]
  favoriteDialogs: string[]
  commandPaletteHistory: string[]
}

interface PreferencesStore {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => void
  updateNotificationSettings: (updates: Partial<UserPreferences['notifications']>) => void
  updateDisplaySettings: (updates: Partial<UserPreferences['display']>) => void
  updatePrivacySettings: (updates: Partial<UserPreferences['privacy']>) => void
  updateAccessibilitySettings: (updates: Partial<UserPreferences['accessibility']>) => void
  addRecentSearch: (search: string) => void
  addToCommandHistory: (command: string) => void
  toggleFavoriteDialog: (dialogId: string) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  sidebarOpen: true,
  dashboardLayout: {},
  notifications: {
    showDesktopNotifications: true,
    soundEnabled: true,
    emailDigest: 'daily'
  },
  display: {
    compactMode: false,
    animationsEnabled: true,
    reducedMotion: false
  },
  privacy: {
    onlineStatus: true,
    activityStatus: true
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    screenReader: false
  },
  recentSearches: [],
  favoriteDialogs: [],
  commandPaletteHistory: []
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,

      updatePreferences: (updates) => 
        set((state) => ({
          preferences: { ...state.preferences, ...updates }
        })),

      updateNotificationSettings: (updates) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: { ...state.preferences.notifications, ...updates }
          }
        })),

      updateDisplaySettings: (updates) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            display: { ...state.preferences.display, ...updates }
          }
        })),

      updatePrivacySettings: (updates) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            privacy: { ...state.preferences.privacy, ...updates }
          }
        })),

      updateAccessibilitySettings: (updates) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            accessibility: { ...state.preferences.accessibility, ...updates }
          }
        })),

      addRecentSearch: (search) =>
        set((state) => {
          const recentSearches = [
            search,
            ...state.preferences.recentSearches.filter(s => s !== search)
          ].slice(0, 10) // Keep only last 10 searches
          
          return {
            preferences: {
              ...state.preferences,
              recentSearches
            }
          }
        }),

      addToCommandHistory: (command) =>
        set((state) => {
          const commandPaletteHistory = [
            command,
            ...state.preferences.commandPaletteHistory.filter(c => c !== command)
          ].slice(0, 20) // Keep only last 20 commands
          
          return {
            preferences: {
              ...state.preferences,
              commandPaletteHistory
            }
          }
        }),

      toggleFavoriteDialog: (dialogId) =>
        set((state) => {
          const favoriteDialogs = state.preferences.favoriteDialogs.includes(dialogId)
            ? state.preferences.favoriteDialogs.filter(id => id !== dialogId)
            : [...state.preferences.favoriteDialogs, dialogId]
          
          return {
            preferences: {
              ...state.preferences,
              favoriteDialogs
            }
          }
        }),

      resetPreferences: () => 
        set({ preferences: defaultPreferences })
    }),
    {
      name: 'lumino-preferences',
      partialize: (state) => ({ preferences: state.preferences })
    }
  )
)