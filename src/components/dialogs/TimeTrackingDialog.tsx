"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDialog } from "@/contexts/DialogContext"
import { useState, useEffect } from "react"
import { 
  Clock, 
  Play, 
  Pause, 
  Square,
  Plus,
  Calendar,
  DollarSign,
  FileText,
  BarChart3,
  Timer,
  Zap,
  Target,
  TrendingUp,
  ChevronRight,
  Receipt,
  Upload
} from "lucide-react"

const mockProjects = [
  { id: "prj-1", name: "Website Redesign", client: "Internal", rate: 75 },
  { id: "prj-2", name: "Mobile App", client: "TechCorp", rate: 85 },
  { id: "prj-3", name: "Security Audit", client: "SecureInc", rate: 95 }
]

const mockTimeEntries = [
  {
    id: "te-1",
    project: "Website Redesign",
    task: "Homepage wireframes",
    duration: "2h 30m",
    date: "2024-01-15",
    status: "completed",
    billable: true,
    rate: 75
  },
  {
    id: "te-2", 
    project: "Mobile App",
    task: "API integration",
    duration: "1h 45m",
    date: "2024-01-15",
    status: "completed",
    billable: true,
    rate: 85
  },
  {
    id: "te-3",
    project: "Security Audit", 
    task: "Code review",
    duration: "3h 15m",
    date: "2024-01-14",
    status: "completed",
    billable: true,
    rate: 95
  }
]

const mockExpenses = [
  {
    id: "exp-1",
    description: "Software license - Adobe Creative Suite",
    amount: 52.99,
    date: "2024-01-15",
    category: "Software",
    project: "Website Redesign",
    status: "pending",
    receipt: true
  },
  {
    id: "exp-2",
    description: "Client meeting - Coffee & lunch", 
    amount: 28.50,
    date: "2024-01-14",
    category: "Meals",
    project: "Mobile App",
    status: "approved",
    receipt: true
  },
  {
    id: "exp-3",
    description: "Office supplies - Notebooks & pens",
    amount: 15.75,
    date: "2024-01-13", 
    category: "Office",
    project: "General",
    status: "approved",
    receipt: false
  }
]

export function TimeTrackingDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [activeTimer, setActiveTimer] = useState<{
    project: string,
    task: string,
    startTime: Date,
    elapsed: number
  } | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [newEntry, setNewEntry] = useState({
    project: "",
    task: "",
    duration: "",
    date: new Date().toISOString().split('T')[0],
    billable: true
  })
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    project: "",
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeTimer) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - activeTimer.startTime.getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    if (newEntry.project && newEntry.task) {
      setActiveTimer({
        project: newEntry.project,
        task: newEntry.task,
        startTime: new Date(),
        elapsed: 0
      })
      setElapsedTime(0)
    }
  }

  const pauseTimer = () => {
    if (activeTimer) {
      // In a real app, you'd save the current state
      console.log("Timer paused at:", formatTime(elapsedTime))
    }
  }

  const stopTimer = () => {
    if (activeTimer) {
      console.log("Timer stopped. Total time:", formatTime(elapsedTime))
      setActiveTimer(null)
      setElapsedTime(0)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "running": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "paused": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "approved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const calculateWeeklyTotal = () => {
    return mockTimeEntries.reduce((total, entry) => {
      const hours = parseFloat(entry.duration.split('h')[0])
      const minutes = parseFloat(entry.duration.split('h')[1]?.split('m')[0] || '0') / 60
      return total + hours + minutes
    }, 0)
  }

  const calculateWeeklyEarnings = () => {
    return mockTimeEntries.reduce((total, entry) => {
      if (entry.billable) {
        const hours = parseFloat(entry.duration.split('h')[0])
        const minutes = parseFloat(entry.duration.split('h')[1]?.split('m')[0] || '0') / 60
        return total + (hours + minutes) * entry.rate
      }
      return total
    }, 0)
  }

  return (
    <Dialog open={isDialogOpen('time-tracking')} onOpenChange={() => closeDialog('time-tracking')}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Tracking
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week View</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Time</CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeTimer ? formatTime(elapsedTime) : "6h 15m"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeTimer ? "Currently tracking" : "3 entries logged"}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5h 45m</div>
                  <p className="text-xs text-muted-foreground">
                    $462.50 earned
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <Progress value={78} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    6.2h of 8h target
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Time Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timer-project">Project</Label>
                    <Select value={newEntry.project} onValueChange={(value) => setNewEntry({...newEntry, project: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.name}>
                            {project.name} - {project.client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timer-task">Task Description</Label>
                    <Input
                      id="timer-task"
                      placeholder="What are you working on?"
                      value={newEntry.task}
                      onChange={(e) => setNewEntry({...newEntry, task: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center py-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-mono font-bold">
                      {activeTimer ? formatTime(elapsedTime) : "00:00:00"}
                    </div>
                    <div className="flex items-center gap-2">
                      {!activeTimer ? (
                        <Button onClick={startTimer} disabled={!newEntry.project || !newEntry.task}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Timer
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" onClick={pauseTimer}>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                          <Button variant="destructive" onClick={stopTimer}>
                            <Square className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {activeTimer && (
                  <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Currently tracking:</span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {activeTimer.project} - {activeTimer.task}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Today's Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTimeEntries.filter(entry => entry.date === "2024-01-15").map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="space-y-1">
                        <div className="font-medium">{entry.task}</div>
                        <div className="text-sm text-muted-foreground">{entry.project}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(entry.status)}>
                          {entry.status}
                        </Badge>
                        <div className="text-sm font-mono">{entry.duration}</div>
                        {entry.billable && (
                          <div className="text-sm text-green-600 font-medium">
                            ${(parseFloat(entry.duration.split('h')[0]) * entry.rate).toFixed(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Week of January 15-21, 2024</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Previous Week
                </Button>
                <Button variant="outline" size="sm">
                  Next Week
                  <Calendar className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{calculateWeeklyTotal().toFixed(1)}h</div>
                  <div className="text-sm text-muted-foreground">Total Hours</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">${calculateWeeklyEarnings().toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Billable Amount</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-muted-foreground">Utilization</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => {
                    const hours = [8.5, 7.2, 6.8, 8.1, 5.4][index]
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-20 text-sm font-medium">{day}</div>
                          <Progress value={(hours / 10) * 100} className="w-32 h-2" />
                        </div>
                        <div className="text-sm font-mono">{hours}h</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Project Time Allocation</h3>
            </div>

            <div className="grid gap-4">
              {mockProjects.map((project) => {
                const projectEntries = mockTimeEntries.filter(entry => entry.project === project.name)
                const totalHours = projectEntries.reduce((total, entry) => {
                  const hours = parseFloat(entry.duration.split('h')[0])
                  const minutes = parseFloat(entry.duration.split('h')[1]?.split('m')[0] || '0') / 60
                  return total + hours + minutes
                }, 0)
                const totalEarnings = totalHours * project.rate

                return (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{project.name}</CardTitle>
                          <CardDescription>{project.client} • ${project.rate}/hour</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{totalHours.toFixed(1)}h</div>
                          <div className="text-sm text-muted-foreground">${totalEarnings.toFixed(0)} earned</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {projectEntries.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between text-sm">
                            <span>{entry.task}</span>
                            <span className="font-mono">{entry.duration}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Time Reports</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Productivity Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Week</span>
                      <span className="font-medium">36.2h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Week</span>
                      <span className="font-medium">34.8h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Week Average</span>
                      <span className="font-medium">35.5h</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+4% vs last week</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Efficiency Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Billable Ratio</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Focus Time</span>
                      <span className="font-medium">6.2h/day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Project Count</span>
                      <span className="font-medium">3 active</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600">Meeting targets</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Expense Tracking</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-base">Submit New Expense</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-description">Description</Label>
                    <Input
                      id="expense-description"
                      placeholder="Expense description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Amount ($)</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-category">Category</Label>
                    <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="meals">Meals</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="office">Office Supplies</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-project">Project</Label>
                    <Select value={newExpense.project} onValueChange={(value) => setNewExpense({...newExpense, project: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        {mockProjects.map((project) => (
                          <SelectItem key={project.id} value={project.name}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                  <Button>Submit Expense</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {mockExpenses.map((expense) => (
                <Card key={expense.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{expense.description}</h5>
                          {expense.receipt && <Receipt className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{expense.category}</Badge>
                          <span>{expense.project}</span>
                          <span>{expense.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(expense.status)}>
                          {expense.status}
                        </Badge>
                        <div className="text-lg font-bold">${expense.amount}</div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
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