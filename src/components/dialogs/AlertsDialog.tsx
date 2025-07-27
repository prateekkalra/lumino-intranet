"use client"

import * as React from "react"
import { 
  Bell, 
  Shield, 
  AlertTriangle, 
  Info, 
  Search, 
  Clock, 
  CheckCircle, 
  Archive,
  Trash2,
  Eye,
  EyeOff,
  SortAsc,
  SortDesc
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDialog } from "@/contexts/DialogContext"

interface SystemNotification {
  id: string
  title: string
  message: string
  type: 'security' | 'system' | 'maintenance' | 'info'
  timestamp: string
  isRead: boolean
  priority: 'high' | 'medium' | 'low'
  fullDescription?: string
  actionRequired?: boolean
  category?: string
}

// Extended mock data for the full alerts dialog
const mockAllNotifications: SystemNotification[] = [
  {
    id: '1',
    title: 'Security Policy Update',
    message: 'New multi-factor authentication requirements are now in effect.',
    fullDescription: 'As part of our ongoing security improvements, all employees must now enable multi-factor authentication (MFA) on their accounts. This change affects access to email, project management tools, and all internal systems. Please update your security settings within the next 7 days to maintain access to company resources.',
    type: 'security',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high',
    actionRequired: true,
    category: 'Security & Compliance'
  },
  {
    id: '2',
    title: 'System Maintenance Scheduled',
    message: 'CRM system will be unavailable Sunday 2-4 AM EST for updates.',
    fullDescription: 'Our CRM system (Salesforce) will undergo scheduled maintenance this Sunday from 2:00 AM to 4:00 AM EST. During this time, sales reports, customer data, and lead management features will be temporarily unavailable. All data will be preserved and no action is required from users.',
    type: 'maintenance',
    timestamp: '1 day ago',
    isRead: false,
    priority: 'medium',
    actionRequired: false,
    category: 'System Maintenance'
  },
  {
    id: '3',
    title: 'Holiday Policy Updated',
    message: 'New flexible PTO policy is now available in the employee handbook.',
    fullDescription: 'We\'ve updated our Paid Time Off (PTO) policy to offer more flexibility. Key changes include: unlimited PTO for employees with 2+ years tenure, enhanced parental leave benefits, and mental health days. Review the complete policy in the employee handbook and discuss any questions with HR.',
    type: 'info',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'low',
    actionRequired: false,
    category: 'HR & Benefits'
  },
  {
    id: '4',
    title: 'Network Security Breach Detected',
    message: 'Suspicious activity detected. All passwords must be changed immediately.',
    fullDescription: 'Our security team has detected unauthorized access attempts on our network. As a precautionary measure, all employees must change their passwords immediately and review recent account activity. If you notice any suspicious activity, report it to IT security immediately.',
    type: 'security',
    timestamp: '5 hours ago',
    isRead: false,
    priority: 'high',
    actionRequired: true,
    category: 'Security & Compliance'
  },
  {
    id: '5',
    title: 'Office 365 Update Available',
    message: 'New features and security improvements available for update.',
    fullDescription: 'Microsoft Office 365 has released updates including enhanced collaboration features in Teams, improved security in Outlook, and new productivity tools in Excel and PowerPoint. The update will be automatically deployed to all systems during off-hours this week.',
    type: 'system',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'medium',
    actionRequired: false,
    category: 'Software Updates'
  },
  {
    id: '6',
    title: 'VPN Certificate Renewal',
    message: 'VPN certificates will be renewed this weekend. No action required.',
    fullDescription: 'Our VPN security certificates will be automatically renewed this weekend. There may be brief connectivity interruptions (1-2 minutes) during the renewal process. No action is required from users, and all VPN connections will resume automatically.',
    type: 'maintenance',
    timestamp: '4 days ago',
    isRead: true,
    priority: 'low',
    actionRequired: false,
    category: 'Network & Infrastructure'
  },
  {
    id: '7',
    title: 'Phishing Attempt Warning',
    message: 'Suspicious emails detected. Exercise caution with external links.',
    fullDescription: 'Our email security system has detected an increase in phishing attempts targeting our organization. Be extremely cautious when clicking links in emails, especially from unknown senders. Report any suspicious emails to security@company.com immediately.',
    type: 'security',
    timestamp: '6 hours ago',
    isRead: false,
    priority: 'high',
    actionRequired: true,
    category: 'Security & Compliance'
  },
  {
    id: '8',
    title: 'Database Backup Completed',
    message: 'Weekly automated backup completed successfully.',
    fullDescription: 'The weekly automated backup of all company databases has completed successfully. All critical data including customer information, project files, and financial records have been securely backed up. Backup verification tests passed with 100% data integrity confirmed.',
    type: 'system',
    timestamp: '1 week ago',
    isRead: true,
    priority: 'low',
    actionRequired: false,
    category: 'Data Management'
  }
]

export function AlertsDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [notifications, setNotifications] = React.useState(mockAllNotifications)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTab, setSelectedTab] = React.useState("all")
  const [sortBy] = React.useState<'timestamp' | 'priority' | 'title'>('timestamp')
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  const [selectedNotifications, setSelectedNotifications] = React.useState<string[]>([])

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

  const getTypeColor = (type: SystemNotification['type']) => {
    switch (type) {
      case 'security':
        return 'text-destructive bg-destructive/10'
      case 'maintenance':
        return 'text-warning-foreground bg-warning/10'
      case 'system':
        return 'text-info-foreground bg-info/10'
      case 'info':
        return 'text-success-foreground bg-success/10'
      default:
        return 'text-muted-foreground bg-muted/50'
    }
  }

  // Filter and sort notifications
  const filteredNotifications = React.useMemo(() => {
    let filtered = notifications

    // Filter by tab
    if (selectedTab !== 'all') {
      if (selectedTab === 'unread') {
        filtered = filtered.filter(n => !n.isRead)
      } else if (selectedTab === 'high-priority') {
        filtered = filtered.filter(n => n.priority === 'high')
      } else if (selectedTab === 'action-required') {
        filtered = filtered.filter(n => n.actionRequired)
      } else {
        filtered = filtered.filter(n => n.type === selectedTab)
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort notifications
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date
      
      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        }
        case 'title':
          aValue = a.title
          bValue = b.title
          break
        case 'timestamp':
        default:
          aValue = new Date(a.timestamp)
          bValue = new Date(b.timestamp)
          break
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [notifications, selectedTab, searchQuery, sortBy, sortOrder])

  const handleMarkAsRead = (notificationIds: string[]) => {
    setNotifications(prev => 
      prev.map(n => 
        notificationIds.includes(n.id) ? { ...n, isRead: true } : n
      )
    )
  }

  const handleMarkAsUnread = (notificationIds: string[]) => {
    setNotifications(prev => 
      prev.map(n => 
        notificationIds.includes(n.id) ? { ...n, isRead: false } : n
      )
    )
  }

  const handleArchive = (notificationIds: string[]) => {
    setNotifications(prev => prev.filter(n => !notificationIds.includes(n.id)))
    setSelectedNotifications([])
  }

  const handleDelete = (notificationIds: string[]) => {
    setNotifications(prev => prev.filter(n => !notificationIds.includes(n.id)))
    setSelectedNotifications([])
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id))
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length

  return (
    <Dialog 
      open={isDialogOpen('alerts')} 
      onOpenChange={(open) => !open && closeDialog('alerts')}
    >
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Card className="p-2">
                  <Bell className="h-5 w-5 text-primary" />
                </Card>
                <div>
                  <DialogTitle className="text-xl">System Alerts & Notifications</DialogTitle>
                  <DialogDescription>
                    Manage all system notifications, security alerts, and important updates
                  </DialogDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
            <div className="px-6 pb-4 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="high-priority">High Priority ({highPriorityCount})</TabsTrigger>
                <TabsTrigger value="action-required">Action Required ({actionRequiredCount})</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedTab} className="flex-1 overflow-auto m-0">
              <div className="px-6 space-y-6 pb-6">
                {/* Search and Controls */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4 flex-shrink-0">
                      <div className="flex items-center gap-2 flex-1">
                        <Card className="relative flex-1 max-w-md">
                          <CardContent className="p-0">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search notifications..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9"
                            />
                          </CardContent>
                        </Card>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                        </Button>
                      </div>

                      {selectedNotifications.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {selectedNotifications.length} selected
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsRead(selectedNotifications)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Read
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsUnread(selectedNotifications)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Mark Unread
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArchive(selectedNotifications)}
                          >
                            <Archive className="h-4 w-4 mr-1" />
                            Archive
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(selectedNotifications)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications Table */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                              onChange={handleSelectAll}
                              className="rounded"
                            />
                          </TableHead>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredNotifications.map((notification) => {
                          const Icon = getNotificationIcon(notification.type)
                          const isSelected = selectedNotifications.includes(notification.id)
                          
                          return (
                            <TableRow 
                              key={notification.id}
                              className={`cursor-pointer ${!notification.isRead ? 'bg-primary/5' : ''} ${isSelected ? 'bg-muted/50' : ''}`}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedNotifications(prev => prev.filter(id => id !== notification.id))
                                } else {
                                  setSelectedNotifications(prev => [...prev, notification.id])
                                }
                              }}
                            >
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="rounded"
                                />
                              </TableCell>
                              <TableCell>
                                <Card className={`p-2 ${getTypeColor(notification.type)}`}>
                                  <Icon className="h-4 w-4" />
                                </Card>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <CardTitle className={`text-base ${!notification.isRead ? 'font-semibold' : ''}`}>
                                    {notification.title}
                                  </CardTitle>
                                  <CardDescription className="line-clamp-2">
                                    {notification.message}
                                  </CardDescription>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {notification.type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm text-muted-foreground">
                                  {notification.category || 'General'}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {notification.timestamp}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {notification.isRead ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                  )}
                                  {notification.actionRequired && (
                                    <Badge variant="destructive" className="text-xs">
                                      Action Required
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {filteredNotifications.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <CardTitle className="text-lg mb-2">No notifications found</CardTitle>
                      <CardDescription>
                        {searchQuery ? 'Try adjusting your search terms' : 'All caught up! No new alerts.'}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 pt-4 border-t">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredNotifications.length} of {notifications.length} notifications
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => closeDialog('alerts')}>
                  Close
                </Button>
                <Button onClick={() => handleMarkAsRead(filteredNotifications.map(n => n.id))}>
                  Mark All as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}