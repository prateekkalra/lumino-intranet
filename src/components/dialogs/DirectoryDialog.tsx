"use client"

import * as React from "react"
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Calendar,
  MessageCircle,
  Star,
  User,
  ArrowLeft
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDialog } from "@/contexts/DialogContext"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  manager?: string
  location: string
  avatar?: string
  status: 'online' | 'away' | 'busy' | 'offline'
  startDate: string
  skills: string[]
  bio: string
  reports: string[]
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'Mike Chen',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'online',
    startDate: 'March 2022',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications.',
    reports: []
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Engineering Manager',
    department: 'Engineering',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'busy',
    startDate: 'January 2021',
    skills: ['Leadership', 'System Design', 'Python', 'Kubernetes'],
    bio: 'Technical leader focused on building high-performing engineering teams and scalable architectures.',
    reports: ['Sarah Johnson', 'Alex Kim', 'Jessica Wu']
  },
  {
    id: '3',
    name: 'Lisa Park',
    email: 'lisa.park@company.com',
    phone: '+1 (555) 345-6789',
    position: 'Senior UX Designer',
    department: 'Design',
    manager: 'David Wilson',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'online',
    startDate: 'June 2022',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    bio: 'Creative designer passionate about creating intuitive user experiences and accessible interfaces.',
    reports: []
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'Director of Product',
    department: 'Product',
    location: 'Austin, TX',
    status: 'away',
    startDate: 'September 2020',
    skills: ['Product Strategy', 'Analytics', 'A/B Testing', 'Roadmapping'],
    bio: 'Product leader with expertise in driving growth through data-driven decision making.',
    reports: ['Lisa Park', 'Kevin Brown', 'Amanda Davis']
  },
  {
    id: '5',
    name: 'Jennifer Adams',
    email: 'jennifer.adams@company.com',
    phone: '+1 (555) 567-8901',
    position: 'HR Business Partner',
    department: 'Human Resources',
    manager: 'Robert Taylor',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'online',
    startDate: 'April 2021',
    skills: ['Talent Management', 'Employee Relations', 'Compensation', 'DEI'],
    bio: 'HR professional dedicated to fostering inclusive workplace culture and employee development.',
    reports: []
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 678-9012',
    position: 'VP of Human Resources',
    department: 'Human Resources',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'offline',
    startDate: 'November 2019',
    skills: ['Strategic HR', 'Organizational Development', 'Leadership', 'Change Management'],
    bio: 'Experienced HR executive focused on building people-first culture and organizational excellence.',
    reports: ['Jennifer Adams', 'Michael Clark']
  },
  {
    id: '7',
    name: 'Alex Kim',
    email: 'alex.kim@company.com',
    phone: '+1 (555) 789-0123',
    position: 'Software Engineer',
    department: 'Engineering',
    manager: 'Mike Chen',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'online',
    startDate: 'August 2023',
    skills: ['JavaScript', 'Python', 'Docker', 'GraphQL'],
    bio: 'Junior developer eager to learn and contribute to innovative software solutions.',
    reports: []
  },
  {
    id: '8',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 890-1234',
    position: 'Marketing Manager',
    department: 'Marketing',
    manager: 'James Miller',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face&auto=format',
    status: 'busy',
    startDate: 'February 2022',
    skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics'],
    bio: 'Creative marketer specialized in building brand awareness and driving customer engagement.',
    reports: []
  }
]

export function DirectoryDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [employees] = React.useState(mockEmployees)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState("all")
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null)

  const departments = [...new Set(employees.map(emp => emp.department))]

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'online':
        return 'bg-success'
      case 'away':
        return 'bg-warning'
      case 'busy':
        return 'bg-destructive'
      case 'offline':
        return 'bg-muted-foreground'
      default:
        return 'bg-muted-foreground'
    }
  }

  const getStatusText = (status: Employee['status']) => {
    switch (status) {
      case 'online':
        return 'Available'
      case 'away':
        return 'Away'
      case 'busy':
        return 'Busy'
      case 'offline':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  const filteredEmployees = React.useMemo(() => {
    let filtered = employees

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment)
    }

    if (searchQuery) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }, [employees, selectedDepartment, searchQuery])

  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer hover:bg-muted/50"
      onClick={() => setSelectedEmployee(employee)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(employee.status)}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <CardTitle className="text-base font-semibold truncate">{employee.name}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {employee.department}
              </Badge>
            </div>
            
            <CardDescription className="text-sm mb-2 truncate">{employee.position}</CardDescription>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`} />
                <span>{getStatusText(employee.status)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {employee.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {employee.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{employee.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const EmployeeProfile = ({ employee }: { employee: Employee }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-background ${getStatusColor(employee.status)}`} />
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-2xl mb-1">{employee.name}</CardTitle>
            <CardDescription className="text-lg mb-2">{employee.position}</CardDescription>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{employee.department}</Badge>
              <Badge variant={employee.status === 'online' ? 'default' : 'secondary'}>
                {getStatusText(employee.status)}
              </Badge>
            </div>
            
            <CardDescription className="leading-relaxed">{employee.bio}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Started {employee.startDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {employee.manager && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Reports to {employee.manager}</span>
                </div>
              )}
              {employee.reports.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Direct Reports:</p>
                  <div className="space-y-1">
                    {employee.reports.map((report, index) => (
                      <div key={index} className="text-sm pl-7">• {report}</div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
      
      <CardFooter className="flex gap-3">
        <Button>
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Message
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
        <Button variant="outline">
          <Star className="h-4 w-4 mr-2" />
          Add to Favorites
        </Button>
      </CardFooter>
    </Card>
  )

  const EmptyState = () => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-lg mb-2">No employees found</CardTitle>
        <CardDescription>
          Try adjusting your search terms or filters
        </CardDescription>
      </CardContent>
    </Card>
  )

  return (
    <Dialog 
      open={isDialogOpen('directory')} 
      onOpenChange={(open) => !open && closeDialog('directory')}
    >
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">Company Directory</DialogTitle>
                <DialogDescription>
                  Find and connect with colleagues across the organization
                </DialogDescription>
              </div>
            </div>
            
            {selectedEmployee && (
              <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {selectedEmployee ? (
            <div className="p-8 overflow-auto flex-1">
              <EmployeeProfile employee={selectedEmployee} />
            </div>
          ) : (
            <Tabs defaultValue="grid" className="h-full flex flex-col">
              <div className="px-6 pb-4 flex-shrink-0">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="flex-1 overflow-auto m-0">
                <div className="px-8 space-y-8 pb-8">
                  {/* Search and Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search employees by name, position, skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                        
                        <Select
                          value={selectedDepartment}
                          onValueChange={setSelectedDepartment}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="All Departments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Employee Grid */}
                  {filteredEmployees.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="list" className="flex-1 overflow-auto m-0">
                <div className="px-8 space-y-8 pb-8">
                  <Card>
                    <CardContent className="p-4">
                      <Command className="border rounded-lg">
                        <CommandInput placeholder="Search employees..." />
                        <CommandList>
                          <CommandEmpty>No employees found.</CommandEmpty>
                          <CommandGroup>
                            {filteredEmployees.map((employee) => (
                              <CommandItem
                                key={employee.id}
                                onSelect={() => setSelectedEmployee(employee)}
                                className="flex items-center gap-4 p-4"
                              >
                                <div className="relative">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={employee.avatar} alt={employee.name} />
                                    <AvatarFallback>
                                      {employee.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(employee.status)}`} />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium truncate">{employee.name}</p>
                                    <Badge variant="outline" className="text-xs">
                                      {employee.department}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {employee.position}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {employee.location} • {getStatusText(employee.status)}
                                  </p>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedEmployee ? 'Employee Profile' : `${filteredEmployees.length} of ${employees.length} employees`}
            </div>
            <Button variant="outline" onClick={() => closeDialog('directory')}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}