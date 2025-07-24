import React from 'react';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import {
  Calendar,
  DollarSign,
  Phone,
  FileText,
  Users,
  MessageSquare,
  Clock,
  Settings,
  Camera,
  BookOpen,
  Coffee,
  Car,
} from 'lucide-react';
// import type { QuickAction } from '../../types/dashboard';

const quickActions = [
  {
    id: 'book-room',
    label: 'Book Room',
    icon: 'Calendar',
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  {
    id: 'submit-expense',
    label: 'Submit Expense',
    icon: 'DollarSign',
    color: 'bg-green-500 hover:bg-green-600 text-white',
  },
  {
    id: 'start-call',
    label: 'Start Call',
    icon: 'Phone',
    color: 'bg-purple-500 hover:bg-purple-600 text-white',
  },
  {
    id: 'create-report',
    label: 'Create Report',
    icon: 'FileText',
    color: 'bg-orange-500 hover:bg-orange-600 text-white',
  },
  {
    id: 'find-colleague',
    label: 'Find Colleague',
    icon: 'Users',
    color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
  },
  {
    id: 'send-message',
    label: 'Send Message',
    icon: 'MessageSquare',
    color: 'bg-pink-500 hover:bg-pink-600 text-white',
  },
  {
    id: 'log-time',
    label: 'Log Time',
    icon: 'Clock',
    color: 'bg-teal-500 hover:bg-teal-600 text-white',
  },
  {
    id: 'it-support',
    label: 'IT Support',
    icon: 'Settings',
    color: 'bg-gray-500 hover:bg-gray-600 text-white',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (iconName) {
    case 'Calendar':
      return <Calendar {...iconProps} />;
    case 'DollarSign':
      return <DollarSign {...iconProps} />;
    case 'Phone':
      return <Phone {...iconProps} />;
    case 'FileText':
      return <FileText {...iconProps} />;
    case 'Users':
      return <Users {...iconProps} />;
    case 'MessageSquare':
      return <MessageSquare {...iconProps} />;
    case 'Clock':
      return <Clock {...iconProps} />;
    case 'Settings':
      return <Settings {...iconProps} />;
    case 'Camera':
      return <Camera {...iconProps} />;
    case 'BookOpen':
      return <BookOpen {...iconProps} />;
    case 'Coffee':
      return <Coffee {...iconProps} />;
    case 'Car':
      return <Car {...iconProps} />;
    default:
      return <Settings {...iconProps} />;
  }
};

export const QuickActionsWidget: React.FC = () => {
  const { openDialog } = useDialog();
  const { toast } = useToast();

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'book-room':
        openDialog('calendar');
        toast({
          title: "Calendar opened",
          description: "You can now book rooms and schedule meetings",
        });
        break;
      case 'submit-expense':
        openDialog('time-tracking');
        toast({
          title: "Time tracking opened",
          description: "Access expense tracking in the expenses tab",
        });
        break;
      case 'start-call':
        // Simulate starting a call
        toast({
          title: "Starting call...",
          description: "Connecting you to the video call system",
        });
        // TODO: Implement actual call functionality
        break;
      case 'create-report':
        openDialog('project-management');
        toast({
          title: "Project management opened",
          description: "Access reports and project analytics",
        });
        break;
      case 'find-colleague':
        openDialog('directory');
        toast({
          title: "Employee directory opened",
          description: "Search and connect with colleagues",
        });
        break;
      case 'send-message':
        openDialog('team-feed');
        toast({
          title: "Team feed opened",
          description: "Share updates and communicate with your team",
        });
        break;
      case 'log-time':
        openDialog('time-tracking');
        toast({
          title: "Time tracking opened",
          description: "Log your work hours and track productivity",
        });
        break;
      case 'it-support':
        openDialog('service-desk');
        toast({
          title: "Service desk opened",
          description: "Submit IT tickets and get support",
        });
        break;
      default:
        toast({
          title: "Feature coming soon",
          description: "This functionality will be available soon",
        });
    }
  };

  // Update the actions with proper onClick handlers
  const actionsWithHandlers = quickActions.map(action => ({
    ...action,
    onClick: () => handleAction(action.id)
  }));

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Quick access to common tasks
        </p>
      </div>

      {/* Actions Grid with ScrollArea */}
      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="grid grid-cols-2 gap-3">
          {actionsWithHandlers.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} h-16 px-3 flex flex-col items-center justify-center gap-2 hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md rounded-lg active:scale-95`}
              variant="default"
            >
              {getIcon(action.icon)}
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </EnhancedScrollArea>

      {/* Footer Stats */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>Most used: Book Room</span>
          <span>8 actions today</span>
        </div>
      </div>
    </div>
  );
};