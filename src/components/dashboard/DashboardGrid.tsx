import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useDashboardStore } from '../../store/dashboardStore';
import { WidgetContainer } from './WidgetContainer';
import { WelcomeWidget } from '../widgets/WelcomeWidget';
import { QuickActionsWidget } from '../widgets/QuickActionsWidget';
import { NewsWidget } from '../widgets/NewsWidget';
import { TasksWidget } from '../widgets/TasksWidget';
import { TeamWidget } from '../widgets/TeamWidget';
import { CalendarWidget } from '../widgets/CalendarWidget';
import { AnalyticsWidget } from '../widgets/AnalyticsWidget';
import { RecognitionWidget } from '../widgets/RecognitionWidget';
import { Button } from '../ui/button';
import { Edit3, Save } from 'lucide-react';
import type { WidgetConfig, WidgetType } from '../../types/dashboard';

const GRID_COLS = 12;
const GRID_GAP = 20;
const WIDGET_MIN_HEIGHT = 220;

const WidgetRenderer: React.FC<{ type: WidgetType }> = ({ type }) => {
  switch (type) {
    case 'welcome':
      return <WelcomeWidget />;
    case 'quick-actions':
      return <QuickActionsWidget />;
    case 'news-feed':
      return <NewsWidget />;
    case 'tasks':
      return <TasksWidget />;
    case 'team-members':
      return <TeamWidget />;
    case 'calendar':
      return <CalendarWidget />;
    case 'analytics':
      return <AnalyticsWidget />;
    case 'recognition':
      return <RecognitionWidget />;
    default:
      return <div>Unknown widget type</div>;
  }
};

export const DashboardGrid: React.FC = () => {
  const { layout, isEditMode, setEditMode, updateWidgetPosition } = useDashboardStore();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside any droppable or no movement
    if (!destination) {
      return;
    }

    // If dropped on the same widget, no change needed
    if (destination.droppableId === source.droppableId) {
      return;
    }

    // Find the dragged widget and target widget
    const draggedWidget = layout.widgets.find(w => w.id === draggableId);
    const targetWidget = layout.widgets.find(w => w.id === destination.droppableId);

    if (draggedWidget && targetWidget) {
      // Swap positions
      updateWidgetPosition(draggedWidget.id, targetWidget.position);
      updateWidgetPosition(targetWidget.id, draggedWidget.position);
    }
  };

  const calculateGridStyle = (widget: WidgetConfig): React.CSSProperties => {
    const colWidth = `calc((100% - ${(GRID_COLS - 1) * GRID_GAP}px) / ${GRID_COLS})`;
    const width = `calc(${colWidth} * ${widget.position.w} + ${(widget.position.w - 1) * GRID_GAP}px)`;
    const height = `${widget.position.h * WIDGET_MIN_HEIGHT + (widget.position.h - 1) * GRID_GAP}px`;
    const left = `calc(${colWidth} * ${widget.position.x} + ${widget.position.x * GRID_GAP}px)`;
    const top = `${widget.position.y * (WIDGET_MIN_HEIGHT + GRID_GAP)}px`;

    return {
      position: 'absolute',
      width,
      height,
      left,
      top,
    };
  };

  const visibleWidgets = layout.widgets.filter((widget) => widget.isVisible);

  return (
    <div className="p-6">
      {/* Edit Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Button
          onClick={() => setEditMode(!isEditMode)}
          variant={isEditMode ? 'default' : 'outline'}
          size="sm"
          className="gap-2"
        >
          {isEditMode ? (
            <>
              <Save className="h-4 w-4" />
              Save Layout
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              Edit Layout
            </>
          )}
        </Button>
      </div>

      {/* Edit Mode Notice */}
      {isEditMode && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Drag and drop widgets to rearrange your dashboard. Click "Save Layout" when finished.
          </p>
        </div>
      )}

      {/* Dashboard Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className="relative"
          style={{
            minHeight: '1000px',
            width: '100%',
          }}
        >
          {visibleWidgets.map((widget) => (
            <div
              key={widget.id}
              style={calculateGridStyle(widget)}
              className="widget-item"
            >
              <Droppable droppableId={widget.id} isDropDisabled={!isEditMode}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`h-full transition-colors duration-200 ${
                      snapshot.isDraggingOver && isEditMode ? 'bg-green-50/30 dark:bg-green-900/10 rounded-lg' : ''
                    }`}
                  >
                    <Draggable
                      draggableId={widget.id}
                      index={0}
                      isDragDisabled={!isEditMode}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`h-full transition-transform duration-200 ${
                            snapshot.isDragging
                              ? 'z-50 rotate-1 scale-105 shadow-2xl'
                              : snapshot.isDropAnimating
                              ? 'transition-all duration-300 ease-out'
                              : ''
                          }`}
                        >
                          <WidgetContainer
                            widget={widget}
                            isDraggable={isEditMode}
                            isEditMode={isEditMode}
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                          >
                            <WidgetRenderer type={widget.type} />
                          </WidgetContainer>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Responsive Grid Guidelines (only in edit mode) */}
      {isEditMode && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Grid: 12 columns • Gap: {GRID_GAP}px • Min height: {WIDGET_MIN_HEIGHT}px per row</p>
        </div>
      )}
    </div>
  );
};