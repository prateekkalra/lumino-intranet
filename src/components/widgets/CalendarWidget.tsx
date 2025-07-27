import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EnhancedScrollArea } from '../ui/scroll-area';
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

const getEventColor = (type: string) => {
  switch (type) {
    case 'meeting':
      return 'bg-blue-100 text-blue-800';
    case 'deadline':
      return 'bg-red-100 text-red-800';
    case 'reminder':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
    <div className="h-full flex flex-col">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Upcoming Events
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddEvent}
          className="h-6 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      
      <EnhancedScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div 
              key={event.id} 
              onClick={() => handleEventClick(event)}
              className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h4>
                <Badge className={getEventColor(event.type)} variant="secondary">
                  {event.type}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{event.time} • {event.date}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </EnhancedScrollArea>

      {/* Footer */}
      <div className="mt-3 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{mockEvents.length} events</span>
          <span>This week</span>
        </div>
      </div>
    </div>
  );
};