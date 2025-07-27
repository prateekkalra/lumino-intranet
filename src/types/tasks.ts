export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  description?: string;
  assignee?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskColumnConfig {
  title: string;
  color: string;
  headerColor: string;
  textColor: string;
  accent?: string;
}

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review Q4 Reports', status: 'todo', priority: 'high', dueDate: 'Today' },
  { id: '2', title: 'Team Meeting Prep', status: 'in-progress', priority: 'medium', dueDate: 'Tomorrow' },
  { id: '3', title: 'Update Documentation', status: 'done', priority: 'low', dueDate: 'Yesterday' },
  { id: '4', title: 'Client Presentation', status: 'todo', priority: 'high', dueDate: 'Friday' },
  { id: '5', title: 'Code Review', status: 'in-progress', priority: 'medium', dueDate: 'Today' },
  { id: '6', title: 'Database Optimization', status: 'done', priority: 'high', dueDate: 'Last Week' },
];

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'high':
      return 'bg-destructive/10 text-destructive-foreground border border-destructive/20';
    case 'medium':
      return 'bg-warning/10 text-warning-foreground border border-warning/20';
    case 'low':
      return 'bg-success/10 text-success-foreground border border-success/20';
    default:
      return 'bg-secondary/10 text-secondary-foreground border border-secondary/20';
  }
};

export const getColumnConfig = (status: TaskStatus): TaskColumnConfig => {
  switch (status) {
    case 'todo':
      return {
        title: 'To Do',
        color: 'border-border',
        headerColor: 'bg-secondary/50',
        textColor: 'text-secondary-foreground',
        accent: 'bg-secondary'
      };
    case 'in-progress':
      return {
        title: 'In Progress',
        color: 'border-info',
        headerColor: 'bg-info/20',
        textColor: 'text-info-foreground',
        accent: 'bg-info/30'
      };
    case 'done':
      return {
        title: 'Done',
        color: 'border-success',
        headerColor: 'bg-success/20',
        textColor: 'text-success-foreground',
        accent: 'bg-success/30'
      };
  }
};