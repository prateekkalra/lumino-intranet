"use client"

import * as React from "react"
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  FileText, 
  ExternalLink, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Video,
  Download,
  Send,
  Star,
  ThumbsUp,
  ChevronRight,
  Users,
  Zap
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  tags: string[]
}

interface SupportTicket {
  id: string
  title: string
  status: 'open' | 'pending' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  lastUpdate: string
}

interface GuideItem {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'download'
  duration?: string
  size?: string
  category: string
  popular: boolean
}

const mockFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    answer: "To reset your password, go to your Profile settings, navigate to the Security tab, and click on 'Change Password'. You'll need to enter your current password first.",
    category: "Account",
    helpful: 45,
    tags: ["password", "security", "account"]
  },
  {
    id: "2", 
    question: "How do I customize my dashboard widgets?",
    answer: "You can drag and drop widgets to rearrange them on your dashboard. Click and hold any widget header to start dragging. You can also add or remove widgets by clicking the customize button in the top right.",
    category: "Dashboard",
    helpful: 32,
    tags: ["dashboard", "widgets", "customization"]
  },
  {
    id: "3",
    question: "How do I book a meeting room?",
    answer: "To book a meeting room, click on Quick Actions and select 'Book Resource', or go to the Calendar widget and click on a time slot. Select your preferred room and duration.",
    category: "Resources",
    helpful: 28,
    tags: ["booking", "meeting room", "calendar"]
  },
  {
    id: "4",
    question: "How do I contact IT support?",
    answer: "You can contact IT support through the Service Desk dialog, email help@lumino.com, or call the help desk at ext. 4357 during business hours (9 AM - 5 PM).",
    category: "Support",
    helpful: 67,
    tags: ["IT", "support", "contact"]
  }
]

const mockTickets: SupportTicket[] = [
  {
    id: "TICKET-001",
    title: "Unable to access shared drive",
    status: "open",
    priority: "medium",
    createdAt: "2 days ago",
    lastUpdate: "1 day ago"
  },
  {
    id: "TICKET-002", 
    title: "VPN connection issues",
    status: "pending",
    priority: "high",
    createdAt: "1 week ago",
    lastUpdate: "3 days ago"
  }
]

const mockGuides: GuideItem[] = [
  {
    id: "1",
    title: "Getting Started with Lumino",
    description: "Complete guide to using the intranet platform",
    type: "article",
    category: "Getting Started",
    popular: true
  },
  {
    id: "2",
    title: "Dashboard Customization Tutorial",
    description: "Learn how to personalize your dashboard",
    type: "video",
    duration: "5 min",
    category: "Dashboard",
    popular: true
  },
  {
    id: "3",
    title: "Security Best Practices",
    description: "Keep your account secure with these tips",
    type: "article",
    category: "Security",
    popular: false
  },
  {
    id: "4",
    title: "Keyboard Shortcuts Reference",
    description: "PDF guide of all keyboard shortcuts",
    type: "download",
    size: "2.1 MB",
    category: "Reference",
    popular: false
  }
]

const categories = ["All", "Account", "Dashboard", "Resources", "Support", "Security"]

export function HelpSupportDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [expandedFAQ, setExpandedFAQ] = React.useState<string | null>(null)
  const [supportForm, setSupportForm] = React.useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  })

  const isOpen = isDialogOpen('help-support')

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmitTicket = () => {
    if (!supportForm.subject || !supportForm.category || !supportForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Support Ticket Submitted",
      description: "Your ticket has been submitted. You'll receive a confirmation email shortly.",
    })

    setSupportForm({
      subject: "",
      category: "",
      priority: "",
      description: ""
    })
  }

  const handleMarkHelpful = () => {
    toast({
      title: "Thank you!",
      description: "Your feedback helps us improve our help content.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="destructive">Open</Badge>
      case 'pending': return <Badge variant="secondary">Pending</Badge>
      case 'resolved': return <Badge variant="default">Resolved</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">{priority}</Badge>
      case 'medium': return <Badge variant="secondary">{priority}</Badge>
      case 'low': return <Badge variant="outline">{priority}</Badge>
      default: return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'download': return <Download className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('help-support')}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </DialogTitle>
          <DialogDescription>
            Find answers to common questions, submit support tickets, and access helpful resources.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="faq" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="support">Contact Support</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[520px] mt-4">
            <TabsContent value="faq" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {filteredFAQs.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Search className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No FAQ items found</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your search terms or category filter</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredFAQs.map((faq) => (
                    <Card key={faq.id}>
                      <Collapsible
                        open={expandedFAQ === faq.id}
                        onOpenChange={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-base">{faq.question}</CardTitle>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">{faq.category}</Badge>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <ThumbsUp className="h-3 w-3" />
                                    {faq.helpful}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className={`h-4 w-4 transition-transform ${expandedFAQ === faq.id ? 'rotate-90' : ''}`} />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <p className="text-muted-foreground mb-4">{faq.answer}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {faq.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkHelpful()}
                                className="text-xs"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful
                              </Button>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {mockGuides.map((guide) => (
                  <Card key={guide.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(guide.type)}
                          <div>
                            <CardTitle className="text-base flex items-center gap-2">
                              {guide.title}
                              {guide.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="mt-1">{guide.description}</CardDescription>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{guide.category}</Badge>
                        <div className="text-sm text-muted-foreground">
                          {guide.duration && `${guide.duration}`}
                          {guide.size && `${guide.size}`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Submit a Ticket
                    </CardTitle>
                    <CardDescription>
                      Get help with technical issues or general questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select
                          value={supportForm.category}
                          onValueChange={(value) => setSupportForm(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account Help</SelectItem>
                            <SelectItem value="hardware">Hardware Request</SelectItem>
                            <SelectItem value="software">Software Request</SelectItem>
                            <SelectItem value="access">Access Request</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select
                          value={supportForm.priority}
                          onValueChange={(value) => setSupportForm(prev => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about your issue..."
                        rows={4}
                        value={supportForm.description}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handleSubmitTicket} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Direct Contact
                    </CardTitle>
                    <CardDescription>
                      Reach out to our support team directly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Help Desk</p>
                          <p className="text-sm text-muted-foreground">ext. 4357 (HELP)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">help@lumino.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Support Hours</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 5 PM PST</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Emergency Contact</Label>
                      <p className="text-sm text-muted-foreground">
                        For urgent after-hours issues, call the emergency line at ext. 911 or email emergency@lumino.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tickets" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">My Support Tickets</h3>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>

              {mockTickets.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No support tickets</p>
                    <p className="text-sm text-muted-foreground">You haven't submitted any tickets yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {mockTickets.map((ticket) => (
                    <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{ticket.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Created {ticket.createdAt}</span>
                          <span>Last updated {ticket.lastUpdate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      System Status
                    </CardTitle>
                    <CardDescription>All systems operational</CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Core Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dashboard</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Authentication</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">File Storage</span>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs text-yellow-600">Degraded</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Service</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Calendar Sync</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Operational</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 border rounded-lg">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Scheduled Maintenance</p>
                          <p className="text-xs text-muted-foreground">File storage will undergo maintenance on Sunday, 2:00 AM - 4:00 AM PST</p>
                          <p className="text-xs text-muted-foreground mt-1">Posted 2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}