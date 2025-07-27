"use client"

import * as React from "react"
import { 
  Plus, 
  StickyNote, 
  MessageSquarePlus, 
  HelpCircle,
  X,
  Sparkles
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface FABAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  color?: string
}

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const { openDialog } = useDialog()
  const { toast } = useToast()

  const actions: FABAction[] = [
    {
      id: 'quick-note',
      label: 'Quick Note',
      icon: StickyNote,
      color: 'bg-primary hover:bg-primary/90',
      onClick: () => {
        openDialog('quick-note')
        toast({
          title: "Quick Note opened",
          description: "Start jotting down your thoughts and ideas",
        })
        setIsExpanded(false)
      }
    },
    {
      id: 'new-post',
      label: 'New Post',
      icon: MessageSquarePlus,
      color: 'bg-secondary hover:bg-secondary/90',
      onClick: () => {
        openDialog('team-feed')
        setIsExpanded(false)
      }
    },
    {
      id: 'help-support',
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'bg-accent hover:bg-accent/90',
      onClick: () => {
        openDialog('service-desk')
        setIsExpanded(false)
      }
    }
  ]

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-4">
        {/* Action buttons */}
        {isExpanded && (
          <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <Tooltip key={action.id}>
                  <TooltipTrigger asChild>
                    <Button
                      size="lg"
                      className={`h-12 w-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl ${
                        action.color || 'bg-primary hover:bg-primary/90'
                      } text-white border-0`}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                      onClick={action.onClick}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{action.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="mr-4">
                    <p className="font-medium">{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        )}

        {/* Main FAB button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl ${
                isExpanded 
                  ? 'bg-destructive hover:bg-destructive/90 rotate-45' 
                  : 'bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90'
              } text-white border-0 group`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <X className="h-6 w-6 transition-transform duration-300" />
              ) : (
                <>
                  <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse opacity-80" />
                </>
              )}
              <span className="sr-only">
                {isExpanded ? 'Close menu' : 'Quick actions'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mr-4">
            <p className="font-medium">
              {isExpanded ? 'Close menu' : 'Quick actions'}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Click outside to close */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </TooltipProvider>
  )
}