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
      <Card className={`h-full flex flex-col bg-white dark:bg-gray-800 border transition-all duration-200 ${
        isDragging 
          ? 'shadow-2xl border-blue-400 ring-4 ring-blue-400/30 bg-blue-50/20 dark:bg-blue-900/20' 
          : 'shadow-sm hover:shadow-md border-gray-200 dark:border-gray-700'
      } ${isEditMode && !isDragging ? 'ring-1 ring-blue-300/50 hover:ring-2 hover:ring-blue-400/50' : ''}`}>
        
        {/* Widget Header */}
        <div className={`flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200 ${
          isDragging 
            ? 'bg-blue-50/70 dark:bg-blue-900/30' 
            : 'bg-gray-50/50 dark:bg-gray-900/50'
        }`}>
          <div className="flex items-center gap-2">
            {isDraggable && dragHandleProps && (
              <div
                {...dragHandleProps}
                className={`cursor-grab active:cursor-grabbing p-2 rounded transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isDragging ? 'bg-blue-100 dark:bg-blue-900 scale-110' : ''
                }`}
                title="Drag to move widget"
              >
                <GripVertical className={`h-4 w-4 transition-colors duration-150 ${
                  isDragging ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {widget.title}
            </h3>
          </div>

          {/* Edit Mode Controls */}
          {isEditMode && !isDragging && (
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleVisibility}
                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {widget.isVisible ? (
                  <Eye className="h-3 w-3 text-gray-500" />
                ) : (
                  <EyeOff className="h-3 w-3 text-gray-500" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemoveWidget}
                className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Widget Content */}
        <div className="flex-1 p-4 overflow-hidden relative">
          {widget.isVisible ? (
            <div className="h-full">{children}</div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <EyeOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Widget hidden</p>
              </div>
            </div>
          )}
          
          {/* Dragging Indicator */}
          {isDragging && (
            <div className="absolute inset-0 bg-blue-400/10 backdrop-blur-sm flex items-center justify-center rounded-lg border-2 border-dashed border-blue-400">
              <div className="text-center text-blue-700 dark:text-blue-300">
                <div className="text-2xl font-bold mb-1">✋</div>
                <p className="text-sm font-semibold">Moving widget...</p>
              </div>
            </div>
          )}
        </div>

        {/* Resize Handle (if resizable and in edit mode) */}
        {isEditMode && widget.isResizable && !isDragging && (
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-60 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>
        )}
      </Card>
    </div>
  );
};