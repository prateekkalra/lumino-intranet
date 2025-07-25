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
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
  }
};

export const getColumnConfig = (status: TaskStatus): TaskColumnConfig => {
  switch (status) {
    case 'todo':
      return {
        title: 'To Do',
        color: 'border-gray-200 dark:border-gray-700',
        headerColor: 'bg-gray-50 dark:bg-gray-800/50',
        textColor: 'text-gray-700 dark:text-gray-300',
        accent: 'bg-gray-100 dark:bg-gray-800'
      };
    case 'in-progress':
      return {
        title: 'In Progress',
        color: 'border-blue-200 dark:border-blue-700',
        headerColor: 'bg-blue-50 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        accent: 'bg-blue-100 dark:bg-blue-900/30'
      };
    case 'done':
      return {
        title: 'Done',
        color: 'border-green-200 dark:border-green-700',
        headerColor: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-700 dark:text-green-300',
        accent: 'bg-green-100 dark:bg-green-900/30'
      };
  }
};