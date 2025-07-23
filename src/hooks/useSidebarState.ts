import { useState, useEffect } from 'react'

export function useSidebarState() {
  const [isOpen, setIsOpen] = useState(false)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('right-sidebar-open')
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState))
    }
  }, [])

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('right-sidebar-open', JSON.stringify(isOpen))
  }, [isOpen])

  const toggle = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    toggle,
    open,
    close,
    setIsOpen
  }
}