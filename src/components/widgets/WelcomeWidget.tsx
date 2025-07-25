import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { EnhancedScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useUserStore } from '../../store/userStore';
import { useDialog } from '../../contexts/DialogContext';
import { useToast } from '../ui/use-toast';
import type { WeatherData, ScheduleEvent } from '../../types/dashboard';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case 'cloudy':
    case 'partly cloudy':
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case 'rainy':
    case 'rain':
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case 'snowy':
    case 'snow':
      return <Snowflake className="h-6 w-6 text-blue-300" />;
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />;
  }
};

// Mock weather data
const mockWeatherData: WeatherData = {
  temperature: 72,
  condition: 'Partly Cloudy',
  icon: 'partly-cloudy',
  location: 'San Francisco, CA',
};

// Mock schedule events
const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    time: '9:00 AM',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Product Review',
    time: '2:00 PM',
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Project Deadline',
    time: '5:00 PM',
    type: 'deadline',
  },
];

export const WelcomeWidget: React.FC = () => {
  const { currentUser } = useUserStore();
  const { openDialog } = useDialog();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleWeatherClick = () => {
    toast({
      title: "Weather Details",
      description: `${mockWeatherData.condition} in ${mockWeatherData.location}. Perfect day to be productive!`,
    });
  };

  const handleScheduleEventClick = (event: ScheduleEvent) => {
    if (event.type === 'meeting') {
      openDialog('calendar');
      toast({
        title: "Meeting Details",
        description: `${event.title} at ${event.time}`,
      });
    } else if (event.type === 'deadline') {
      toast({
        title: "Deadline Reminder",
        description: `${event.title} is due at ${event.time}`,
      });
    }
  };

  const handleViewFullSchedule = () => {
    openDialog('calendar');
    toast({
      title: "Calendar opened",
      description: "View your complete schedule",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <EnhancedScrollArea className="flex-1 pr-2">
        {/* Main Greeting Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Ready to make today productive?
          </p>
        </div>

        {/* Date and Time Row */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-sm">{formatDate(currentTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-mono text-lg font-bold">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Weather and Schedule Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Weather Card */}
          <div 
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleWeatherClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getWeatherIcon(mockWeatherData.condition)}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {mockWeatherData.temperature}°F
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <MapPin className="h-3 w-3" />
                <span>{mockWeatherData.location}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              {mockWeatherData.condition}
            </p>
          </div>

          {/* Today's Schedule Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
              Today&rsquo;s Schedule
            </h4>
            <div className="space-y-2">
              {mockScheduleEvents.slice(0, 3).map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center gap-2 cursor-pointer hover:bg-white/50 rounded p-1 transition-colors"
                  onClick={() => handleScheduleEventClick(event)}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'meeting' 
                      ? 'bg-green-500' 
                      : event.type === 'deadline' 
                      ? 'bg-red-500' 
                      : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              {mockScheduleEvents.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  +{mockScheduleEvents.length - 3} more events
                </p>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleViewFullSchedule}
                className="h-6 px-2 text-xs text-orange-600 hover:text-orange-700"
              >
                View All
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Tasks Due</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">3</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Meetings</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">5</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Messages</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">12</p>
            </div>
          </div>
        </div>
      </EnhancedScrollArea>
    </div>
  );
};