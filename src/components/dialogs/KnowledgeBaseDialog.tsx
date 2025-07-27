"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDialog } from "@/contexts/DialogContext"
import { useState } from "react"
import { 
  BookOpen, 
  Search, 
  Filter,
  Star,
  Eye,
  Clock,
  ChevronRight,
  Share,
  Bookmark,
  TrendingUp,
  FileText
} from "lucide-react"

const mockCategories = [
  {
    id: "cat-1",
    name: "Getting Started",
    description: "New employee guides and basic procedures",
    articleCount: 15,
    icon: "🚀",
    subcategories: ["Onboarding", "First Day", "Accounts Setup"]
  },
  {
    id: "cat-2", 
    name: "IT Support",
    description: "Technical help and troubleshooting guides",
    articleCount: 32,
    icon: "💻",
    subcategories: ["Hardware", "Software", "Network", "Security"]
  },
  {
    id: "cat-3",
    name: "HR Policies",
    description: "Company policies and employee benefits",
    articleCount: 28,
    icon: "👥",
    subcategories: ["Benefits", "Time Off", "Performance", "Code of Conduct"]
  },
  {
    id: "cat-4",
    name: "Processes",
    description: "Workflows and standard operating procedures", 
    articleCount: 41,
    icon: "⚙️",
    subcategories: ["Finance", "Marketing", "Sales", "Operations"]
  }
]

const mockArticles = [
  {
    id: "art-1",
    title: "How to Set Up Your Development Environment",
    category: "Getting Started",
    description: "Complete guide to setting up your local development environment with all necessary tools and configurations.",
    author: "John Smith",
    lastUpdated: "2024-01-15",
    views: 1247,
    rating: 4.8,
    readTime: "8 min",
    tags: ["development", "setup", "tools"],
    isFavorite: false
  },
  {
    id: "art-2",
    title: "VPN Setup and Troubleshooting",
    category: "IT Support", 
    description: "Step-by-step instructions for connecting to the company VPN and resolving common connection issues.",
    author: "Sarah Johnson", 
    lastUpdated: "2024-01-12",
    views: 892,
    rating: 4.6,
    readTime: "5 min",
    tags: ["vpn", "network", "security"],
    isFavorite: true
  },
  {
    id: "art-3",
    title: "Time Off Request Process",
    category: "HR Policies",
    description: "Learn how to request time off, understand approval workflows, and know your entitlements.",
    author: "Lisa Chen",
    lastUpdated: "2024-01-10", 
    views: 654,
    rating: 4.9,
    readTime: "3 min",
    tags: ["timeoff", "hr", "benefits"],
    isFavorite: false
  },
  {
    id: "art-4",
    title: "Project Budget Approval Workflow",
    category: "Processes",
    description: "Understanding the steps and requirements for getting project budgets approved.",
    author: "Mike Wilson",
    lastUpdated: "2024-01-08",
    views: 423,
    rating: 4.3,
    readTime: "6 min", 
    tags: ["budget", "finance", "approval"],
    isFavorite: true
  }
]

const mockRecentArticles = [
  { id: "art-1", title: "How to Set Up Your Development Environment", readAt: "2 hours ago" },
  { id: "art-2", title: "VPN Setup and Troubleshooting", readAt: "1 day ago" },
  { id: "art-5", title: "Company Security Guidelines", readAt: "3 days ago" }
]

const mockFavorites = mockArticles.filter(article => article.isFavorite)

export function KnowledgeBaseDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={isDialogOpen('knowledge-base')} onOpenChange={() => closeDialog('knowledge-base')}>
      <DialogContent className="max-w-[90vw] max-h-[95vh] w-full h-[95vh] p-0 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Knowledge Base
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Popular Articles</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {mockArticles.slice(0, 6).map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{article.title}</h4>
                          {article.isFavorite && <Star className="w-4 h-4 text-warning fill-current" />}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {article.rating}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 flex-wrap">
                {["remote work", "security", "onboarding", "vpn", "benefits", "development", "policies"].map((topic) => (
                  <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    #{topic}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search articles, guides, and documentation..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>Search</Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant={selectedCategory === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories
                </Button>
                {mockCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {searchTerm && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {filteredArticles.length} results for "{searchTerm}"
                  </h4>
                </div>

                <div className="grid gap-3">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <h5 className="font-medium">{article.title}</h5>
                            <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="secondary">{article.category}</Badge>
                              <span>By {article.author}</span>
                              <span>{article.readTime} read</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!searchTerm && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Search Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {["How to reset password", "VPN troubleshooting", "Time off policy", "Expense reporting", "Security guidelines", "Remote work setup"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        onClick={() => setSearchTerm(suggestion)}
                      >
                        <Search className="w-3 h-3 mr-2" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recently Viewed</h3>
              <Button variant="outline" size="sm">Clear History</Button>
            </div>

            <div className="grid gap-3">
              {mockRecentArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <h5 className="font-medium">{article.title}</h5>
                          <p className="text-sm text-muted-foreground">Viewed {article.readAt}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockRecentArticles.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">No recent articles</h4>
                  <p className="text-sm text-muted-foreground">
                    Articles you view will appear here for quick access
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Bookmarked Articles</h3>
              <span className="text-sm text-muted-foreground">{mockFavorites.length} articles</span>
            </div>

            <div className="grid gap-3">
              {mockFavorites.map((article) => (
                <Card key={article.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <h5 className="font-medium">{article.title}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span>By {article.author}</span>
                          <span>{article.readTime} read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockFavorites.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <h4 className="font-medium mb-1">No bookmarked articles</h4>
                  <p className="text-sm text-muted-foreground">
                    Bookmark articles to save them for later reading
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Browse by Category</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{category.articleCount} articles</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-1 flex-wrap">
                      {category.subcategories.map((subcategory) => (
                        <Badge key={subcategory} variant="outline" className="text-xs">
                          {subcategory}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">116</div>
                    <div className="text-sm text-muted-foreground">Total Articles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.7</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2.3k</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
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