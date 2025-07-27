"use client"

import * as React from "react"
import { 
  Search,
  Calendar,
  Users,
  FileText,
  Settings,
  Home,
  MessageSquare,
  Clock,
  Star,
  BookOpen,
  Shield,
  Activity,
  ChevronRight,
  Command as CommandIcon,
  Heart
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface CommandAction {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: 'navigation' | 'actions' | 'dialogs' | 'recent'
  keywords?: string[]
  shortcut?: string
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const { openDialog } = useDialog()
  const { toast } = useToast()

  // Keyboard shortcut handler  
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Mock recent items - in real app, this would come from user history/localStorage
  const recentItems = [
    { id: 'recent-1', title: 'Employee Directory', action: () => openDialog('directory') },
    { id: 'recent-2', title: 'Team Calendar', action: () => openDialog('calendar') },
    { id: 'recent-3', title: 'Service Desk', action: () => openDialog('service-desk') },
  ]

  const commands: CommandAction[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      description: 'Return to main dashboard',
      icon: Home,
      category: 'navigation',
      action: () => {
        toast({ title: "Dashboard", description: "Already on dashboard" })
        setOpen(false)
      },
      shortcut: '⌘D'
    },
    {
      id: 'nav-settings',
      title: 'Settings',
      description: 'Customize your preferences',
      icon: Settings,
      category: 'navigation',
      action: () => {
        openDialog('settings')
        setOpen(false)
      },
      shortcut: '⌘,'
    },

    // Dialogs
    {
      id: 'open-directory',
      title: 'Employee Directory',
      description: 'Search and find colleagues',
      icon: Users,
      category: 'dialogs',
      keywords: ['employee', 'people', 'contacts', 'directory'],
      action: () => {
        openDialog('directory')
        setOpen(false)
      }
    },
    {
      id: 'open-calendar',
      title: 'Calendar',
      description: 'View events and schedule',
      icon: Calendar,
      category: 'dialogs',
      keywords: ['calendar', 'events', 'schedule', 'meetings'],
      action: () => {
        openDialog('calendar')
        setOpen(false)
      }
    },
    {
      id: 'open-service-desk',
      title: 'Service Desk',
      description: 'IT support and tickets',
      icon: Shield,
      category: 'dialogs',
      keywords: ['support', 'help', 'ticket', 'it'],
      action: () => {
        openDialog('service-desk')
        setOpen(false)
      }
    },
    {
      id: 'open-knowledge-base',
      title: 'Knowledge Base',
      description: 'Documentation and guides',
      icon: BookOpen,
      category: 'dialogs',
      keywords: ['docs', 'documentation', 'knowledge', 'guides', 'help'],
      action: () => {
        openDialog('knowledge-base')
        setOpen(false)
      }
    },
    {
      id: 'open-project-management',
      title: 'Project Management',
      description: 'Tasks and project tracking',
      icon: Activity,
      category: 'dialogs',
      keywords: ['projects', 'tasks', 'management', 'tracking'],
      action: () => {
        openDialog('project-management')
        setOpen(false)
      }
    },
    {
      id: 'open-team-feed',
      title: 'Team Feed',
      description: 'Company news and updates',
      icon: MessageSquare,
      category: 'dialogs',
      keywords: ['news', 'updates', 'announcements', 'feed'],
      action: () => {
        openDialog('team-feed')
        setOpen(false)
      }
    },
    {
      id: 'open-employee-portal',
      title: 'Employee Portal',
      description: 'HR, benefits, and payroll',
      icon: Users,
      category: 'dialogs',
      keywords: ['hr', 'benefits', 'payroll', 'employee'],
      action: () => {
        openDialog('employee-portal')
        setOpen(false)
      }
    },
    {
      id: 'open-time-tracking',
      title: 'Time Tracking',
      description: 'Log hours and expenses',
      icon: Clock,
      category: 'dialogs',
      keywords: ['time', 'hours', 'tracking', 'expenses'],
      action: () => {
        openDialog('time-tracking')
        setOpen(false)
      }
    },
    {
      id: 'open-team-spaces',
      title: 'Team Spaces',
      description: 'Department teams and resources',
      icon: Users,
      category: 'dialogs',
      keywords: ['team', 'spaces', 'department', 'resources'],
      action: () => {
        openDialog('team-spaces')
        setOpen(false)
      }
    },
    {
      id: 'open-wellness-hub',
      title: 'Wellness Hub',
      description: 'Health challenges and mental wellness',
      icon: Heart,
      category: 'dialogs',
      keywords: ['wellness', 'health', 'fitness', 'mental', 'challenges'],
      action: () => {
        openDialog('wellness-hub')
        setOpen(false)
      }
    },

    // Actions
    {
      id: 'action-new-task',
      title: 'Create New Task',
      description: 'Add a task to your board',
      icon: Star,
      category: 'actions',
      keywords: ['task', 'todo', 'create', 'add'],
      action: () => {
        toast({
          title: "New Task",
          description: "Opening task creation form...",
        })
        setOpen(false)
      }
    },
    {
      id: 'action-quick-note',
      title: 'Quick Note',
      description: 'Jot down a quick note',
      icon: FileText,
      category: 'actions',
      keywords: ['note', 'memo', 'write'],
      action: () => {
        openDialog('quick-note')
        toast({
          title: "Quick Note opened",
          description: "Start jotting down your thoughts and ideas",
        })
        setOpen(false)
      }
    },
    {
      id: 'action-book-room',
      title: 'Book Meeting Room',
      description: 'Reserve a conference room',
      icon: Calendar,
      category: 'actions',
      keywords: ['book', 'room', 'meeting', 'reserve'],
      action: () => {
        openDialog('resource-booking')
        setOpen(false)
      }
    }
  ]

  const navigationCommands = commands.filter(cmd => cmd.category === 'navigation')
  const dialogCommands = commands.filter(cmd => cmd.category === 'dialogs')
  const actionCommands = commands.filter(cmd => cmd.category === 'actions')

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        className="border-0 focus:ring-0 text-base"
      />
      <CommandList className="max-h-96">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-8">
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No results found.</p>
          </div>
        </CommandEmpty>

        {/* Recent Items */}
        {recentItems.length > 0 && (
          <CommandGroup heading="Recent">
            {recentItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  item.action()
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1">{item.title}</span>
                <Badge variant="secondary" className="text-xs">Recent</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          {navigationCommands.map((command) => {
            const Icon = command.icon
            return (
              <CommandItem
                key={command.id}
                onSelect={command.action}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50"
              >
                <div className="p-1.5 rounded-md bg-info dark:bg-info/30">
                  <Icon className="h-4 w-4 text-info-foreground dark:text-info-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{command.title}</div>
                  {command.description && (
                    <div className="text-xs text-muted-foreground">{command.description}</div>
                  )}
                </div>
                {command.shortcut && (
                  <Badge variant="outline" className="text-xs font-mono">
                    {command.shortcut}
                  </Badge>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        {/* Applications & Dialogs */}
        <CommandGroup heading="Applications">
          {dialogCommands.map((command) => {
            const Icon = command.icon
            return (
              <CommandItem
                key={command.id}
                onSelect={command.action}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50"
                keywords={command.keywords}
              >
                <div className="p-1.5 rounded-md bg-success/10">
                  <Icon className="h-4 w-4 text-success-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{command.title}</div>
                  {command.description && (
                    <div className="text-xs text-muted-foreground">{command.description}</div>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          {actionCommands.map((command) => {
            const Icon = command.icon
            return (
              <CommandItem
                key={command.id}
                onSelect={command.action}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50"
                keywords={command.keywords}
              >
                <div className="p-1.5 rounded-md bg-secondary/50">
                  <Icon className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{command.title}</div>
                  {command.description && (
                    <div className="text-xs text-muted-foreground">{command.description}</div>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
      
      {/* Footer with keyboard hint */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CommandIcon className="h-3 w-3" />
          <span>Use ⌘K to open command palette</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">↑</span>
            <span className="text-xs">↓</span>
          </kbd>
          <span>to navigate</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ↵
          </kbd>
          <span>to select</span>
        </div>
      </div>
    </CommandDialog>
  )
}