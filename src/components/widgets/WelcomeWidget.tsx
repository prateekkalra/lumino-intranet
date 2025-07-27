import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
      return <Sun className="h-6 w-6 text-primary" />;
    case 'cloudy':
    case 'partly cloudy':
      return <Cloud className="h-6 w-6 text-muted-foreground" />;
    case 'rainy':
    case 'rain':
      return <CloudRain className="h-6 w-6 text-primary" />;
    case 'snowy':
    case 'snow':
      return <Snowflake className="h-6 w-6 text-muted-foreground" />;
    default:
      return <Sun className="h-6 w-6 text-primary" />;
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'User'}!
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Ready to make today productive?
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <ScrollArea className="h-full">

        {/* Date and Time Row */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm">{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg font-bold">
                {formatTime(currentTime)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Weather and Schedule Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Weather Card */}
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleWeatherClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(mockWeatherData.condition)}
                  <span className="font-semibold text-foreground">
                    {mockWeatherData.temperature}°F
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{mockWeatherData.location}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {mockWeatherData.condition}
              </p>
            </CardContent>
          </Card>

          {/* Today's Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockScheduleEvents.slice(0, 3).map((event) => (
                  <Card 
                    key={event.id} 
                    className="cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => handleScheduleEventClick(event)}
                  >
                    <CardContent className="p-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          event.type === 'meeting' 
                            ? 'bg-primary' 
                            : event.type === 'deadline' 
                            ? 'bg-destructive' 
                            : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                {mockScheduleEvents.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{mockScheduleEvents.length - 3} more events
                  </p>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleViewFullSchedule}
                  className="h-6 px-2 text-xs text-primary hover:text-primary/80"
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Footer */}
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Tasks Due</p>
                <p className="text-lg font-bold text-primary">3</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meetings</p>
                <p className="text-lg font-bold text-primary">5</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Messages</p>
                <p className="text-lg font-bold text-primary">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};