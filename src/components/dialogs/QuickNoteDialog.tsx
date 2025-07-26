"use client"

import * as React from "react"
import { 
  StickyNote, 
  Plus, 
  Search, 
  Trash2,
  Save,
  Clock
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDialog } from "@/contexts/DialogContext"
import { useToast } from "@/components/ui/use-toast"

interface Note {
  id: string
  title: string
  content: string
  category: 'personal' | 'work' | 'meeting' | 'idea' | 'todo'
  createdAt: string
  updatedAt: string
  tags: string[]
}

const defaultCategories = [
  { value: 'personal', label: 'Personal', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'work', label: 'Work', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'meeting', label: 'Meeting', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { value: 'idea', label: 'Idea', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'todo', label: 'To Do', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
]

const STORAGE_KEY = 'office-intranet-quick-notes'

export function QuickNoteDialog() {
  const { isDialogOpen, closeDialog } = useDialog()
  const { toast } = useToast()
  
  const [notes, setNotes] = React.useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isEditing, setIsEditing] = React.useState(false)
  const [editingNote, setEditingNote] = React.useState<Partial<Note>>({
    title: '',
    content: '',
    category: 'personal',
    tags: []
  })

  // Load notes from localStorage on mount
  React.useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY)
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error('Failed to parse saved notes:', error)
      }
    }
  }, [])

  // Save notes to localStorage whenever notes change
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const createNewNote = () => {
    setEditingNote({
      title: '',
      content: '',
      category: 'personal',
      tags: []
    })
    setSelectedNoteId(null)
    setIsEditing(true)
  }

  const saveNote = () => {
    if (!editingNote.title?.trim() && !editingNote.content?.trim()) {
      toast({
        title: "Note is empty",
        description: "Please add a title or content before saving",
        variant: "destructive"
      })
      return
    }

    const now = new Date().toISOString()
    
    if (selectedNoteId) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === selectedNoteId 
          ? { 
              ...note, 
              title: editingNote.title || 'Untitled',
              content: editingNote.content || '',
              category: editingNote.category || 'personal',
              tags: editingNote.tags || [],
              updatedAt: now
            }
          : note
      ))
      toast({
        title: "Note updated",
        description: "Your changes have been saved"
      })
    } else {
      // Create new note
      const newNote: Note = {
        id: `note-${Date.now()}`,
        title: editingNote.title || 'Untitled',
        content: editingNote.content || '',
        category: editingNote.category as Note['category'] || 'personal',
        tags: editingNote.tags || [],
        createdAt: now,
        updatedAt: now
      }
      setNotes(prev => [newNote, ...prev])
      setSelectedNoteId(newNote.id)
      toast({
        title: "Note created",
        description: "Your note has been saved"
      })
    }
    
    setIsEditing(false)
  }

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null)
      setIsEditing(false)
    }
    toast({
      title: "Note deleted",
      description: "The note has been removed"
    })
  }

  const selectNote = (note: Note) => {
    setSelectedNoteId(note.id)
    setEditingNote(note)
    setIsEditing(false)
  }

  const editNote = () => {
    setIsEditing(true)
  }

  const cancelEdit = () => {
    if (selectedNoteId) {
      const originalNote = notes.find(n => n.id === selectedNoteId)
      if (originalNote) {
        setEditingNote(originalNote)
      }
    } else {
      setEditingNote({
        title: '',
        content: '',
        category: 'personal',
        tags: []
      })
    }
    setIsEditing(false)
  }

  const filteredNotes = React.useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [notes, searchQuery])

  const selectedNote = selectedNoteId ? notes.find(n => n.id === selectedNoteId) : null
  const getCategoryInfo = (category: string) => defaultCategories.find(c => c.value === category)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Dialog 
      open={isDialogOpen('quick-note')} 
      onOpenChange={(open) => !open && closeDialog('quick-note')}
    >
      <DialogContent className="max-w-6xl max-h-[90vh] w-full h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
                <StickyNote className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <DialogTitle className="text-xl">Quick Notes</DialogTitle>
                <DialogDescription>
                  Jot down your thoughts, ideas, and reminders
                </DialogDescription>
              </div>
            </div>
            
            <Button onClick={createNewNote}>
              <Plus className="h-4 w-4 mr-1" />
              New Note
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex">
          {/* Notes List Sidebar */}
          <div className="w-80 border-r bg-muted/30 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-2">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-8">
                  <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'No notes found' : 'No notes yet'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {searchQuery ? 'Try a different search term' : 'Click "New Note" to get started'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredNotes.map((note) => {
                    const categoryInfo = getCategoryInfo(note.category)
                    return (
                      <div
                        key={note.id}
                        onClick={() => selectNote(note)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                          selectedNoteId === note.id 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-background hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-sm truncate">
                            {note.title || 'Untitled'}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNote(note.id)
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {note.content || 'No content'}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${categoryInfo?.color}`}>
                            {categoryInfo?.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(note.updatedAt).split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="flex-1 flex flex-col">
            {selectedNote || isEditing ? (
              <>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedNote ? `Last updated: ${formatDate(selectedNote.updatedAt)}` : 'New note'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" size="sm" onClick={cancelEdit}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={saveNote}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" onClick={editNote}>
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Note title..."
                        value={editingNote.title || ''}
                        onChange={(e) => setEditingNote(prev => ({ ...prev, title: e.target.value }))}
                        className="text-lg font-medium"
                      />
                      <Select 
                        value={editingNote.category || 'personal'} 
                        onValueChange={(value) => setEditingNote(prev => ({ ...prev, category: value as Note['category'] }))}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {defaultCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h2 className="text-lg font-medium">{selectedNote?.title || 'Untitled'}</h2>
                      <Badge className={`${getCategoryInfo(selectedNote?.category || 'personal')?.color}`}>
                        {getCategoryInfo(selectedNote?.category || 'personal')?.label}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6">
                  {isEditing ? (
                    <Textarea
                      placeholder="Start writing your note..."
                      value={editingNote.content || ''}
                      onChange={(e) => setEditingNote(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full h-full resize-none border-0 focus-visible:ring-0 text-base leading-relaxed"
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-base leading-relaxed">
                      {selectedNote?.content || 'No content'}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <StickyNote className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a note to view</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a note from the sidebar or create a new one
                  </p>
                  <Button onClick={createNewNote}>
                    <Plus className="h-4 w-4 mr-1" />
                    Create Your First Note
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} • Auto-saved locally
            </div>
            <Button variant="outline" onClick={() => closeDialog('quick-note')}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}