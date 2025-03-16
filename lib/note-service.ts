"use client"

import type { Note, Category, Tag, HistoryEntry } from "@/lib/types"

// In a real app, this would be an API call to a backend
// For demo purposes, we'll use localStorage

export function getNotes(): Note[] {
  if (typeof window === "undefined") return []

  const notes = localStorage.getItem("notes")
  return notes ? JSON.parse(notes) : []
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem("notes", JSON.stringify(notes))
}

export function getNote(id: string): Note | undefined {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

export function createNote(
  title: string,
  content: string,
  category: Category,
  tags: Tag[],
  creatorId: string,
  creatorName: string,
): Note {
  const now = new Date().toISOString()
  const newNote: Note = {
    id: `note-${Date.now()}`,
    title,
    content,
    createdAt: now,
    updatedAt: now,
    category,
    tags,
    creatorId,
    creatorName,
    history: [
      {
        id: `history-${Date.now()}`,
        timestamp: now,
        content,
      },
    ],
  }

  const notes = getNotes()
  notes.push(newNote)
  saveNotes(notes)

  return newNote
}

export function updateNote(
  id: string,
  updates: Partial<Omit<Note, "id" | "createdAt" | "creatorId" | "creatorName" | "history">>,
): Note | undefined {
  const notes = getNotes()
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) return undefined

  const note = notes[noteIndex]
  const now = new Date().toISOString()

  // If content is updated, add to history
  if (updates.content && updates.content !== note.content) {
    const newHistoryEntry: HistoryEntry = {
      id: `history-${Date.now()}`,
      timestamp: now,
      content: updates.content,
    }

    note.history.push(newHistoryEntry)
  }

  const updatedNote = {
    ...note,
    ...updates,
    updatedAt: now,
  }

  notes[noteIndex] = updatedNote
  saveNotes(notes)

  return updatedNote
}

export function deleteNote(id: string): boolean {
  const notes = getNotes()
  const filteredNotes = notes.filter((note) => note.id !== id)

  if (filteredNotes.length === notes.length) {
    return false
  }

  saveNotes(filteredNotes)
  return true
}

export function getCategories(): Category[] {
  return ["Personal", "Work", "Study", "Health", "Finance", "Travel", "Ideas", "Other"]
}

export function extractTagsFromContent(content: string): Tag[] {
  const tagRegex = /#(\w+)/g
  const matches = content.match(tagRegex)

  if (!matches) return []

  return matches.map((tag) => tag.substring(1))
}

