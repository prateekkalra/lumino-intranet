import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';

const mockTasks = [
  { id: '1', title: 'Review Q4 Reports', status: 'todo', priority: 'high', dueDate: 'Today' },
  { id: '2', title: 'Team Meeting Prep', status: 'in-progress', priority: 'medium', dueDate: 'Tomorrow' },
  { id: '3', title: 'Update Documentation', status: 'done', priority: 'low', dueDate: 'Yesterday' },
  { id: '4', title: 'Client Presentation', status: 'todo', priority: 'high', dueDate: 'Friday' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'todo':
      return <Circle className="h-4 w-4 text-gray-400" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'done':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const TasksWidget = () => {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {mockTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700">
              <div className="mt-0.5">
                {getStatusIcon(task.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {task.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Due: {task.dueDate}
                </p>
              </div>
              <Badge className={`${getPriorityColor(task.priority)} text-xs`} variant="secondary">
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};