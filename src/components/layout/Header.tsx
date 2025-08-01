"use client"

import * as React from "react"
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  CheckCheck,
  Eye,
  Clock,
  MessageSquare,
  Calendar,
  FileText,
  Award,
  PanelRightOpen,
  PanelRightClose,
  Command
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SearchResults } from "@/components/ui/search-results"
import { useSidebar } from "@/contexts/SidebarContext"
import { useDialog } from "@/contexts/DialogContext"
import { searchService } from "@/lib/searchService"
import { SearchResult } from "@/types/search"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  type: 'message' | 'calendar' | 'system' | 'achievement'
  icon: React.ComponentType<{ className?: string }>
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message about the Q4 project updates.',
    timestamp: '5 min ago',
    isRead: false,
    type: 'message',
    icon: MessageSquare
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    message: 'Team standup meeting starts in 15 minutes in Conference Room A.',
    timestamp: '10 min ago',
    isRead: false,
    type: 'calendar',
    icon: Calendar
  },
  {
    id: '3',
    title: 'Document Shared',
    message: 'Mike Chen shared "Marketing Strategy 2024" with your team.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'system',
    icon: FileText
  },
  {
    id: '4',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You\'ve completed 50 tasks this month.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'achievement',
    icon: Award
  }
]

export function Header() {
  const [searchValue, setSearchValue] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false)
  const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useSidebar()
  const { openDialog } = useDialog()
  
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Search functionality
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  // Debounced search function
  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchValue.trim()) {
      setIsSearching(true)
      setIsSearchOpen(true)
      
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchService.search({
            query: searchValue,
            limit: 10
          })
          setSearchResults(results)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }, 300) // 300ms debounce
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
      setIsSearching(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchValue])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      
      // Escape to close search
      if (e.key === 'Escape' && isSearchOpen) {
        handleClearSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.action) {
      result.action()
    }
    handleClearSearch()
  }

  const handleClearSearch = () => {
    setSearchValue("")
    setSearchResults([])
    setIsSearchOpen(false)
    setIsMobileSearchOpen(false)
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
    if (!isMobileSearchOpen) {
      // Focus search input when opening mobile search
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-blue-600 to-orange-600">
              <span className="text-sm font-bold text-white">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-orange-600 bg-clip-text text-transparent">
              Lumino
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search everything... (⌘K)"
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 w-full bg-muted/50 focus:bg-background transition-colors"
              onFocus={() => searchValue && setIsSearchOpen(true)}
            />
            
            {/* Desktop Search Results */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50">
                <SearchResults
                  results={searchResults}
                  query={searchValue}
                  isLoading={isSearching}
                  onResultClick={handleResultClick}
                  onClearSearch={handleClearSearch}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-9 w-9"
            onClick={toggleMobileSearch}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full hover:bg-muted transition-colors"
                  onClick={() => {
                    if (!isNotificationsOpen && unreadCount > 0) {
                      // Mark all as read when opening notifications
                      setNotifications(prev => 
                        prev.map(n => ({ ...n, isRead: true }))
                      )
                    }
                  }}
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-medium animate-pulse"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setNotifications(prev => 
                        prev.map(n => ({ ...n, isRead: true }))
                      )
                    }}
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-96">
                <div className="p-2">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon
                        return (
                          <div 
                            key={notification.id} 
                            className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${
                              !notification.isRead ? 'bg-muted/30 border-primary/20' : 'border-transparent'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-1.5 rounded-full ${
                                notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                                notification.type === 'calendar' ? 'bg-green-100 text-green-600' :
                                notification.type === 'system' ? 'bg-orange-100 text-orange-600' :
                                'bg-purple-100 text-purple-600'
                              }`}>
                                <IconComponent className="h-3 w-3" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">{notification.message}</p>
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </ScrollArea>
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full h-8 text-xs"
                    onClick={() => {
                      openDialog('notifications')
                      setIsNotificationsOpen(false)
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View all notifications
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Right Sidebar Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-9 w-9 rounded-full hover:bg-muted transition-colors"
            title={isSidebarOpen ? "Close activity panel" : "Open activity panel"}
          >
            {isSidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle activity panel</span>
          </Button>

          {/* User Profile Menu */}
          <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-muted transition-colors">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" 
                      alt="User avatar" 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary via-blue-600 to-orange-600 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  {/* Online status indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                </div>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64" sideOffset={8}>
              <DropdownMenuLabel className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" 
                      alt="User avatar" 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary via-blue-600 to-orange-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@lumino.com</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {
                  openDialog('profile')
                  setIsUserMenuOpen(false)
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
                <span className="ml-auto text-xs text-muted-foreground">⌘P</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {
                  openDialog('settings')
                  setIsUserMenuOpen(false)
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <span className="ml-auto text-xs text-muted-foreground">⌘,</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => {
                  openDialog('help-support')
                  setIsUserMenuOpen(false)
                }}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
                <span className="ml-auto text-xs text-muted-foreground">⌘?</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
                <span className="ml-auto text-xs text-muted-foreground">⌘Q</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-border/40 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search everything..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 w-full bg-muted/50 focus:bg-background transition-colors"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2"
              onClick={handleClearSearch}
            >
              <Command className="h-3 w-3 mr-1" />
              ESC
            </Button>
          </div>
          
          {/* Mobile Search Results */}
          {(isSearchOpen || searchValue) && (
            <div className="mt-2 bg-background border rounded-lg shadow-lg">
              <SearchResults
                results={searchResults}
                query={searchValue}
                isLoading={isSearching}
                onResultClick={handleResultClick}
                onClearSearch={handleClearSearch}
              />
            </div>
          )}
        </div>
      )}
    </header>
  )
}