"use client"

import * as React from "react"
import { 
  Heart,
  Activity,
  Users,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  BookOpen,
  Phone,
  MessageCircle,
  Star,
  Play,
  CheckCircle,
  Award,
  Zap,
  Brain,
  Shield
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface Challenge {
  id: string
  title: string
  description: string
  type: 'fitness' | 'mental' | 'social' | 'nutrition'
  duration: string
  participants: number
  progress: number
  reward: string
  isJoined: boolean
  startDate: string
  endDate: string
}

interface Resource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'podcast' | 'guide'
  category: 'mental-health' | 'fitness' | 'nutrition' | 'work-life-balance'
  duration?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  isBookmarked: boolean
}

interface SupportContact {
  id: string
  name: string
  role: string
  specialties: string[]
  availability: string
  contactMethod: 'phone' | 'chat' | 'email' | 'video'
  avatar?: string
}

const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: '30-Day Step Challenge',
    description: 'Walk 10,000 steps daily for 30 days and improve your cardiovascular health',
    type: 'fitness',
    duration: '30 days',
    participants: 156,
    progress: 73,
    reward: 'Wellness Points + Fitness Tracker',
    isJoined: true,
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  },
  {
    id: 'challenge-2',
    title: 'Mindful Meditation',
    description: 'Practice 10 minutes of daily meditation to reduce stress and improve focus',
    type: 'mental',
    duration: '21 days',
    participants: 89,
    progress: 45,
    reward: 'Meditation App Premium',
    isJoined: true,
    startDate: '2024-01-10',
    endDate: '2024-01-31'
  },
  {
    id: 'challenge-3',
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water daily and track your hydration habits',
    type: 'nutrition',
    duration: '14 days',
    participants: 203,
    progress: 0,
    reward: 'Smart Water Bottle',
    isJoined: false,
    startDate: '2024-01-15',
    endDate: '2024-01-29'
  },
  {
    id: 'challenge-4',
    title: 'Team Building Activities',
    description: 'Participate in weekly team activities to strengthen workplace relationships',
    type: 'social',
    duration: '4 weeks',
    participants: 67,
    progress: 25,
    reward: 'Team Outing Voucher',
    isJoined: false,
    startDate: '2024-01-08',
    endDate: '2024-02-05'
  }
]

const mockResources: Resource[] = [
  {
    id: 'resource-1',
    title: 'Managing Work Stress Effectively',
    description: 'Learn practical strategies to handle workplace stress and maintain mental well-being',
    type: 'article',
    category: 'mental-health',
    duration: '8 min read',
    difficulty: 'beginner',
    rating: 4.8,
    isBookmarked: true
  },
  {
    id: 'resource-2',
    title: 'Desk Exercises for Office Workers',
    description: 'Simple exercises you can do at your desk to stay active during work hours',
    type: 'video',
    category: 'fitness',
    duration: '15 min',
    difficulty: 'beginner',
    rating: 4.6,
    isBookmarked: false
  },
  {
    id: 'resource-3',
    title: 'Healthy Meal Prep for Busy Professionals',
    description: 'Time-saving meal preparation tips for maintaining a nutritious diet',
    type: 'guide',
    category: 'nutrition',
    duration: '12 min read',
    difficulty: 'intermediate',
    rating: 4.7,
    isBookmarked: true
  },
  {
    id: 'resource-4',
    title: 'Building Work-Life Balance',
    description: 'Strategies for maintaining a healthy balance between professional and personal life',
    type: 'podcast',
    category: 'work-life-balance',
    duration: '32 min',
    difficulty: 'intermediate',
    rating: 4.9,
    isBookmarked: false
  }
]

const mockSupportContacts: SupportContact[] = [
  {
    id: 'support-1',
    name: 'Dr. Sarah Wilson',
    role: 'Mental Health Counselor',
    specialties: ['Stress Management', 'Anxiety', 'Work-Life Balance'],
    availability: 'Mon-Fri 9AM-5PM',
    contactMethod: 'video',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face&auto=format'
  },
  {
    id: 'support-2',
    name: 'Mike Johnson',
    role: 'Fitness Coach',
    specialties: ['Exercise Planning', 'Nutrition', 'Ergonomics'],
    availability: '24/7 Chat Support',
    contactMethod: 'chat',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format'
  },
  {
    id: 'support-3',
    name: 'Employee Assistance Hotline',
    role: 'Crisis Support',
    specialties: ['24/7 Support', 'Crisis Intervention', 'Confidential Help'],
    availability: 'Available 24/7',
    contactMethod: 'phone'
  }
]

export function WellnessHubDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  const [challenges, setChallenges] = React.useState(mockChallenges)
  const [resources, setResources] = React.useState(mockResources)

  const isOpen = isDialogOpen('wellness-hub')

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: true, participants: challenge.participants + 1 }
        : challenge
    ))
    
    const challenge = challenges.find(c => c.id === challengeId)
    toast({
      title: "Challenge Joined!",
      description: `You've joined "${challenge?.title}". Good luck!`,
    })
  }

  const handleLeaveChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: false, participants: Math.max(0, challenge.participants - 1) }
        : challenge
    ))
    
    toast({
      title: "Challenge Left",
      description: "You've left the challenge. You can rejoin anytime!",
    })
  }

  const handleBookmarkResource = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, isBookmarked: !resource.isBookmarked }
        : resource
    ))
    
    const resource = resources.find(r => r.id === resourceId)
    toast({
      title: resource?.isBookmarked ? "Bookmark Removed" : "Resource Bookmarked",
      description: resource?.isBookmarked ? "Removed from your saved resources" : "Added to your saved resources",
    })
  }

  const handleContactSupport = (contact: SupportContact) => {
    toast({
      title: `Contacting ${contact.name}`,
      description: `Opening ${contact.contactMethod} support...`,
    })
  }

  const getChallengeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'fitness': return <Activity className="h-5 w-5" />
      case 'mental': return <Brain className="h-5 w-5" />
      case 'social': return <Users className="h-5 w-5" />
      case 'nutrition': return <Heart className="h-5 w-5" />
      default: return <Target className="h-5 w-5" />
    }
  }

  const getChallengeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'fitness': return 'bg-green-100 text-green-700 border-green-200'
      case 'mental': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'social': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'nutrition': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />
      case 'video': return <Play className="h-4 w-4" />
      case 'podcast': return <MessageCircle className="h-4 w-4" />
      case 'guide': return <Target className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getContactIcon = (method: SupportContact['contactMethod']) => {
    switch (method) {
      case 'phone': return <Phone className="h-4 w-4" />
      case 'chat': return <MessageCircle className="h-4 w-4" />
      case 'video': return <Play className="h-4 w-4" />
      case 'email': return <BookOpen className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeDialog('wellness-hub')}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Wellness Hub
          </DialogTitle>
          <DialogDescription>
            Your complete wellness companion for physical and mental well-being
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">My Progress</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] mt-6">
            <TabsContent value="challenges" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getChallengeColor(challenge.type)}`}>
                            {getChallengeIcon(challenge.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {challenge.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={challenge.isJoined ? "default" : "outline"}>
                          {challenge.isJoined ? "Joined" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {challenge.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {challenge.participants} participants
                          </span>
                        </div>

                        {challenge.isJoined && (
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} />
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-muted-foreground">Reward: {challenge.reward}</span>
                        </div>

                        <div className="flex gap-2">
                          {challenge.isJoined ? (
                            <>
                              <Button size="sm" variant="outline" className="flex-1">
                                <TrendingUp className="h-4 w-4 mr-2" />
                                View Progress
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleLeaveChallenge(challenge.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Leave
                              </Button>
                            </>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleJoinChallenge(challenge.id)}
                              className="w-full"
                            >
                              <Trophy className="h-4 w-4 mr-2" />
                              Join Challenge
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {resource.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleBookmarkResource(resource.id)}
                          className={resource.isBookmarked ? "text-yellow-600" : "text-gray-400"}
                        >
                          <Star className={`h-4 w-4 ${resource.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="capitalize">
                            {resource.type}
                          </Badge>
                          <span>{resource.duration}</span>
                          <Badge variant="outline" className="capitalize">
                            {resource.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(resource.rating) 
                                    ? "text-yellow-400 fill-current" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {resource.rating}
                          </span>
                        </div>

                        <Button size="sm" className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Access Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {mockSupportContacts.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{contact.name}</h3>
                            <p className="text-muted-foreground">{contact.role}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {contact.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {contact.availability}
                            </span>
                          </div>

                          <Button 
                            onClick={() => handleContactSupport(contact)}
                            className="w-full sm:w-auto"
                          >
                            {getContactIcon(contact.contactMethod)}
                            <span className="ml-2 capitalize">
                              Contact via {contact.contactMethod}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">Active Challenges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Zap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">1,247</p>
                        <p className="text-sm text-muted-foreground">Wellness Points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Trophy className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-muted-foreground">Challenges Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Wellness Journey</CardTitle>
                  <CardDescription>
                    Track your progress across different wellness areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Physical Fitness</span>
                        <span>73%</span>
                      </div>
                      <Progress value={73} className="bg-green-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mental Wellness</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="bg-purple-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Social Connection</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="bg-blue-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Nutrition</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="bg-orange-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}