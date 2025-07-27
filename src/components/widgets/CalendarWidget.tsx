import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import { useMemo } from 'react';
import { useSearchProvider } from '../../hooks/useSearchProvider';
import { SearchResult } from '../../types/search';

const mockEvents = [
  {
    id: '1',
    title: 'Team Standup',
    time: '9:00 AM',
    date: 'Today',
    type: 'meeting',
    location: 'Conference Room A',
  },
  {
    id: '2',
    title: 'Product Review',
    time: '2:00 PM',
    date: 'Today',
    type: 'meeting',
    location: 'Zoom',
  },
  {
    id: '3',
    title: 'Client Presentation',
    time: '10:00 AM',
    date: 'Tomorrow',
    type: 'meeting',
    location: 'Conference Room B',
  },
  {
    id: '4',
    title: 'Project Deadline',
    time: '5:00 PM',
    date: 'Friday',
    type: 'deadline',
    location: '',
  },
];

const getEventVariant = (type: string) => {
  switch (type) {
    case 'meeting':
      return 'default';
    case 'deadline':
      return 'destructive';
    case 'reminder':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const CalendarWidget = () => {
  const { openDialog } = useDialog();
  const { toast } = useToast();

  // Create search provider for calendar events
  const searchProvider = useMemo(() => ({
    getSearchableData: (): SearchResult[] => {
      return mockEvents.map(event => ({
        id: event.id,
        title: event.title,
        description: `${event.type} at ${event.time} on ${event.date}${event.location ? ` in ${event.location}` : ''}`,
        type: 'event' as const,
        category: event.type,
        content: `${event.title} ${event.time} ${event.date} ${event.location}`,
        widget: 'CalendarWidget',
        metadata: {
          time: event.time,
          date: event.date,
          location: event.location,
          eventType: event.type
        },
        action: () => {
          toast({
            title: "Calendar Event",
            description: `Opening: ${event.title}`,
          });
        }
      }));
    }
  }), [toast]);

  // Register with search service
  useSearchProvider('CalendarWidget', searchProvider);

  const handleEventClick = (event: any) => {
    openDialog('calendar');
    toast({
      title: "Event details",
      description: `Opening details for "${event.title}"`,
    });
  };

  const handleAddEvent = () => {
    openDialog('calendar');
    toast({
      title: "Add new event",
      description: "Opening calendar to create a new event",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Upcoming Events</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddEvent}
            className="h-8 px-3 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <Card 
                key={event.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium">
                      {event.title}
                    </CardTitle>
                    <Badge variant={getEventVariant(event.type) as any}>
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.time} • {event.date}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
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
              <span>{mockEvents.length} events</span>
              <span>This week</span>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
};