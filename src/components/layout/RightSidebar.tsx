"use client"

import * as React from "react"
import { 
  X, 
  ChevronRight,
  Bell,
  Calendar,
  Link2,
  Users,
  Shield,
  Clock,
  AlertTriangle,
  Info,
  ExternalLink,
  Globe,
  Settings,
  Activity,
  Star,
  MessageCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"
import { useSidebar } from "@/contexts/SidebarContext"

interface SystemNotification {
  id: string
  title: string
  message: string
  type: 'security' | 'system' | 'maintenance' | 'info'
  timestamp: string
  isRead: boolean
  priority: 'high' | 'medium' | 'low'
}

interface Event {
  id: string
  title: string
  time: string
  location?: string
  type: 'meeting' | 'deadline' | 'event' | 'training'
  attendees?: number
  isOnline?: boolean
  color?: string
}

interface QuickLink {
  id: string
  title: string
  description: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  category: 'hr' | 'it' | 'tools' | 'resources'
  isExternal?: boolean
  color?: string
}

interface TeamUpdate {
  id: string
  type: 'status' | 'achievement' | 'announcement' | 'document'
  user: {
    name: string
    avatar?: string
    department: string
    role: string
  }
  content: string
  timestamp: string
  isImportant?: boolean
}

// Enhanced mock data with more realistic content
const mockSystemNotifications: SystemNotification[] = [
  {
    id: '1',
    title: 'Security Policy Update',
    message: 'New multi-factor authentication requirements are now in effect.',
    type: 'security',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'System Maintenance Scheduled',
    message: 'CRM system will be unavailable Sunday 2-4 AM EST for updates.',
    type: 'maintenance',
    timestamp: '1 day ago',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Holiday Policy Updated',
    message: 'New flexible PTO policy is now available in the employee handbook.',
    type: 'info',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'low'
  }
]

const mockUpcomingEvents: Event[] = [
  {
    id: '1',
    title: 'All Hands Meeting',
    time: '2:00 PM',
    location: 'Main Auditorium',
    type: 'meeting',
    attendees: 150,
    isOnline: true,
    color: 'blue'
  },
  {
    id: '2',
    title: 'Q4 Project Deadline',
    time: 'Tomorrow, 5:00 PM',
    type: 'deadline',
    color: 'red'
  },
  {
    id: '3',
    title: 'Team Building Event',
    time: 'Friday, 3:00 PM',
    location: 'Rooftop Lounge',
    type: 'event',
    attendees: 25,
    color: 'green'
  },
  {
    id: '4',
    title: 'Security Training',
    time: 'Next Monday, 10:00 AM',
    location: 'Training Room B',
    type: 'training',
    attendees: 30,
    color: 'purple'
  }
]

const mockQuickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Employee Portal',
    description: 'Benefits, payroll, PTO',
    url: '#',
    icon: Users,
    category: 'hr',
    color: 'blue'
  },
  {
    id: '2',
    title: 'IT Service Desk',
    description: 'Support tickets & requests',
    url: '#',
    icon: Shield,
    category: 'it',
    color: 'red',
    isExternal: true
  },
  {
    id: '3',
    title: 'Project Management',
    description: 'Tasks, timelines, reports',
    url: '#',
    icon: Activity,
    category: 'tools',
    color: 'green'
  },
  {
    id: '4',
    title: 'Knowledge Base',
    description: 'Documentation & guides',
    url: '#',
    icon: Globe,
    category: 'resources',
    color: 'purple'
  },
  {
    id: '5',
    title: 'Time Tracking',
    description: 'Log hours & expenses',
    url: '#',
    icon: Clock,
    category: 'tools',
    color: 'orange'
  },
  {
    id: '6',
    title: 'Company Directory',
    description: 'Find colleagues & contacts',
    url: '#',
    icon: Users,
    category: 'resources',
    color: 'teal'
  }
]

const mockTeamUpdates: TeamUpdate[] = [
  {
    id: '1',
    type: 'achievement',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Engineering',
      role: 'Senior Developer'
    },
    content: 'Successfully deployed the new authentication system, improving security by 40%',
    timestamp: '30 minutes ago',
    isImportant: true
  },
  {
    id: '2',
    type: 'announcement',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Product',
      role: 'Product Manager'
    },
    content: 'Q4 roadmap meeting scheduled for Thursday at 3 PM. All team leads invited.',
    timestamp: '1 hour ago'
  },
  {
    id: '3',
    type: 'document',
    user: {
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Design',
      role: 'UX Designer'
    },
    content: 'Published updated design system guidelines and component library v2.0',
    timestamp: '2 hours ago'
  },
  {
    id: '4',
    type: 'status',
    user: {
      name: 'David Wilson',
      department: 'Marketing',
      role: 'Marketing Director'
    },
    content: 'Campaign launch metrics: 25% increase in engagement, 15% boost in conversions',
    timestamp: '3 hours ago',
    isImportant: true
  }
]

interface SidebarSectionProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  defaultOpen?: boolean
  badge?: string | number
}

function SidebarSection({ title, icon: Icon, children, defaultOpen = true, badge }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="space-y-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 h-auto font-semibold text-sm text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-medium">{title}</span>
              {badge && (
                <Badge variant="default" className="h-5 text-xs font-medium px-2">
                  {badge}
                </Badge>
              )}
            </div>
            <ChevronRight className={`h-4 w-4 transition-all duration-200 text-muted-foreground ${isOpen ? 'rotate-90' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="pl-2">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function RightSidebar() {
  const { isOpen, close } = useSidebar()

  const getNotificationIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'security':
        return Shield
      case 'maintenance':
        return AlertTriangle
      case 'system':
        return Bell
      case 'info':
      default:
        return Info
    }
  }

  const getPriorityColor = (priority: SystemNotification['priority']) => {
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

  const getEventColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'red':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'purple':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'orange':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getLinkColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      case 'red':
        return 'bg-red-50 border-red-200 hover:bg-red-100'
      case 'green':
        return 'bg-green-50 border-green-200 hover:bg-green-100'
      case 'purple':
        return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      case 'orange':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100'
      case 'teal':
        return 'bg-teal-50 border-teal-200 hover:bg-teal-100'
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  }

  if (!isOpen) return null

  const unreadNotifications = mockSystemNotifications.filter(n => !n.isRead).length

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={close}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-16 bottom-0 w-[380px] bg-background/95 backdrop-blur-xl border-l border-border/50 z-50 lg:z-30 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Activity Center</h2>
                <p className="text-xs text-muted-foreground">Stay updated with your workspace</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="h-8 w-8 hover:bg-muted/50 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content with proper scrolling */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
              
              {/* System Alerts */}
              <SidebarSection 
                title="System Alerts" 
                icon={Bell} 
                badge={unreadNotifications > 0 ? unreadNotifications : undefined}
              >
                <div className="space-y-2">
                  {mockSystemNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    return (
                      <div 
                        key={notification.id} 
                        className={`group p-3 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${
                          !notification.isRead 
                            ? 'bg-gradient-to-r from-primary/5 to-blue/5 border-primary/30 shadow-sm' 
                            : 'bg-muted/40 border-border hover:bg-muted/60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            notification.type === 'security' ? 'bg-red-100 dark:bg-red-900/30' :
                            notification.type === 'maintenance' ? 'bg-orange-100 dark:bg-orange-900/30' :
                            notification.type === 'system' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            'bg-green-100 dark:bg-green-900/30'
                          }`}>
                            <Icon className={`h-3.5 w-3.5 ${
                              notification.type === 'security' ? 'text-red-600 dark:text-red-400' :
                              notification.type === 'maintenance' ? 'text-orange-600 dark:text-orange-400' :
                              notification.type === 'system' ? 'text-blue-600 dark:text-blue-400' :
                              'text-green-600 dark:text-green-400'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {notification.title}
                              </h4>
                              <Badge variant={getPriorityColor(notification.priority)} className="text-xs shrink-0">
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{notification.timestamp}</span>
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Bell className="h-3 w-3 mr-2" />
                    View All Alerts
                  </Button>
                </div>
              </SidebarSection>

              <Separator />

              {/* Upcoming Events */}
              <SidebarSection title="Today's Schedule" icon={Calendar} badge={mockUpcomingEvents.length}>
                <div className="space-y-2">
                  {mockUpcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className={`group p-3 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${getEventColor(event.color)}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold group-hover:text-foreground/90 transition-colors truncate">
                            {event.title}
                          </h4>
                          <Badge variant="outline" className="text-xs shrink-0 capitalize">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3 w-3 opacity-70" />
                          <span className="font-medium">{event.time}</span>
                          {event.location && (
                            <>
                              <span className="opacity-50">•</span>
                              <span className="truncate opacity-80">{event.location}</span>
                            </>
                          )}
                        </div>
                        {event.attendees && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="h-3 w-3 opacity-70" />
                              <span>{event.attendees} attending</span>
                            </div>
                            {event.isOnline && (
                              <Badge variant="secondary" className="text-xs">
                                <Globe className="h-3 w-3 mr-1" />
                                Online
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Calendar className="h-3 w-3 mr-2" />
                    Open Calendar
                  </Button>
                </div>
              </SidebarSection>

              <Separator />

              {/* Quick Access Links */}
              <SidebarSection title="Quick Access" icon={Link2}>
                <div className="grid grid-cols-2 gap-2">
                  {mockQuickLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <button
                        key={link.id}
                        className={`group p-3 rounded-xl border text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${getLinkColor(link.color)}`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
                              <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            </div>
                            {link.isExternal && (
                              <ExternalLink className="h-3 w-3 text-muted-foreground/60" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold group-hover:text-foreground transition-colors">
                              {link.title}
                            </h4>
                            <p className="text-xs text-muted-foreground/80">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </SidebarSection>

              <Separator />

              {/* Team Updates */}
              <SidebarSection title="Team Activity" icon={Users}>
                <div className="space-y-3">
                  {mockTeamUpdates.map((update) => (
                    <div key={update.id} className="group p-3 rounded-xl bg-muted/40 border border-border hover:bg-muted/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-9 w-9 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                            <AvatarImage src={update.user.avatar} alt={update.user.name} />
                            <AvatarFallback className="text-sm bg-gradient-to-br from-primary/20 to-blue-500/20 text-primary font-semibold">
                              {update.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {update.isImportant && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Star className="h-2.5 w-2.5 text-white fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                              {update.user.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{update.user.role}</span>
                            <span className="opacity-60">•</span>
                            <span>{update.user.department}</span>
                          </div>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {update.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{update.timestamp}</span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                React
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <MessageCircle className="h-3 w-3 mr-2" />
                    View Team Feed
                  </Button>
                </div>
              </SidebarSection>

              </div>
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border/50 bg-muted/10 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live updates</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-muted/50">
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}