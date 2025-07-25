"use client"

import * as React from "react"
import { 
  Users,
  Building,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  ExternalLink,
  Search,
  Filter,
  Settings
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  email: string
  phone?: string
  location: string
  status: 'online' | 'away' | 'busy' | 'offline'
  expertise: string[]
}

interface TeamSpace {
  id: string
  name: string
  description: string
  department: string
  members: TeamMember[]
  lead: TeamMember
  projects: number
  completedTasks: number
  totalTasks: number
  lastActivity: string
  resources: Array<{
    id: string
    name: string
    type: 'document' | 'link' | 'tool'
    url: string
  }>
  announcements: Array<{
    id: string
    title: string
    content: string
    author: string
    timestamp: string
    priority: 'high' | 'medium' | 'low'
  }>
}

const mockTeamSpaces: TeamSpace[] = [
  {
    id: 'eng-team',
    name: 'Engineering Team',
    description: 'Building the future of our platform with cutting-edge technology',
    department: 'Engineering',
    members: [
      {
        id: 'eng-1',
        name: 'Sarah Johnson',
        role: 'Senior Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=40&h=40&fit=crop&crop=face&auto=format',
        email: 'sarah.johnson@lumino.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        status: 'online',
        expertise: ['React', 'Node.js', 'TypeScript']
      },
      {
        id: 'eng-2',
        name: 'Mike Chen',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
        email: 'mike.chen@lumino.com',
        location: 'New York, NY',
        status: 'away',
        expertise: ['Vue.js', 'CSS', 'UI/UX']
      }
    ],
    lead: {
      id: 'eng-lead',
      name: 'Sarah Johnson',
      role: 'Engineering Lead',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=40&h=40&fit=crop&crop=face&auto=format',
      email: 'sarah.johnson@lumino.com',
      location: 'San Francisco, CA',
      status: 'online',
      expertise: ['Leadership', 'Architecture', 'DevOps']
    },
    projects: 3,
    completedTasks: 45,
    totalTasks: 60,
    lastActivity: '2 hours ago',
    resources: [
      {
        id: 'r1',
        name: 'Engineering Handbook',
        type: 'document',
        url: '#'
      },
      {
        id: 'r2',
        name: 'GitHub Repository',
        type: 'link',
        url: '#'
      },
      {
        id: 'r3',
        name: 'Development Tools',
        type: 'tool',
        url: '#'
      }
    ],
    announcements: [
      {
        id: 'a1',
        title: 'New deployment pipeline is live',
        content: 'The new CI/CD pipeline is now active and ready for use. Please update your local configurations.',
        author: 'Sarah Johnson',
        timestamp: '3 hours ago',
        priority: 'high'
      },
      {
        id: 'a2',
        title: 'Code review guidelines updated',
        content: 'Please review the updated code review guidelines in our documentation.',
        author: 'Mike Chen',
        timestamp: '1 day ago',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'design-team',
    name: 'Design Team',
    description: 'Creating beautiful and intuitive user experiences',
    department: 'Design',
    members: [
      {
        id: 'des-1',
        name: 'Lisa Park',
        role: 'UX Designer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
        email: 'lisa.park@lumino.com',
        location: 'Los Angeles, CA',
        status: 'online',
        expertise: ['Figma', 'User Research', 'Prototyping']
      }
    ],
    lead: {
      id: 'des-lead',
      name: 'Lisa Park',
      role: 'Design Lead',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
      email: 'lisa.park@lumino.com',
      location: 'Los Angeles, CA',
      status: 'online',
      expertise: ['Design Systems', 'Leadership', 'Strategy']
    },
    projects: 2,
    completedTasks: 28,
    totalTasks: 35,
    lastActivity: '1 hour ago',
    resources: [
      {
        id: 'r4',
        name: 'Design System',
        type: 'document',
        url: '#'
      },
      {
        id: 'r5',
        name: 'Figma Workspace',
        type: 'tool',
        url: '#'
      }
    ],
    announcements: [
      {
        id: 'a3',
        title: 'New brand guidelines available',
        content: 'Updated brand guidelines are now available in the design system documentation.',
        author: 'Lisa Park',
        timestamp: '4 hours ago',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'marketing-team',
    name: 'Marketing Team',
    description: 'Driving growth and building brand awareness',
    department: 'Marketing',
    members: [
      {
        id: 'mar-1',
        name: 'David Wilson',
        role: 'Marketing Director',
        email: 'david.wilson@lumino.com',
        location: 'Chicago, IL',
        status: 'busy',
        expertise: ['Strategy', 'Analytics', 'Content']
      }
    ],
    lead: {
      id: 'mar-lead',
      name: 'David Wilson',
      role: 'Marketing Director',
      email: 'david.wilson@lumino.com',
      location: 'Chicago, IL',
      status: 'busy',
      expertise: ['Leadership', 'Growth', 'Brand']
    },
    projects: 4,
    completedTasks: 32,
    totalTasks: 40,
    lastActivity: '30 minutes ago',
    resources: [
      {
        id: 'r6',
        name: 'Marketing Calendar',
        type: 'document',
        url: '#'
      },
      {
        id: 'r7',
        name: 'Analytics Dashboard',
        type: 'tool',
        url: '#'
      }
    ],
    announcements: [
      {
        id: 'a4',
        title: 'Q4 campaign results',
        content: 'Q4 campaign exceeded expectations with 25% increase in leads.',
        author: 'David Wilson',
        timestamp: '2 days ago',
        priority: 'high'
      }
    ]
  }
]

export function TeamSpacesDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [selectedTeam, setSelectedTeam] = React.useState<TeamSpace | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  const isOpen = isDialogOpen('team-spaces')

  const filteredTeams = mockTeamSpaces.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700'
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-700'
      case 'low': return 'border-green-200 bg-green-50 text-green-700'
      default: return 'border-gray-200 bg-gray-50 text-gray-700'
    }
  }

  if (selectedTeam) {
    return (
      <Dialog open={isOpen} onOpenChange={() => closeDialog('team-spaces')}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedTeam(null)}
                  className="h-8 w-8 p-0"
                >
                  ←
                </Button>
                <div>
                  <DialogTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {selectedTeam.name}
                  </DialogTitle>
                  <DialogDescription>{selectedTeam.description}</DialogDescription>
                </div>
              </div>
              <Badge variant="outline">{selectedTeam.department}</Badge>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Projects</span>
                </div>
                <p className="text-2xl font-bold mt-1">{selectedTeam.projects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Team Members</span>
                </div>
                <p className="text-2xl font-bold mt-1">{selectedTeam.members.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Task Progress</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>{selectedTeam.completedTasks}/{selectedTeam.totalTasks}</span>
                    <span>{Math.round((selectedTeam.completedTasks / selectedTeam.totalTasks) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(selectedTeam.completedTasks / selectedTeam.totalTasks) * 100} 
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[50vh] mt-4">
              <TabsContent value="members" className="space-y-4">
                {/* Team Lead */}
                <div className="p-4 border rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedTeam.lead.avatar} alt={selectedTeam.lead.name} />
                        <AvatarFallback>{selectedTeam.lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(selectedTeam.lead.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{selectedTeam.lead.name}</h3>
                        <Badge variant="default" className="text-xs">Team Lead</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedTeam.lead.role}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{selectedTeam.lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{selectedTeam.lead.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {selectedTeam.lead.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{member.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {member.expertise.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="announcements" className="space-y-4">
                {selectedTeam.announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-4 border rounded-lg ${getPriorityColor(announcement.priority)}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{announcement.title}</h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3 leading-relaxed">{announcement.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {announcement.author}</span>
                          <span>•</span>
                          <span>{announcement.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTeam.resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {resource.type === 'document' && <FileText className="h-4 w-4 text-primary" />}
                              {resource.type === 'link' && <ExternalLink className="h-4 w-4 text-primary" />}
                              {resource.type === 'tool' && <Settings className="h-4 w-4 text-primary" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="font-medium mb-2">Team Settings</h3>
                  <p className="text-sm">Manage team preferences, permissions, and integrations</p>
                  <Button className="mt-4" onClick={() => toast({ title: "Coming Soon", description: "Team settings will be available in the next update." })}>
                    Configure Team
                  </Button>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('team-spaces')}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Team Spaces
          </DialogTitle>
          <DialogDescription>
            Explore department teams and their shared resources
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <ScrollArea className="h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
            {filteredTeams.map((team) => (
              <Card 
                key={team.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedTeam(team)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription className="mt-1">{team.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{team.department}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{team.members.length} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>{team.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{team.lastActivity}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Task Progress</span>
                        <span>{team.completedTasks}/{team.totalTasks}</span>
                      </div>
                      <Progress value={(team.completedTasks / team.totalTasks) * 100} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs font-medium">+{team.members.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        View Team →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}