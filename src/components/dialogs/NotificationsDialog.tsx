"use client"

import * as React from "react"
import { 
  Bell, 
  Search, 
  CheckCheck,
  Clock,
  MessageSquare,
  Calendar,
  FileText,
  Award,
  Archive,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  type: 'message' | 'calendar' | 'system' | 'achievement'
  icon: React.ComponentType<{ className?: string }>
  priority?: 'low' | 'medium' | 'high'
  actionable?: boolean
  category?: string
}

// Extended mock notifications for the dialog
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message about the Q4 project updates. She mentioned some important changes to the timeline.',
    timestamp: '5 min ago',
    isRead: false,
    type: 'message',
    icon: MessageSquare,
    priority: 'high',
    actionable: true,
    category: 'Communication'
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    message: 'Team standup meeting starts in 15 minutes in Conference Room A. Don\'t forget to prepare your updates.',
    timestamp: '10 min ago',
    isRead: false,
    type: 'calendar',
    icon: Calendar,
    priority: 'medium',
    actionable: true,
    category: 'Meetings'
  },
  {
    id: '3',
    title: 'Document Shared',
    message: 'Mike Chen shared "Marketing Strategy 2024" with your team. Review and provide feedback by end of week.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'system',
    icon: FileText,
    priority: 'medium',
    actionable: true,
    category: 'Documents'
  },
  {
    id: '4',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You\'ve completed 50 tasks this month. You\'re ahead of schedule!',
    timestamp: '1 day ago',
    isRead: true,
    type: 'achievement',
    icon: Award,
    priority: 'low',
    actionable: false,
    category: 'Achievements'
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM. Some services may be unavailable.',
    timestamp: '3 hours ago',
    isRead: true,
    type: 'system',
    icon: AlertCircle,
    priority: 'medium',
    actionable: false,
    category: 'System'
  },
  {
    id: '6',
    title: 'New Team Member',
    message: 'Welcome Alex Rodriguez to the Marketing team! Please help them get settled in.',
    timestamp: '1 day ago',
    isRead: false,
    type: 'system',
    icon: Info,
    priority: 'low',
    actionable: true,
    category: 'Team'
  },
  {
    id: '7',
    title: 'Project Milestone',
    message: 'Great work! The "Mobile App Redesign" project has reached 75% completion.',
    timestamp: '2 days ago',
    isRead: true,
    type: 'achievement',
    icon: CheckCircle,
    priority: 'low',
    actionable: false,
    category: 'Projects'
  },
  {
    id: '8',
    title: 'Training Session',
    message: 'Mandatory cybersecurity training session scheduled for next Friday at 2 PM.',
    timestamp: '3 days ago',
    isRead: false,
    type: 'calendar',
    icon: Calendar,
    priority: 'high',
    actionable: true,
    category: 'Training'
  }
]

const notificationTypes = [
  { value: 'all', label: 'All', icon: Bell },
  { value: 'unread', label: 'Unread', icon: Eye },
  { value: 'message', label: 'Messages', icon: MessageSquare },
  { value: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'system', label: 'System', icon: AlertCircle },
  { value: 'achievement', label: 'Achievements', icon: Award }
]

export function NotificationsDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("all")
  const [selectedNotifications, setSelectedNotifications] = React.useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = React.useState("newest")

  const isOpen = isDialogOpen('notifications')

  // Filter and sort notifications
  const filteredNotifications = React.useMemo(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (notification.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      
      const matchesType = selectedType === 'all' || 
                         (selectedType === 'unread' && !notification.isRead) ||
                         notification.type === selectedType
      
      return matchesSearch && matchesType
    })

    // Sort notifications
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return (priorityOrder[b.priority || 'low'] || 1) - (priorityOrder[a.priority || 'low'] || 1)
      }
      return 0
    })

    return filtered
  }, [notifications, searchTerm, selectedType, sortBy])

  const unreadCount = notifications.filter(n => !n.isRead).length
  const selectedCount = selectedNotifications.size

  const handleSelectNotification = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedNotifications)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedNotifications(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(new Set(filteredNotifications.map(n => n.id)))
    } else {
      setSelectedNotifications(new Set())
    }
  }

  const handleMarkAsRead = (ids?: string[]) => {
    const targetIds = ids || Array.from(selectedNotifications)
    setNotifications(prev =>
      prev.map(n => targetIds.includes(n.id) ? { ...n, isRead: true } : n)
    )
    if (!ids) {
      setSelectedNotifications(new Set())
      toast({
        title: "Notifications marked as read",
        description: `${targetIds.length} notification(s) marked as read.`,
      })
    }
  }

  const handleMarkAsUnread = () => {
    const targetIds = Array.from(selectedNotifications)
    setNotifications(prev =>
      prev.map(n => targetIds.includes(n.id) ? { ...n, isRead: false } : n)
    )
    setSelectedNotifications(new Set())
    toast({
      title: "Notifications marked as unread",
      description: `${targetIds.length} notification(s) marked as unread.`,
    })
  }

  const handleDeleteNotifications = () => {
    const targetIds = Array.from(selectedNotifications)
    setNotifications(prev => prev.filter(n => !targetIds.includes(n.id)))
    setSelectedNotifications(new Set())
    toast({
      title: "Notifications deleted",
      description: `${targetIds.length} notification(s) deleted.`,
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive'
      case 'medium': return 'border-l-warning'
      case 'low': return 'border-l-success'
      default: return 'border-l-border'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-info text-info-foreground'
      case 'calendar': return 'bg-success/10 text-success-foreground'
      case 'system': return 'bg-warning/10 text-warning-foreground'
      case 'achievement': return 'bg-secondary/50 text-secondary-foreground'
      default: return 'bg-muted/50 text-muted-foreground'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('notifications')}>
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Manage and view all your notifications in one place.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notification Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    View Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Type Filter Tabs */}
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              {notificationTypes.map((type) => {
                const IconComponent = type.icon
                const count = type.value === 'all' ? notifications.length :
                             type.value === 'unread' ? unreadCount :
                             notifications.filter(n => n.type === type.value).length
                
                return (
                  <TabsTrigger key={type.value} value={type.value} className="text-xs">
                    <IconComponent className="h-3 w-3 mr-1" />
                    {type.label}
                    {count > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {count}
                      </Badge>
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Bulk Actions */}
            {(selectedCount > 0 || filteredNotifications.length > 0) && (
              <div className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedCount > 0 && selectedCount === filteredNotifications.length}
                      onCheckedChange={handleSelectAll}
                      className="data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      {selectedCount > 0 ? `${selectedCount} selected` : `${filteredNotifications.length} notifications`}
                    </span>
                  </div>
                  
                  {selectedCount > 0 && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead()}
                        className="h-7 text-xs"
                      >
                        <CheckCheck className="h-3 w-3 mr-1" />
                        Mark Read
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAsUnread}
                        className="h-7 text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Mark Unread
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDeleteNotifications}
                        className="h-7 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
                
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="h-7 text-xs"
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
            )}

            <TabsContent value={selectedType} className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2 p-1">
                  {filteredNotifications.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No notifications found</p>
                        <p className="text-sm text-muted-foreground">
                          {searchTerm ? "Try adjusting your search terms" : "You're all caught up!"}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredNotifications.map((notification) => {
                      const IconComponent = notification.icon
                      const isSelected = selectedNotifications.has(notification.id)
                      
                      return (
                        <Card 
                          key={notification.id} 
                          className={`relative cursor-pointer transition-all hover:shadow-md border-l-4 ${getPriorityColor(notification.priority)} ${
                            !notification.isRead ? 'bg-muted/30' : ''
                          } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => handleSelectNotification(notification.id, checked as boolean)}
                                className="mt-1"
                              />
                              
                              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h4 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                    )}
                                    {notification.priority && (
                                      <Badge 
                                        variant={notification.priority === 'high' ? 'destructive' : 'secondary'} 
                                        className="text-xs"
                                      >
                                        {notification.priority}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      {notification.timestamp}
                                    </div>
                                    
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                          <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleMarkAsRead([notification.id])}>
                                          <CheckCheck className="h-3 w-3 mr-2" />
                                          {notification.isRead ? 'Mark unread' : 'Mark read'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Archive className="h-3 w-3 mr-2" />
                                          Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="h-3 w-3 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {notification.category && (
                                      <Badge variant="outline" className="text-xs">
                                        {notification.category}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {notification.actionable && (
                                    <div className="flex gap-1">
                                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                                        View
                                      </Button>
                                      <Button variant="default" size="sm" className="h-6 text-xs">
                                        Take Action
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}