import { useState, useMemo } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { TasksModal } from '../dialogs/TasksModal';
import { Plus, Clock, CheckCircle2, Circle, ArrowRight, Calendar } from 'lucide-react';
import { Task, TaskStatus, INITIAL_TASKS, getPriorityColor, getColumnConfig } from '../../types/tasks';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';

const getStatusIcon = (status: TaskStatus) => {
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

export const TasksWidget = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Create search provider for tasks
  const searchProvider = useMemo(() => ({
    getSearchableData: (): SearchResult[] => {
      return tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || `${task.priority} priority task due ${task.dueDate}`,
        type: 'task' as const,
        category: `${task.status} task`,
        content: `${task.title} ${task.description || ''} ${task.priority} ${task.dueDate}`,
        widget: 'TasksWidget',
        metadata: {
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          date: task.createdAt || new Date()
        },
        action: () => setIsModalOpen(true)
      }));
    }
  }), [tasks]);

  // Register with search service
  useSearchProvider('TasksWidget', searchProvider);

  const handleTasksChange = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      status: 'todo',
      priority: 'medium',
      dueDate: 'Today'
    };
    
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    toast({
      title: "Task added",
      description: "New task added to your list",
    });
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getUrgentTasks = () => {
    return tasks
      .filter(task => task.status !== 'done')
      .filter(task => task.priority === 'high' || task.dueDate === 'Today')
      .slice(0, 3);
  };

  const TaskItem = ({ task }: { task: Task }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex-shrink-0">
        {getStatusIcon(task.status)}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          task.status === 'done' 
            ? 'line-through text-gray-500 dark:text-gray-400' 
            : 'text-gray-900 dark:text-white'
        }`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            className={`${getPriorityColor(task.priority)} text-xs`} 
            variant="secondary"
          >
            {task.priority}
          </Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {task.dueDate}
          </span>
        </div>
      </div>
    </div>
  );

  const StatusSummary = ({ status }: { status: TaskStatus }) => {
    const config = getColumnConfig(status);
    const count = getTasksByStatus(status).length;

    return (
      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {config.title}
          </span>
        </div>
        <Badge variant="secondary" className="text-sm font-semibold">
          {count}
        </Badge>
      </div>
    );
  };

  const urgentTasks = getUrgentTasks();

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">My Tasks</h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={addNewTask}
              className="h-6 px-2 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="h-6 px-2 text-xs"
            >
              View All
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Task Status Summary */}
        <div className="space-y-2 mb-4">
          <StatusSummary status="todo" />
          <StatusSummary status="in-progress" />
          <StatusSummary status="done" />
        </div>

        {/* Recent/Urgent Tasks */}
        <div className="flex-1 min-h-0">
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Priority & Due Today
            </h4>
          </div>
          
          {urgentTasks.length > 0 ? (
            <div className="space-y-1">
              {urgentTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                All caught up!
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                No urgent tasks today
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{tasks.filter(t => t.status === 'done').length} done</span>
            <span>{tasks.filter(t => t.status !== 'done').length} pending</span>
          </div>
        </div>
      </div>

      {/* Full Tasks Modal */}
      <TasksModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTasks={tasks}
        onTasksChange={handleTasksChange}
      />
    </>
  );
};