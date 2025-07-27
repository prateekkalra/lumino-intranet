"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDialog } from "@/contexts/DialogContext"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { 
  Ticket, 
  AlertCircle, 
  Clock, 
  MessageSquare, 
  Paperclip, 
  Search,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp
} from "lucide-react"

const mockTickets = [
  {
    id: "SD-001",
    title: "Email not syncing on mobile device",
    status: "open",
    priority: "medium",
    created: "2024-01-15",
    category: "email",
    description: "Unable to receive emails on iPhone since yesterday",
    lastUpdate: "2 hours ago"
  },
  {
    id: "SD-002", 
    title: "VPN connection keeps dropping",
    status: "in-progress",
    priority: "high",
    created: "2024-01-14",
    category: "network",
    description: "VPN disconnects every 30 minutes when working from home",
    lastUpdate: "1 day ago"
  },
  {
    id: "SD-003",
    title: "Printer queue stuck",
    status: "resolved",
    priority: "low", 
    created: "2024-01-10",
    category: "hardware",
    description: "Print jobs not processing on 3rd floor printer",
    lastUpdate: "3 days ago"
  }
]

const mockKnowledgeBase = [
  {
    id: "KB-001",
    title: "How to reset your password",
    category: "Account",
    views: 1250,
    lastUpdated: "2024-01-10"
  },
  {
    id: "KB-002", 
    title: "Setting up VPN on Windows",
    category: "Network",
    views: 890,
    lastUpdated: "2024-01-08"
  },
  {
    id: "KB-003",
    title: "Configuring email on mobile devices",
    category: "Email",
    views: 650,
    lastUpdated: "2024-01-05"
  }
]

const systemStatus = [
  { service: "Email Services", status: "operational", uptime: "99.9%" },
  { service: "VPN Gateway", status: "degraded", uptime: "98.5%" },
  { service: "File Servers", status: "operational", uptime: "99.8%" },
  { service: "Printers Network", status: "operational", uptime: "99.2%" }
]

export function ServiceDeskDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "",
    priority: "",
    description: ""
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-info/10 text-info-foreground border border-info/20"
      case "in-progress": return "bg-warning/10 text-warning-foreground border border-warning/20"
      case "resolved": return "bg-success/10 text-success-foreground border border-success/20"
      case "operational": return "bg-success/10 text-success-foreground border border-success/20"
      case "degraded": return "bg-warning/10 text-warning-foreground border border-warning/20"
      default: return "bg-secondary/10 text-secondary-foreground border border-secondary/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive-foreground border border-destructive/20"
      case "medium": return "bg-warning/10 text-warning-foreground border border-warning/20"
      case "low": return "bg-secondary/10 text-secondary-foreground border border-secondary/20"
      default: return "bg-secondary/10 text-secondary-foreground border border-secondary/20"
    }
  }

  const handleSubmitTicket = () => {
    console.log("Submitting ticket:", newTicket)
    toast({
      title: "Ticket Submitted Successfully!",
      description: `Your support ticket for "${newTicket.title}" has been created. Our team will respond within 2-4 hours.`,
      duration: 5000,
    })
    setNewTicket({ title: "", category: "", priority: "", description: "" })
  }

  return (
    <Dialog open={isDialogOpen('service-desk')} onOpenChange={() => closeDialog('service-desk')}>
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            IT Service Desk
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="submit">Submit Ticket</TabsTrigger>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create Support Request</CardTitle>
                <CardDescription>
                  Describe your issue and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-title">Title</Label>
                    <Input
                      id="ticket-title"
                      placeholder="Brief description of the issue"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-category">Category</Label>
                    <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="access">Access/Permissions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-priority">Priority</Label>
                  <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General inquiry</SelectItem>
                      <SelectItem value="medium">Medium - Impacting work</SelectItem>
                      <SelectItem value="high">High - Cannot work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-description">Description</Label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Please provide detailed information about the issue, including steps to reproduce, error messages, etc."
                    className="min-h-32"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Screenshots and error logs help us resolve issues faster
                  </span>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSubmitTicket} className="w-32">
                    Submit Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-tickets" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Support Tickets</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search tickets..." className="pl-8 w-64" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {mockTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Created {ticket.created}
                          </span>
                          <span>Updated {ticket.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Knowledge Base</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search articles..." className="pl-8 w-64" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockKnowledgeBase.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>{article.category}</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {article.views} views
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-xs text-muted-foreground">
                      Last updated: {article.lastUpdated}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 flex-wrap">
                {["Account Management", "Email Setup", "VPN & Network", "Hardware Issues", "Software Installation"].map((category) => (
                  <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {category}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">System Status</h3>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">All systems operational</span>
              </div>
            </div>

            <div className="grid gap-4">
              {systemStatus.map((system) => (
                <Card key={system.service}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {system.status === 'operational' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : system.status === 'degraded' ? (
                          <AlertCircle className="w-5 h-5 text-warning" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <div>
                          <h4 className="font-medium">{system.service}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{system.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{system.uptime}</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Support Team Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">~2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Agents</span>
                    <span className="font-medium">5/7 online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Queue Length</span>
                    <span className="font-medium">12 tickets</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}