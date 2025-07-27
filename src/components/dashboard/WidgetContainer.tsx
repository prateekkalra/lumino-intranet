import React from 'react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { GripVertical, X, Eye, EyeOff } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import type { WidgetConfig } from '../../types/dashboard';

interface WidgetContainerProps {
  widget: WidgetConfig;
  children: React.ReactNode;
  isDraggable?: boolean;
  isEditMode?: boolean;
  isDragging?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  widget,
  children,
  isDraggable = false,
  isEditMode = false,
  isDragging = false,
  dragHandleProps,
}) => {
  const { toggleWidgetVisibility, removeWidget } = useDashboardStore();

  const handleToggleVisibility = () => {
    toggleWidgetVisibility(widget.id);
  };

  const handleRemoveWidget = () => {
    removeWidget(widget.id);
  };

  return (
    <div className="h-full">
      <Card
        className={`h-full flex flex-col transition-all rounded-2xl duration-300 border bg-white dark:bg-gray-900 ${
          isDragging
            ? 'shadow-xl border-blue-400 ring-4 ring-blue-400/20 backdrop-blur-md'
            : 'shadow-sm hover:shadow-md border-gray-200 dark:border-gray-700'
        } ${isEditMode && !isDragging ? 'ring-1 ring-muted/30 hover:ring-blue-400/40' : ''}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 rounded-t-2xl border-b transition-colors duration-200 ${
            isDragging
              ? 'bg-blue-100/50 dark:bg-blue-900/40'
              : 'bg-muted/40 dark:bg-muted/10 border-muted'
          }`}
        >
          <div className="flex items-center gap-2">
            {isDraggable && dragHandleProps && (
              <div
                {...dragHandleProps}
                className={`cursor-grab active:cursor-grabbing p-1.5 rounded-md transition hover:bg-accent ${
                  isDragging ? 'bg-blue-200 dark:bg-blue-900 scale-110' : ''
                }`}
                title="Drag widget"
              >
                <GripVertical
                  className={`h-4 w-4 transition-colors ${
                    isDragging ? 'text-blue-600' : 'text-muted-foreground'
                  }`}
                />
              </div>
            )}
            <h3 className="font-semibold text-sm text-foreground">{widget.title}</h3>
          </div>

          {isEditMode && !isDragging && (
            <div className="flex items-center gap-1.5">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleToggleVisibility}
                className="h-7 w-7 p-0"
              >
                {widget.isVisible ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemoveWidget}
                className="h-7 w-7 p-0 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="relative flex-1 p-4 overflow-hidden">
          {widget.isVisible ? (
            <div className="h-full">{children}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-70">
              <EyeOff className="h-8 w-8 mb-2" />
              <p className="text-sm">This widget is hidden</p>
            </div>
          )}

          {/* Dragging Overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-blue-400/10 backdrop-blur-md">
              <div className="text-center text-blue-700 dark:text-blue-300">
                <div className="text-2xl font-semibold mb-1">✋</div>
                <p className="text-sm">Moving widget...</p>
              </div>
            </div>
          )}
        </div>

        {/* Resize Handle */}
        {isEditMode && widget.isResizable && !isDragging && (
          <div className="absolute bottom-1.5 right-1.5 w-4 h-4 cursor-se-resize opacity-60 hover:opacity-90 transition-opacity">
            <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full" />
          </div>
        )}
      </Card>
    </div>
  );
};
