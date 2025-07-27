import { useState, useMemo } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useToast } from '../ui/use-toast';
import { TasksModal } from '../dialogs/TasksModal';
import { Plus, Clock, CheckCircle2, Circle, ArrowRight, Calendar } from 'lucide-react';
import { Task, INITIAL_TASKS } from '../../types/tasks';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';


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
      description: 'Task description',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      assignee: 'Current User',
      createdAt: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task created",
      description: "New task has been added to your list",
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'todo' : 
                         task.status === 'todo' ? 'in-progress' : 'done';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const openTasksModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Tasks</span>
            <Button size="sm" onClick={addNewTask}>
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <ScrollArea className="h-full">
            {/* Todo Column */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  To Do ({tasksByStatus.todo.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasksByStatus.todo.slice(0, 3).map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => toggleTaskStatus(task.id)}>
                    <CardContent className="p-3">
                      <CardTitle className="text-xs font-medium text-foreground">
                        {task.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* In Progress Column */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  In Progress ({tasksByStatus['in-progress'].length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasksByStatus['in-progress'].slice(0, 2).map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => toggleTaskStatus(task.id)}>
                    <CardContent className="p-3">
                      <CardTitle className="text-xs font-medium text-foreground">
                        {task.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Done Column */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Done ({tasksByStatus.done.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasksByStatus.done.slice(0, 2).map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => toggleTaskStatus(task.id)}>
                    <CardContent className="p-3">
                      <CardTitle className="text-xs font-medium text-muted-foreground line-through">
                        {task.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={openTasksModal}
            className="w-full"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            View All Tasks
          </Button>
        </CardFooter>
      </Card>

      <TasksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTasks={tasks}
        onTasksChange={handleTasksChange}
      />
    </>
  );
};