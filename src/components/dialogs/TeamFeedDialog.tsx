"use client"

import * as React from "react"
import { 
  MessageCircle, 
  Share2, 
  Plus, 
  Filter,
  Search, 
  Paperclip,
  Send,
  Star,
  FileText,
  Image as ImageIcon,
  Video,
  MoreHorizontal,
  Reply
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDialog } from "@/contexts/DialogContext"

interface TeamPost {
  id: string
  type: 'status' | 'achievement' | 'announcement' | 'document' | 'question' | 'celebration'
  user: {
    name: string
    avatar?: string
    department: string
    role: string
    id: string
  }
  content: string
  timestamp: string
  isImportant?: boolean
  attachments?: Array<{
    type: 'image' | 'document' | 'link'
    name: string
    url: string
    thumbnail?: string
  }>
  reactions: Array<{
    type: 'like' | 'love' | 'celebrate' | 'insightful'
    count: number
    users: string[]
  }>
  comments: Array<{
    id: string
    user: {
      name: string
      avatar?: string
      role: string
    }
    content: string
    timestamp: string
    reactions?: Array<{
      type: string
      count: number
    }>
  }>
  tags?: string[]
  department?: string
  visibility: 'everyone' | 'department' | 'team'
}

const mockTeamPosts: TeamPost[] = [
  {
    id: '1',
    type: 'achievement',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Engineering',
      role: 'Senior Developer'
    },
    content: 'Just deployed the new authentication system! 🚀 This was a 3-month project that improves our security posture by 40% and reduces login time by 60%. Thanks to the entire team for the collaboration!',
    timestamp: '30 minutes ago',
    isImportant: true,
    attachments: [
      {
        type: 'document',
        name: 'Security Improvement Report.pdf',
        url: '#'
      }
    ],
    reactions: [
      { type: 'like', count: 24, users: ['Mike Chen', 'Lisa Park', 'David Wilson'] },
      { type: 'celebrate', count: 12, users: ['Alex Kim', 'Emily Davis'] },
      { type: 'love', count: 8, users: ['Jennifer Adams'] }
    ],
    comments: [
      {
        id: '1',
        user: {
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
          role: 'Engineering Manager'
        },
        content: 'Outstanding work, Sarah! This is exactly the kind of impact we need.',
        timestamp: '25 minutes ago'
      },
      {
        id: '2',
        user: {
          name: 'Lisa Park',
          role: 'UX Designer'
        },
        content: 'The new login flow feels so smooth! Great job on the implementation.',
        timestamp: '20 minutes ago'
      }
    ],
    tags: ['security', 'launch', 'engineering'],
    visibility: 'everyone'
  },
  {
    id: '2',
    type: 'announcement',
    user: {
      id: '2',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Product',
      role: 'Product Manager'
    },
    content: 'Q4 roadmap meeting scheduled for Thursday at 3 PM. All team leads invited. We\'ll be discussing the exciting features planned for next quarter including the new dashboard redesign and mobile app launch.',
    timestamp: '1 hour ago',
    attachments: [
      {
        type: 'link',
        name: 'Q4 Roadmap - Agenda',
        url: '#'
      }
    ],
    reactions: [
      { type: 'like', count: 15, users: ['Sarah Johnson', 'Emily Davis'] },
      { type: 'insightful', count: 6, users: ['Robert Taylor'] }
    ],
    comments: [
      {
        id: '1',
        user: {
          name: 'Emily Davis',
          role: 'Marketing Manager'
        },
        content: 'Looking forward to seeing the mobile app plans!',
        timestamp: '45 minutes ago'
      }
    ],
    tags: ['roadmap', 'meeting', 'q4'],
    visibility: 'everyone'
  },
  {
    id: '3',
    type: 'celebration',
    user: {
      id: '3',
      name: 'Jennifer Adams',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Human Resources',
      role: 'HR Business Partner'
    },
    content: '🎉 Congratulations to our Employee of the Month winners! This month we\'re celebrating outstanding contributions from our Engineering, Design, and Sales teams. Thank you for going above and beyond!',
    timestamp: '2 hours ago',
    reactions: [
      { type: 'celebrate', count: 32, users: ['Everyone'] },
      { type: 'love', count: 18, users: ['Team leads'] }
    ],
    comments: [
      {
        id: '1',
        user: {
          name: 'Alex Kim',
          role: 'Software Engineer'
        },
        content: 'Well deserved recognition for everyone! 👏',
        timestamp: '1 hour ago'
      }
    ],
    tags: ['celebration', 'recognition', 'employee-of-month'],
    visibility: 'everyone'
  },
  {
    id: '4',
    type: 'question',
    user: {
      id: '4',
      name: 'Alex Kim',
      department: 'Engineering',
      role: 'Software Engineer'
    },
    content: 'Has anyone worked with the new GraphQL API endpoints? I\'m running into some caching issues with Apollo Client and could use some guidance. Any tips or best practices?',
    timestamp: '3 hours ago',
    reactions: [
      { type: 'like', count: 8, users: ['Sarah Johnson'] }
    ],
    comments: [
      {
        id: '1',
        user: {
          name: 'Sarah Johnson',
          role: 'Senior Developer'
        },
        content: 'I faced similar issues last week. Try using the fetchPolicy: "cache-and-network" option. I can share some code examples if needed!',
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        user: {
          name: 'Mike Chen',
          role: 'Engineering Manager'
        },
        content: 'Great question! Let\'s schedule a quick knowledge sharing session on GraphQL best practices.',
        timestamp: '2 hours ago'
      }
    ],
    tags: ['graphql', 'help', 'apollo', 'engineering'],
    visibility: 'department'
  },
  {
    id: '5',
    type: 'document',
    user: {
      id: '5',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
      department: 'Design',
      role: 'UX Designer'
    },
    content: 'Published the updated design system guidelines and component library v2.0! 🎨 This includes new accessibility standards, dark mode support, and 15 new components. Check it out and let me know your thoughts!',
    timestamp: '4 hours ago',
    attachments: [
      {
        type: 'document',
        name: 'Design System v2.0.pdf',
        url: '#'
      },
      {
        type: 'link',
        name: 'Component Library - Figma',
        url: '#'
      }
    ],
    reactions: [
      { type: 'love', count: 22, users: ['Design team', 'Engineering team'] },
      { type: 'insightful', count: 14, users: ['Product team'] }
    ],
    comments: [
      {
        id: '1',
        user: {
          name: 'David Wilson',
          role: 'Product Manager'
        },
        content: 'This looks fantastic! The dark mode components are exactly what we needed.',
        timestamp: '3 hours ago'
      }
    ],
    tags: ['design-system', 'documentation', 'components'],
    visibility: 'everyone'
  }
]

export function TeamFeedDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [posts] = React.useState(mockTeamPosts)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [newPost, setNewPost] = React.useState("")
  const [showNewPost, setShowNewPost] = React.useState(false)

  const getPostTypeIcon = (type: TeamPost['type']) => {
    switch (type) {
      case 'achievement':
        return '🏆'
      case 'announcement':
        return '📢'
      case 'celebration':
        return '🎉'
      case 'question':
        return '❓'
      case 'document':
        return '📄'
      case 'status':
      default:
        return '💬'
    }
  }

  const getPostTypeColor = (type: TeamPost['type']) => {
    switch (type) {
      case 'achievement':
        return 'bg-warning/10 text-warning-foreground border border-warning/20'
      case 'announcement':
        return 'bg-info/10 text-info-foreground border border-info/20'
      case 'celebration':
        return 'bg-success/10 text-success-foreground border border-success/20'
      case 'question':
        return 'bg-accent/10 text-accent-foreground border border-accent/20'
      case 'document':
        return 'bg-secondary/10 text-secondary-foreground border border-secondary/20'
      case 'status':
      default:
        return 'bg-muted/10 text-muted-foreground border border-muted/20'
    }
  }

  const getReactionEmoji = (type: string) => {
    switch (type) {
      case 'like':
        return '👍'
      case 'love':
        return '❤️'
      case 'celebrate':
        return '🎉'
      case 'insightful':
        return '💡'
      default:
        return '👍'
    }
  }

  const filteredPosts = React.useMemo(() => {
    let filtered = posts

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [posts, searchQuery])

  const PostCard = ({ post }: { post: TeamPost }) => (
    <div className="border rounded-lg p-10 hover:shadow-md transition-all bg-card">
      <div className="flex items-start gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
              {post.user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {post.isImportant && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
              <Star className="h-2.5 w-2.5 text-white fill-current" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.user.name}</span>
              <Badge variant="outline" className="text-xs">
                {post.user.role}
              </Badge>
              <Badge className={`text-xs ${getPostTypeColor(post.type)}`}>
                {getPostTypeIcon(post.type)} {post.type}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.timestamp}</span>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </p>
          </div>

          {post.attachments && post.attachments.length > 0 && (
            <div className="mb-4 space-y-2">
              {post.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  {attachment.type === 'document' && <FileText className="h-5 w-5 text-info" />}
                  {attachment.type === 'image' && <ImageIcon className="h-5 w-5 text-success" />}
                  {attachment.type === 'link' && <Share2 className="h-5 w-5 text-accent" />}
                  <span className="font-medium text-sm">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {post.reactions.map((reaction, index) => (
                <Button key={index} variant="ghost" size="sm" className="h-auto p-1 hover:bg-muted/50">
                  <span className="mr-1">{getReactionEmoji(reaction.type)}</span>
                  <span className="text-sm">{reaction.count}</span>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Reply className="h-4 w-4 mr-1" />
                {post.comments.length}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {post.comments.length > 0 && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback className="text-xs">
                      {comment.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
              {post.comments.length > 2 && (
                <Button variant="ghost" size="sm" className="text-xs">
                  View {post.comments.length - 2} more comments
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Dialog 
      open={isDialogOpen('team-feed')} 
      onOpenChange={(open) => !open && closeDialog('team-feed')}
    >
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">Team Feed</DialogTitle>
                <DialogDescription>
                  Stay connected with your team&apos;s latest updates and conversations
                </DialogDescription>
              </div>
            </div>
            
            <Button onClick={() => setShowNewPost(!showNewPost)}>
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="all" className="h-full flex flex-col">
            <div className="px-8 pb-6 flex-shrink-0">
              <div className="flex items-center justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="achievement">Achievements</TabsTrigger>
                  <TabsTrigger value="announcement">Announcements</TabsTrigger>
                  <TabsTrigger value="question">Questions</TabsTrigger>
                  <TabsTrigger value="celebration">Celebrations</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* New Post Composer */}
              {showNewPost && (
                <div className="border rounded-lg p-8 mb-8 bg-muted/30 flex-shrink-0">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <textarea
                        placeholder="What's on your mind? Share an update, ask a question, or celebrate a win..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none bg-background"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="h-4 w-4 mr-1" />
                            Attach
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ImageIcon className="h-4 w-4 mr-1" />
                            Image
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            Video
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowNewPost(false)}>
                            Cancel
                          </Button>
                          <Button size="sm" disabled={!newPost.trim()}>
                            <Send className="h-4 w-4 mr-1" />
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <TabsContent value="all" className="flex-1 overflow-auto m-0 px-8 pb-8">
              <div className="space-y-10">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No posts found</p>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? 'Try adjusting your search terms' : 'Be the first to share something!'}
                    </p>
                    <Button onClick={() => setShowNewPost(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Create First Post
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} posts • Team collaboration feed
            </div>
            <Button variant="outline" onClick={() => closeDialog('team-feed')}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}