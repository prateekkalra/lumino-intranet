"use client"

import { createContext, useContext, useState } from "react"

type DialogType = 
  | 'alerts'
  | 'calendar'
  | 'employee-portal'
  | 'service-desk'
  | 'project-management'
  | 'knowledge-base'
  | 'time-tracking'
  | 'directory'
  | 'team-feed'
  | 'resource-booking'
  | 'settings'
  | 'team-spaces'
  | 'wellness-hub'
  | 'profile'
  | 'help-support'
  | 'quick-note'
  | 'notifications'

interface DialogContextType {
  openDialogs: Set<DialogType>
  openDialog: (dialog: DialogType) => void
  closeDialog: (dialog: DialogType) => void
  isDialogOpen: (dialog: DialogType) => boolean
  closeAllDialogs: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProviderProps {
  children: React.ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [openDialogs, setOpenDialogs] = useState<Set<DialogType>>(new Set())

  const openDialog = (dialog: DialogType) => {
    setOpenDialogs(prev => new Set([...prev, dialog]))
  }

  const closeDialog = (dialog: DialogType) => {
    setOpenDialogs(prev => {
      const newSet = new Set(prev)
      newSet.delete(dialog)
      return newSet
    })
  }

  const isDialogOpen = (dialog: DialogType) => {
    return openDialogs.has(dialog)
  }

  const closeAllDialogs = () => {
    setOpenDialogs(new Set())
  }

  return (
    <DialogContext.Provider value={{
      openDialogs,
      openDialog,
      closeDialog,
      isDialogOpen,
      closeAllDialogs
    }}>
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}