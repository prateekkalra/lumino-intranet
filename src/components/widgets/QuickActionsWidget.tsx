import React, { useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';
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
  StickyNote,
} from 'lucide-react';

const quickActions = [
  {
    id: 'quick-note',
    label: 'Quick Note',
    icon: 'StickyNote',
  },
  {
    id: 'book-room',
    label: 'Book Room',
    icon: 'Calendar',
  },
  {
    id: 'submit-expense',
    label: 'Submit Expense',
    icon: 'DollarSign',
  },
  {
    id: 'start-call',
    label: 'Start Call',
    icon: 'Phone',
  },
  {
    id: 'create-report',
    label: 'Create Report',
    icon: 'FileText',
  },
  {
    id: 'find-colleague',
    label: 'Find Colleague',
    icon: 'Users',
  },
  {
    id: 'send-message',
    label: 'Send Message',
    icon: 'MessageSquare',
  },
  {
    id: 'log-time',
    label: 'Log Time',
    icon: 'Clock',
  },
  {
    id: 'it-support',
    label: 'IT Support',
    icon: 'Settings',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: 'h-4 w-4' };
  
  switch (iconName) {
    case 'StickyNote':
      return <StickyNote {...iconProps} />;
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
      case 'quick-note':
        openDialog('quick-note');
        toast({
          title: "Quick Note opened",
          description: "Start jotting down your thoughts and ideas",
        });
        break;
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
        toast({
          title: "Starting call...",
          description: "Connecting you to the video call system",
        });
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

  // Create search provider for quick actions
  const searchProvider = useMemo(() => ({
    getSearchableData: (): SearchResult[] => {
      return quickActions.map(action => ({
        id: action.id,
        title: action.label,
        description: `Quick action: ${action.label}`,
        type: 'action' as const,
        category: 'quick action',
        content: `${action.label} ${action.id.replace('-', ' ')}`,
        widget: 'QuickActionsWidget',
        metadata: {
          actionId: action.id,
          icon: action.icon
        },
        action: () => handleAction(action.id)
      }));
    }
  }), []);

  // Register with search service
  useSearchProvider('QuickActionsWidget', searchProvider);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <CardContent className="p-3 flex flex-col items-center justify-center gap-2">
                  <Button
                    size="icon"
                    onClick={() => handleAction(action.id)}
                    className="h-8 w-8"
                  >
                    {getIcon(action.icon)}
                  </Button>
                  <span className="text-xs font-medium text-center leading-tight">
                    {action.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <Card className="w-full">
          <CardContent className="p-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Most used: Quick Note</span>
              <span>{quickActions.length} actions available</span>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
};