import { create } from 'zustand';
import type { DashboardLayout, WidgetConfig, WidgetType } from '../types/dashboard';

interface DashboardStore {
  layout: DashboardLayout;
  isEditMode: boolean;
  setEditMode: (isEditMode: boolean) => void;
  updateWidgetPosition: (widgetId: string, position: { x: number; y: number; w: number; h: number }) => void;
  swapWidgetPositions: (widgetId1: string, widgetId2: string) => void;
  toggleWidgetVisibility: (widgetId: string) => void;
  addWidget: (type: WidgetType) => void;
  removeWidget: (widgetId: string) => void;
  resetLayout: () => void;
}

// Grid validation helper
const hasWidgetOverlap = (widget1: WidgetConfig, widget2: WidgetConfig): boolean => {
  if (widget1.id === widget2.id) return false;
  
  const w1 = widget1.position;
  const w2 = widget2.position;
  
  // Check if widgets overlap in both x and y dimensions
  const xOverlap = w1.x < (w2.x + w2.w) && (w1.x + w1.w) > w2.x;
  const yOverlap = w1.y < (w2.y + w2.h) && (w1.y + w1.h) > w2.y;
  
  return xOverlap && yOverlap;
};

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
    position: { x: 9, y: 4, w: 3, h: 5 },
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
    set((state) => {
      const updatedWidget = { 
        ...state.layout.widgets.find(w => w.id === widgetId)!, 
        position 
      };
      
      // Check for overlaps with other widgets
      const hasOverlap = state.layout.widgets.some(widget => 
        widget.id !== widgetId && hasWidgetOverlap(updatedWidget, widget)
      );
      
      // Only update if no overlap detected
      if (hasOverlap) {
        console.warn('Widget position update blocked due to overlap');
        return state;
      }
      
      return {
        layout: {
          ...state.layout,
          widgets: state.layout.widgets.map((widget) =>
            widget.id === widgetId ? { ...widget, position } : widget
          ),
        },
      };
    }),

  swapWidgetPositions: (widgetId1: string, widgetId2: string) =>
    set((state) => {
      const widget1 = state.layout.widgets.find(w => w.id === widgetId1);
      const widget2 = state.layout.widgets.find(w => w.id === widgetId2);
      
      if (!widget1 || !widget2) {
        console.warn('Widget not found for swap operation');
        return state;
      }
      
      // Perform atomic swap without overlap validation
      return {
        layout: {
          ...state.layout,
          widgets: state.layout.widgets.map((widget) => {
            if (widget.id === widgetId1) {
              return { ...widget, position: widget2.position };
            }
            if (widget.id === widgetId2) {
              return { ...widget, position: widget1.position };
            }
            return widget;
          }),
        },
      };
    }),

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