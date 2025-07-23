"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDialog } from "@/contexts/DialogContext"
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  Clock, 
  Plus,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Star
} from "lucide-react"

const mockProjects = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    status: "active",
    progress: 75,
    dueDate: "2024-02-15",
    team: [
      { name: "Sarah Chen", avatar: "", initials: "SC" },
      { name: "Mike Johnson", avatar: "", initials: "MJ" },
      { name: "Alex Rivera", avatar: "", initials: "AR" }
    ],
    priority: "high",
    tasksCompleted: 12,
    totalTasks: 16,
    lastActivity: "2 hours ago"
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development", 
    description: "Native iOS and Android app for customer portal",
    status: "active",
    progress: 45,
    dueDate: "2024-03-30",
    team: [
      { name: "Lisa Wong", avatar: "", initials: "LW" },
      { name: "David Kim", avatar: "", initials: "DK" }
    ],
    priority: "medium",
    tasksCompleted: 8,
    totalTasks: 18,
    lastActivity: "1 day ago"
  },
  {
    id: "PRJ-003",
    name: "Security Audit",
    description: "Comprehensive security assessment and remediation",
    status: "planning",
    progress: 15,
    dueDate: "2024-02-28",
    team: [
      { name: "Jennifer Adams", avatar: "", initials: "JA" },
      { name: "Robert Taylor", avatar: "", initials: "RT" },
      { name: "Emily Zhang", avatar: "", initials: "EZ" }
    ],
    priority: "high",
    tasksCompleted: 2,
    totalTasks: 12,
    lastActivity: "3 days ago"
  }
]

const mockTasks = [
  {
    id: "TSK-001",
    title: "Create wireframes for homepage",
    project: "Website Redesign",
    status: "todo",
    priority: "high",
    assignee: { name: "Sarah Chen", initials: "SC" },
    dueDate: "2024-01-20",
    labels: ["design", "frontend"]
  },
  {
    id: "TSK-002",
    title: "Set up database schema",
    project: "Mobile App Development",
    status: "in-progress", 
    priority: "medium",
    assignee: { name: "David Kim", initials: "DK" },
    dueDate: "2024-01-18",
    labels: ["backend", "database"]
  },
  {
    id: "TSK-003",
    title: "Security penetration testing",
    project: "Security Audit",
    status: "done",
    priority: "high",
    assignee: { name: "Robert Taylor", initials: "RT" },
    dueDate: "2024-01-15",
    labels: ["security", "testing"]
  }
]

export function ProjectManagementDialog() {
  const { isDialogOpen, closeDialog } = useDialog()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "on-hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "todo": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "done": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={isDialogOpen('project-management')} onOpenChange={() => closeDialog('project-management')}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5" />
            Project Management
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Due Soon</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Within next 7 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    Team capacity this week
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Sarah completed", task: "Homepage wireframes", time: "2 hours ago" },
                    { action: "Mike updated", task: "API documentation", time: "4 hours ago" },
                    { action: "Lisa started", task: "Mobile authentication", time: "1 day ago" },
                    { action: "David reviewed", task: "Database schema", time: "2 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1 text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.task}
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{project.name}</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Projects</h3>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search projects..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{project.tasksCompleted}/{project.totalTasks} tasks</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due {project.dueDate}</span>
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-background">
                            <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">Updated {project.lastActivity}</span>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Tasks</h3>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search tasks..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              {["todo", "in-progress", "done"].map((status) => (
                <div key={status}>
                  <h4 className="font-medium mb-2 capitalize flex items-center gap-2">
                    {status === "todo" && <AlertCircle className="w-4 h-4 text-orange-500" />}
                    {status === "in-progress" && <Clock className="w-4 h-4 text-blue-500" />}
                    {status === "done" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {status.replace('-', ' ')} ({mockTasks.filter(t => t.status === status).length})
                  </h4>
                  <div className="space-y-2">
                    {mockTasks.filter(task => task.status === status).map((task) => (
                      <Card key={task.id} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h5 className="font-medium">{task.title}</h5>
                                <Badge variant="outline">{task.project}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due {task.dueDate}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Avatar className="w-5 h-5">
                                    <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                                  </Avatar>
                                  <span>{task.assignee.name}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {task.labels.map((label) => (
                                  <Badge key={label} variant="secondary" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Team Projects</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {project.priority === "high" && <Star className="w-4 h-4 text-yellow-500" />}
                          {project.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {project.team.length} team members
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-background">
                            <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}