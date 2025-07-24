import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useToast } from '../ui/use-toast';
import { Circle, Clock, CheckCircle2, Plus } from 'lucide-react';

type TaskStatus = 'todo' | 'in-progress' | 'done';
type TaskPriority = 'high' | 'medium' | 'low';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

const initialTasks: Task[] = [
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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          let newStatus: TaskStatus;
          switch (task.status) {
            case 'todo':
              newStatus = 'in-progress';
              break;
            case 'in-progress':
              newStatus = 'done';
              break;
            case 'done':
              newStatus = 'todo';
              break;
            default:
              newStatus = 'todo';
          }
          
          toast({
            title: "Task updated",
            description: `"${task.title}" marked as ${newStatus.replace('-', ' ')}`,
          });
          
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const cyclePriority = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          let newPriority: TaskPriority;
          switch (task.priority) {
            case 'low':
              newPriority = 'medium';
              break;
            case 'medium':
              newPriority = 'high';
              break;
            case 'high':
              newPriority = 'low';
              break;
            default:
              newPriority = 'medium';
          }
          
          toast({
            title: "Priority updated",
            description: `"${task.title}" priority set to ${newPriority}`,
          });
          
          return { ...task, priority: newPriority };
        }
        return task;
      })
    );
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: 'New Task',
      status: 'todo',
      priority: 'medium',
      dueDate: 'Today'
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task added",
      description: "New task created successfully",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">My Tasks</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={addNewTask}
          className="h-6 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>

      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="mt-0.5 hover:scale-110 transition-transform cursor-pointer"
                title="Click to change status"
              >
                {getStatusIcon(task.status)}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium line-clamp-2 transition-colors ${
                  task.status === 'done' 
                    ? 'text-gray-500 dark:text-gray-400 line-through' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Due: {task.dueDate}
                </p>
              </div>
              <button
                onClick={() => cyclePriority(task.id)}
                className="hover:scale-105 transition-transform"
                title="Click to change priority"
              >
                <Badge className={`${getPriorityColor(task.priority)} text-xs cursor-pointer`} variant="secondary">
                  {task.priority}
                </Badge>
              </button>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>

      {/* Footer Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{tasks.filter(t => t.status === 'done').length} completed</span>
          <span>{tasks.filter(t => t.status !== 'done').length} remaining</span>
        </div>
      </div>
    </div>
  );
};