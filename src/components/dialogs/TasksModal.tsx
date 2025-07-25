import { useState, useCallback, useEffect, memo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  Circle, 
  GripVertical, 
  Edit, 
  Trash2, 
  Calendar,
  Flag
} from 'lucide-react';
import { Task, TaskStatus, TaskPriority, getPriorityColor, getColumnConfig } from '../../types/tasks';

interface TasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

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

export const TasksModal = ({ isOpen, onClose, initialTasks, onTasksChange }: TasksModalProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const { toast } = useToast();

  // Sync tasks when initialTasks change
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Sync tasks with parent component when tasks change
  useEffect(() => {
    onTasksChange(tasks);
  }, [tasks, onTasksChange]);

  const updateTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    onTasksChange(newTasks);
  }, [onTasksChange]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;
    
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      
      // Find the dragged task
      const draggedTaskIndex = newTasks.findIndex(task => task.id === draggableId);
      const draggedTask = newTasks[draggedTaskIndex];
      
      if (!draggedTask) return prevTasks;

      // Remove from source
      newTasks.splice(draggedTaskIndex, 1);
      
      // Update status if moving between columns
      if (sourceStatus !== destStatus) {
        draggedTask.status = destStatus;
      }
      
      // Find insertion point
      if (destStatus === sourceStatus) {
        // Same column reordering
        const columnTasks = newTasks.filter(task => task.status === destStatus);
        const insertIndex = destination.index;
        const actualIndex = newTasks.findIndex(task => task === columnTasks[insertIndex]);
        newTasks.splice(actualIndex >= 0 ? actualIndex : newTasks.length, 0, draggedTask);
      } else {
        // Different column - add at the end of destination column or at specific index
        const destColumnTasks = newTasks.filter(task => task.status === destStatus);
        if (destination.index >= destColumnTasks.length) {
          // Add at the end
          newTasks.push(draggedTask);
        } else {
          // Insert at specific position
          const targetTask = destColumnTasks[destination.index];
          const insertIndex = newTasks.findIndex(task => task === targetTask);
          newTasks.splice(insertIndex, 0, draggedTask);
        }
      }
      
      // Show toast notification
      if (sourceStatus !== destStatus) {
        toast({
          title: "Task moved",
          description: `"${draggedTask.title}" moved to ${getColumnConfig(destStatus).title}`,
        });
      }
      
      return newTasks;
    });
  }, [toast]);

  const addNewTask = useCallback((status: TaskStatus = 'todo') => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      status,
      priority: 'medium',
      dueDate: 'Today'
    };
    
    const newTasks = [...tasks, newTask];
    updateTasks(newTasks);
    toast({
      title: "Task added",
      description: `New task added to ${getColumnConfig(status).title}`,
    });
  }, [tasks, updateTasks, toast]);

  const deleteTask = useCallback((taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const newTasks = tasks.filter(t => t.id !== taskId);
    updateTasks(newTasks);
    toast({
      title: "Task deleted",
      description: `"${task?.title}" has been deleted`,
    });
  }, [tasks, updateTasks, toast]);

  const startEditingTask = useCallback((task: Task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  }, []);

  const saveTaskEdit = useCallback(() => {
    if (editingTask && editTitle.trim()) {
      const newTasks = tasks.map(task =>
        task.id === editingTask 
          ? { ...task, title: editTitle.trim() }
          : task
      );
      updateTasks(newTasks);
      toast({
        title: "Task updated",
        description: "Task title has been updated",
      });
    }
    setEditingTask(null);
    setEditTitle('');
  }, [editingTask, editTitle, tasks, updateTasks, toast]);

  const cancelTaskEdit = useCallback(() => {
    setEditingTask(null);
    setEditTitle('');
  }, []);

  const changePriority = useCallback((taskId: string, priority: TaskPriority) => {
    const newTasks = tasks.map(task =>
      task.id === taskId 
        ? { ...task, priority }
        : task
    );
    updateTasks(newTasks);
    toast({
      title: "Priority updated",
      description: `Task priority changed to ${priority}`,
    });
  }, [tasks, updateTasks, toast]);

  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const TaskCard = memo(({ task, index }: { task: Task; index: number }) => (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${
            snapshot.isDragging 
              ? 'shadow-xl z-50' 
              : 'hover:shadow-md transition-shadow duration-150'
          }`}
          style={provided.draggableProps.style}
        >
          <Card 
            className={`cursor-grab active:cursor-grabbing select-none ${
              snapshot.isDragging 
                ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-900/30' 
                : 'hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-150'
            }`}
            style={{
              pointerEvents: snapshot.isDragging ? 'none' : 'auto'
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div
                    {...provided.dragHandleProps}
                    className="mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0 flex items-center justify-center w-6 h-6 -ml-1"
                    style={{
                      cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                      touchAction: 'none'
                    }}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingTask === task.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTaskEdit();
                            if (e.key === 'Escape') cancelTaskEdit();
                          }}
                          className="text-sm font-medium"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={saveTaskEdit}
                            className="h-6 px-2 text-xs"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelTaskEdit}
                            className="h-6 px-2 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <CardTitle 
                        className={`text-sm cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                          task.status === 'done' 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : ''
                        }`}
                        onClick={() => startEditingTask(task)}
                      >
                        {task.title}
                      </CardTitle>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Badge 
                    className={`${getPriorityColor(task.priority)} text-xs cursor-pointer hover:opacity-80 transition-opacity`} 
                    onClick={() => {
                      const priorities: TaskPriority[] = ['low', 'medium', 'high'];
                      const currentIndex = priorities.indexOf(task.priority);
                      const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                      changePriority(task.id, nextPriority);
                    }}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent 
              className="pt-0"
              style={{
                pointerEvents: snapshot.isDragging ? 'none' : 'auto'
              }}
            >
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(task.status)}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditingTask(task)}
                    className="h-5 w-5 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={snapshot.isDragging}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTask(task.id)}
                    className="h-5 w-5 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                    disabled={snapshot.isDragging}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  ));

  const KanbanColumn = memo(({ status }: { status: TaskStatus }) => {
    const config = getColumnConfig(status);
    const columnTasks = getTasksByStatus(status);

    return (
      <div className="flex-1 min-w-0 w-full max-w-none">
        <Card className={`h-full flex flex-col ${config.color}`}>
          <CardHeader className={`${config.headerColor} border-b shrink-0`}>
            <div className="flex items-center justify-between">
              <CardTitle className={`text-base font-semibold ${config.textColor}`}>
                {config.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  {columnTasks.length}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addNewTask(status)}
                  className="h-7 w-7 p-0 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 min-h-0">
            <Droppable droppableId={status} type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`h-full transition-all duration-200 rounded-lg overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 ${
                    snapshot.isDraggingOver 
                      ? `${config.accent} border-2 border-dashed border-current/20 shadow-inner` 
                      : ''
                  }`}
                  style={{
                    minHeight: '400px',
                    maxHeight: 'calc(90vh - 300px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgb(156 163 175) transparent'
                  }}
                >
                  <div className="space-y-2 p-1">
                    {columnTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <div className={`p-4 rounded-full ${config.headerColor} mb-3`}>
                          {getStatusIcon(status)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          No tasks in {config.title.toLowerCase()}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addNewTask(status)}
                          className="text-sm transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Task
                        </Button>
                      </div>
                    ) : (
                      columnTasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      </div>
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] p-0 flex flex-col overflow-hidden tasks-modal-fix">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-xl font-bold">My Tasks - Kanban Board</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{tasks.filter(t => t.status === 'done').length} completed</span>
                <span>•</span>
                <span>{tasks.filter(t => t.status !== 'done').length} remaining</span>
                <span>•</span>
                <span>{tasks.length} total tasks</span>
              </div>
            </div>
            <Button
              onClick={() => addNewTask('todo')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Task
            </Button>
          </div>

          <div className="flex-1 h-full">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-4 h-full min-h-[500px] overflow-x-auto pb-2">
                <KanbanColumn status="todo" />
                <KanbanColumn status="in-progress" />
                <KanbanColumn status="done" />
              </div>
            </DragDropContext>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};