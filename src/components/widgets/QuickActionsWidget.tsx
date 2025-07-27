// shadcn/ui component imports
import {
  Card,
  CardContent,
  CardFooter,
} from '../ui/card';

// React and other hook imports
import React, { useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';

// Icon imports
import {
  Calendar,
  DollarSign,
  Phone,
  FileText,
  Users,
  MessageSquare,
  Clock,
  Settings,
  StickyNote,
  LucideProps,
} from 'lucide-react';

// The original quickActions array with colors is kept
const quickActions = [
  {
    id: 'quick-note',
    label: 'Quick Note',
    icon: 'StickyNote',
    color: 'bg-amber-500 hover:bg-amber-600 text-white',
  },
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
  { id: 'log-time', label: 'Log Time', icon: 'Clock', color: 'bg-teal-500 hover:bg-teal-600 text-white' },
  {
    id: 'it-support',
    label: 'IT Support',
    icon: 'Settings',
    color: 'bg-gray-500 hover:bg-gray-600 text-white',
  },
];

// Using an IconMap is more efficient than a large switch statement
const IconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  StickyNote,
  Calendar,
  DollarSign,
  Phone,
  FileText,
  Users,
  MessageSquare,
  Clock,
  Settings,
};

const getIcon = (iconName: string) => {
  const IconComponent = IconMap[iconName] || Settings;
  return <IconComponent className="h-4 w-4" />;
};

export const QuickActionsWidget: React.FC = () => {
  const { openDialog, isDialogOpen } = useDialog();
  const { toast } = useToast();

  // useCallback is a performance best-practice here
  const handleAction = useCallback(
    (actionId: string) => {
      // The switch statement logic remains unchanged
      switch (actionId) {
        case 'quick-note':
          openDialog('quick-note');
          if (!isDialogOpen('quick-note')) {
            toast({
              title: 'Quick Note opened',
              description: 'Start jotting down your thoughts and ideas',
            });
          }
          break;
        // ... other cases remain the same
        case 'book-room':
          openDialog('calendar');
          if (!isDialogOpen('calendar')) {
            toast({
              title: 'Calendar opened',
              description: 'You can now book rooms and schedule meetings',
            });
          }
          break;
        case 'submit-expense':
          openDialog('time-tracking');
          if (!isDialogOpen('time-tracking')) {
            toast({
              title: 'Time tracking opened',
              description: 'Access expense tracking in the expenses tab',
            });
          }
          break;
        case 'start-call':
          toast({
            title: 'Starting call...',
            description: 'Connecting you to the video call system',
          });
          break;
        case 'create-report':
          openDialog('project-management');
          if (!isDialogOpen('project-management')) {
            toast({
              title: 'Project management opened',
              description: 'Access reports and project analytics',
            });
          }
          break;
        case 'find-colleague':
          openDialog('directory');
          if (!isDialogOpen('directory')) {
            toast({
              title: 'Employee directory opened',
              description: 'Search and connect with colleagues',
            });
          }
          break;
        case 'send-message':
          openDialog('team-feed');
          if (!isDialogOpen('team-feed')) {
            toast({
              title: 'Team feed opened',
              description: 'Share updates and communicate with your team',
            });
          }
          break;
        case 'log-time':
          openDialog('time-tracking');
          if (!isDialogOpen('time-tracking')) {
            toast({
              title: 'Time tracking opened',
              description: 'Log your work hours and track productivity',
            });
          }
          break;
        case 'it-support':
          openDialog('service-desk');
          if (!isDialogOpen('service-desk')) {
            toast({
              title: 'Service desk opened',
              description: 'Submit IT tickets and get support',
            });
          }
          break;
        default:
          toast({
            title: 'Feature coming soon',
            description: 'This functionality will be available soon',
          });
      }
    },
    [openDialog, toast, isDialogOpen],
  );

  const searchProvider = useMemo(
    () => ({
      getSearchableData: (): SearchResult[] => {
        return quickActions.map((action) => ({
          id: action.id,
          title: action.label,
          description: `Quick action: ${action.label}`,
          type: 'action' as const,
          category: 'quick action',
          content: `${action.label} ${action.id.replace('-', ' ')}`,
          widget: 'QuickActionsWidget',
          metadata: { actionId: action.id, icon: action.icon },
          action: () => handleAction(action.id),
        }));
      },
    }),
    [handleAction],
  );

  useSearchProvider('QuickActionsWidget', searchProvider);

  return (
    // 1. The whole widget is wrapped in a Card for better structure
    <Card className="h-full flex flex-col border-none">
      <CardContent className="flex-1 px-3">
        <EnhancedScrollArea className="h-full pr-3">
          {/* 2. This grid is now responsive and will adjust columns based on width */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">
            {quickActions.map((action) => (
              // 3. The button styling is preserved exactly as in your original code
              <Button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`${action.color} h-20 px-1 flex flex-col items-center justify-center gap-1.5 hover:brightness-110 hover:scale-100 transition-all duration-200 shadow-sm hover:shadow-md rounded-xl active:scale-95`}
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
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full text-xs text-muted-foreground">
          <span>Most used: Quick Note</span>
          <span>{quickActions.length} actions available</span>
        </div>
      </CardFooter>
    </Card>
  );
};