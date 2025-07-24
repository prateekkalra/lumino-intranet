import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

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
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4 text-purple-600" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Upcoming Events
        </span>
      </div>
      
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
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
      </ScrollArea>
    </div>
  );
};