import React from 'react';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
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
import type { QuickAction } from '../../types/dashboard';

const quickActions: QuickAction[] = [
  {
    id: 'book-room',
    label: 'Book Room',
    icon: 'Calendar',
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
    onClick: () => console.log('Book room clicked'),
  },
  {
    id: 'submit-expense',
    label: 'Submit Expense',
    icon: 'DollarSign',
    color: 'bg-green-500 hover:bg-green-600 text-white',
    onClick: () => console.log('Submit expense clicked'),
  },
  {
    id: 'start-call',
    label: 'Start Call',
    icon: 'Phone',
    color: 'bg-purple-500 hover:bg-purple-600 text-white',
    onClick: () => console.log('Start call clicked'),
  },
  {
    id: 'create-report',
    label: 'Create Report',
    icon: 'FileText',
    color: 'bg-orange-500 hover:bg-orange-600 text-white',
    onClick: () => console.log('Create report clicked'),
  },
  {
    id: 'find-colleague',
    label: 'Find Colleague',
    icon: 'Users',
    color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    onClick: () => console.log('Find colleague clicked'),
  },
  {
    id: 'send-message',
    label: 'Send Message',
    icon: 'MessageSquare',
    color: 'bg-pink-500 hover:bg-pink-600 text-white',
    onClick: () => console.log('Send message clicked'),
  },
  {
    id: 'log-time',
    label: 'Log Time',
    icon: 'Clock',
    color: 'bg-teal-500 hover:bg-teal-600 text-white',
    onClick: () => console.log('Log time clicked'),
  },
  {
    id: 'it-support',
    label: 'IT Support',
    icon: 'Settings',
    color: 'bg-gray-500 hover:bg-gray-600 text-white',
    onClick: () => console.log('IT support clicked'),
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
          {quickActions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} h-16 px-3 flex flex-col items-center justify-center gap-2 hover:brightness-110 transition-all duration-200 shadow-sm hover:shadow-md rounded-lg`}
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