"use client"

import * as React from "react"

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
  setIsOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true) // Default to open

  // Load sidebar state from localStorage on mount
  React.useEffect(() => {
    const savedState = localStorage.getItem('right-sidebar-open')
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState))
    } else {
      // If no saved state, default to open for desktop
      const isDesktop = window.innerWidth >= 1024
      setIsOpen(isDesktop)
    }
  }, [])

  // Save sidebar state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('right-sidebar-open', JSON.stringify(isOpen))
  }, [isOpen])

  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen])
  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])

  const value = React.useMemo(() => ({
    isOpen,
    toggle,
    open,
    close,
    setIsOpen
  }), [isOpen, toggle, open, close])

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}