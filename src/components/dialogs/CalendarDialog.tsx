"use client"

import * as React from "react"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus, 
  MapPin, 
  Video,
  Repeat,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  date: Date
  location?: string
  isOnline?: boolean
  type: 'meeting' | 'deadline' | 'event' | 'training' | 'personal'
  attendees?: Array<{
    id: string
    name: string
    email: string
    avatar?: string
    status: 'accepted' | 'declined' | 'pending'
  }>
  organizer?: {
    name: string
    email: string
  }
  color: string
  isRecurring?: boolean
  recurringPattern?: string
  priority: 'high' | 'medium' | 'low'
  reminder?: string
  meetingLink?: string
  attachments?: Array<{
    name: string
    url: string
    type: string
  }>
}

// Extended mock calendar events
const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'All Hands Meeting',
    description: 'Monthly company-wide meeting to discuss progress, updates, and upcoming initiatives.',
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    date: new Date(),
    location: 'Main Auditorium',
    type: 'meeting',
    attendees: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', status: 'accepted' },
      { id: '2', name: 'Mike Chen', email: 'mike@company.com', status: 'pending' },
      { id: '3', name: 'Lisa Park', email: 'lisa@company.com', status: 'accepted' }
    ],
    organizer: { name: 'David Wilson', email: 'david@company.com' },
    isOnline: true,
    color: 'blue',
    priority: 'high',
    reminder: '15 minutes before',
    meetingLink: 'https://meet.company.com/all-hands-2024-01'
  },
  {
    id: '2',
    title: 'Q4 Project Deadline',
    description: 'Final submission deadline for Q4 project deliverables.',
    startTime: '5:00 PM',
    endTime: '5:00 PM',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    type: 'deadline',
    color: 'red',
    priority: 'high',
    reminder: '1 day before'
  },
  {
    id: '3',
    title: 'Team Building Event',
    description: 'Quarterly team building activities and social gathering.',
    startTime: '3:00 PM',
    endTime: '6:00 PM',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    location: 'Rooftop Lounge',
    type: 'event',
    attendees: [
      { id: '1', name: 'Engineering Team', email: 'eng@company.com', status: 'accepted' },
      { id: '2', name: 'Product Team', email: 'product@company.com', status: 'accepted' }
    ],
    color: 'green',
    priority: 'medium',
    reminder: '2 hours before'
  },
  {
    id: '4',
    title: 'Security Training',
    description: 'Mandatory cybersecurity awareness training session.',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    location: 'Training Room B',
    type: 'training',
    attendees: [
      { id: '1', name: 'All Employees', email: 'all@company.com', status: 'pending' }
    ],
    isOnline: false,
    color: 'purple',
    priority: 'high',
    reminder: '30 minutes before',
    isRecurring: true,
    recurringPattern: 'Monthly'
  },
  {
    id: '5',
    title: 'Client Presentation',
    description: 'Quarterly business review presentation for our biggest client.',
    startTime: '9:00 AM',
    endTime: '10:30 AM',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Conference Room A',
    type: 'meeting',
    attendees: [
      { id: '1', name: 'Sales Team', email: 'sales@company.com', status: 'accepted' },
      { id: '2', name: 'Account Management', email: 'accounts@company.com', status: 'accepted' }
    ],
    isOnline: true,
    color: 'blue',
    priority: 'high',
    reminder: '1 hour before',
    meetingLink: 'https://meet.company.com/client-qbr-2024'
  },
  {
    id: '6',
    title: 'Code Review Session',
    description: 'Weekly code review and architecture discussion.',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    type: 'meeting',
    attendees: [
      { id: '1', name: 'Dev Team', email: 'dev@company.com', status: 'accepted' }
    ],
    isOnline: true,
    color: 'orange',
    priority: 'medium',
    reminder: '10 minutes before',
    isRecurring: true,
    recurringPattern: 'Weekly',
    meetingLink: 'https://meet.company.com/code-review'
  }
]

export function CalendarDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [events, setEvents] = React.useState(mockCalendarEvents)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = React.useState<'calendar' | 'agenda'>('calendar')
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const handleEventClick = (event: CalendarEvent) => {
    toast({
      title: event.title,
      description: `${event.startTime} • ${event.type} • ${event.location || 'Location TBD'}`,
    });
  };

  const handleCreateEvent = () => {
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: 'New Event',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      date: selectedDate || new Date(),
      type: 'meeting',
      location: 'To be confirmed',
      attendees: [],
      priority: 'medium',
      color: 'blue',
      isRecurring: false
    };
    
    setEvents(prev => [...prev, newEvent]);
    toast({
      title: "Event Created",
      description: "New event has been added to your calendar",
    });
  };

  const handleEditEvent = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Edit Event",
      description: `Editing "${event.title}"`,
    });
  };

  const handleDeleteEvent = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar",
    });
  };

  const getEventColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
      case 'red':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400'
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400'
      case 'purple':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400'
      case 'orange':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const getTodayEvents = () => {
    return events.filter(event => 
      event.date.toDateString() === new Date().toDateString()
    ).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    return events.filter(event => 
      event.date >= today
    ).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 10)
  }

  const filteredEvents = React.useMemo(() => {
    if (!searchQuery) return events
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [events, searchQuery])

  const EventCard = ({ event }: { event: CalendarEvent }) => (
    <div 
      className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${getEventColor(event.color)}`}
      onClick={() => handleEventClick(event)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-sm truncate">{event.title}</h4>
        <div className="flex items-center gap-1 shrink-0">
          <Badge variant={getPriorityColor(event.priority)} className="text-xs">
            {event.priority}
          </Badge>
          {event.isRecurring && (
            <Repeat className="h-3 w-3 opacity-70" />
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <Clock className="h-3 w-3 opacity-70" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="h-3 w-3 opacity-70" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        
        {event.isOnline && (
          <div className="flex items-center gap-2 text-xs">
            <Video className="h-3 w-3 opacity-70" />
            <span>Online Meeting</span>
          </div>
        )}
        
        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <Users className="h-3 w-3 opacity-70" />
            <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-current/20">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => handleEditEvent(event, e)}
          className="h-6 px-2 text-xs"
        >
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => handleDeleteEvent(event.id, e)}
          className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog 
      open={isDialogOpen('calendar')} 
      onOpenChange={(open) => !open && closeDialog('calendar')}
    >
      <DialogContent className="max-w-7xl max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">Calendar & Events</DialogTitle>
                <DialogDescription>
                  Manage your events, meetings, and important dates
                </DialogDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button size="sm" onClick={handleCreateEvent}>
                <Plus className="h-4 w-4 mr-1" />
                New Event
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'agenda')} className="h-full flex flex-col">
            <div className="px-6 pb-4 flex-shrink-0">
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="agenda">Agenda View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="calendar" className="flex-1 overflow-auto m-0">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-8">
                {/* Calendar */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(new Date())}
                      >
                        Today
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-6 bg-card">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="w-full scale-110"
                    />
                  </div>
                </div>

                {/* Event Details Sidebar */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {selectedDate ? `Events for ${selectedDate.toLocaleDateString()}` : 'Today\'s Events'}
                    </h3>
                    <div className="space-y-3">
                      {(selectedDate ? getEventsForDate(selectedDate) : getTodayEvents()).map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                      {(selectedDate ? getEventsForDate(selectedDate) : getTodayEvents()).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No events scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                      {getUpcomingEvents().slice(0, 5).map((event) => (
                        <div key={event.id} className="p-2 rounded border text-sm">
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-muted-foreground">
                            {event.date.toLocaleDateString()} at {event.startTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agenda" className="flex-1 overflow-auto m-0">
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between flex-shrink-0">
                  <h3 className="text-lg font-semibold">Event Agenda</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge variant="outline" className="capitalize">
                              {event.type}
                            </Badge>
                            <Badge variant={getPriorityColor(event.priority)}>
                              {event.priority}
                            </Badge>
                            {event.isRecurring && (
                              <Badge variant="secondary">
                                <Repeat className="h-3 w-3 mr-1" />
                                {event.recurringPattern}
                              </Badge>
                            )}
                          </div>
                          
                          {event.description && (
                            <p className="text-muted-foreground mb-3">{event.description}</p>
                          )}
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>{event.date.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                            {event.attendees && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{event.attendees.length} attendees</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {event.isOnline && event.meetingLink && (
                            <Button variant="outline" size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              Join
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No events found</p>
                    <p className="text-muted-foreground">
                      {searchQuery ? 'Try adjusting your search terms' : 'No events scheduled'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredEvents.length} events found
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => closeDialog('calendar')}>
                Close
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}