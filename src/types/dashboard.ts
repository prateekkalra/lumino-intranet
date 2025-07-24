export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  position: GridPosition;
  isVisible: boolean;
  isResizable: boolean;
}

export type WidgetType = 
  | 'welcome'
  | 'quick-actions'
  | 'news-feed'
  | 'tasks'
  | 'team-members'
  | 'calendar'
  | 'analytics'
  | 'recognition';

export interface DashboardLayout {
  widgets: WidgetConfig[];
  isEditMode: boolean;
}

export interface DragEvent {
  active: {
    id: string;
    data: {
      current?: WidgetConfig;
    };
  };
  over?: {
    id: string;
  };
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder';
}