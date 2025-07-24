import { create } from 'zustand';
import type { DashboardLayout, WidgetConfig, WidgetType } from '../types/dashboard';

interface DashboardStore {
  layout: DashboardLayout;
  isEditMode: boolean;
  setEditMode: (isEditMode: boolean) => void;
  updateWidgetPosition: (widgetId: string, position: { x: number; y: number; w: number; h: number }) => void;
  toggleWidgetVisibility: (widgetId: string) => void;
  addWidget: (type: WidgetType) => void;
  removeWidget: (widgetId: string) => void;
  resetLayout: () => void;
}

const defaultWidgets: WidgetConfig[] = [
  {
    id: 'welcome-1',
    type: 'welcome',
    title: 'Welcome',
    position: { x: 0, y: 0, w: 8, h: 2 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'quick-actions-1',
    type: 'quick-actions',
    title: 'Quick Actions',
    position: { x: 8, y: 0, w: 4, h: 2 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'news-feed-1',
    type: 'news-feed',
    title: 'Company News',
    position: { x: 0, y: 2, w: 6, h: 4 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'tasks-1',
    type: 'tasks',
    title: 'My Tasks',
    position: { x: 6, y: 2, w: 3, h: 4 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'team-members-1',
    type: 'team-members',
    title: 'Team Pulse',
    position: { x: 9, y: 2, w: 3, h: 2 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'calendar-1',
    type: 'calendar',
    title: 'Calendar',
    position: { x: 0, y: 6, w: 4, h: 3 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'analytics-1',
    type: 'analytics',
    title: 'Analytics',
    position: { x: 4, y: 6, w: 4, h: 3 },
    isVisible: true,
    isResizable: true,
  },
  {
    id: 'recognition-1',
    type: 'recognition',
    title: 'Recognition Wall',
    position: { x: 8, y: 4, w: 4, h: 5 },
    isVisible: true,
    isResizable: true,
  },
];

export const useDashboardStore = create<DashboardStore>()((set) => ({
  layout: {
    widgets: defaultWidgets,
    isEditMode: false,
  },
  isEditMode: false,
  
  setEditMode: (isEditMode: boolean) =>
    set((state) => ({
      isEditMode,
      layout: { ...state.layout, isEditMode },
    })),

  updateWidgetPosition: (widgetId: string, position) =>
    set((state) => ({
      layout: {
        ...state.layout,
        widgets: state.layout.widgets.map((widget) =>
          widget.id === widgetId ? { ...widget, position } : widget
        ),
      },
    })),

  toggleWidgetVisibility: (widgetId: string) =>
    set((state) => ({
      layout: {
        ...state.layout,
        widgets: state.layout.widgets.map((widget) =>
          widget.id === widgetId
            ? { ...widget, isVisible: !widget.isVisible }
            : widget
        ),
      },
    })),

  addWidget: (type: WidgetType) =>
    set((state) => {
      const newWidget: WidgetConfig = {
        id: `${type}-${Date.now()}`,
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
        position: { x: 0, y: 0, w: 4, h: 2 },
        isVisible: true,
        isResizable: true,
      };
      return {
        layout: {
          ...state.layout,
          widgets: [...state.layout.widgets, newWidget],
        },
      };
    }),

  removeWidget: (widgetId: string) =>
    set((state) => ({
      layout: {
        ...state.layout,
        widgets: state.layout.widgets.filter((widget) => widget.id !== widgetId),
      },
    })),

  resetLayout: () =>
    set({
      layout: {
        widgets: defaultWidgets,
        isEditMode: false,
      },
      isEditMode: false,
    }),
}));