"use client"

import type { Note, Category, Tag, HistoryEntry } from "@/lib/types"

// In a real app, this would be an API call to a backend
// For demo purposes, we'll use localStorage

const MAX_HISTORY_LENGTH = 10 // Set a maximum length for history entries

// Fetch all notes from localStorage
export function getNotes(): Note[] {
  if (typeof window === "undefined") return [] // Ensure window is available
  const notes = localStorage.getItem("notes")
  return notes ? JSON.parse(notes) : [] // Parse if notes exist
}

// Save notes to localStorage
export function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return // Ensure window is available
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Get a specific note by ID
export function getNote(id: string): Note | undefined {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

// Create a new note
export function createNote(
  title: string,
  content: string,
  category: Category,
  tags: Tag[],
  creatorId: string,
  creatorName: string,
): Note | undefined {
  if (!title || !content) {
    console.error("Title and content are required to create a note.")
    return undefined
  }

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
  notes.push(newNote) // Add the new note to the list
  saveNotes(notes) // Save the updated list to localStorage

  return newNote
}

// Update an existing note
export function updateNote(
  id: string,
  updates: Partial<Omit<Note, "id" | "createdAt" | "creatorId" | "creatorName" | "history">>, // Only update fields excluding id, createdAt, creatorId, creatorName, and history
): Note | undefined {
  const notes = getNotes()
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) return undefined // Return undefined if note not found

  const note = notes[noteIndex]
  const now = new Date().toISOString()

  // If content is updated, add to history
  if (updates.content && updates.content !== note.content) {
    const newHistoryEntry: HistoryEntry = {
      id: `history-${Date.now()}`, // Unique history entry ID
      timestamp: now,
      content: updates.content,
    }

    note.history.push(newHistoryEntry) // Add new history entry

    // Limit history length to the last MAX_HISTORY_LENGTH entries
    if (note.history.length > MAX_HISTORY_LENGTH) {
      note.history = note.history.slice(-MAX_HISTORY_LENGTH)
    }
  }

  // Merge the updates into the note and update the timestamp
  const updatedNote = {
    ...note,
    ...updates,
    updatedAt: now,
  }

  notes[noteIndex] = updatedNote // Replace the updated note in the array
  saveNotes(notes) // Save the updated notes list

  return updatedNote
}

// Delete a note by ID
export function deleteNote(id: string): boolean {
  const notes = getNotes()

  // Filter out the note to delete
  const filteredNotes = notes.filter((note) => note.id !== id)

  // If the length is the same, the note wasn't found
  if (filteredNotes.length === notes.length) {
    return false
  }

  // Save the updated notes back to localStorage
  saveNotes(filteredNotes)
  return true
}

// Get available categories
export function getCategories(): Category[] {
  return ["Personal", "Work", "Study", "Health", "Finance", "Travel", "Ideas", "Other"]
}

// Extract tags from note content using regular expression
export function extractTagsFromContent(content: string): Tag[] {
  const tagRegex = /#(\w+)/g // Match hashtags (e.g., #work, #study)
  const matches = content.match(tagRegex)

  if (!matches) return [] // Return empty array if no tags found

  return matches.map((tag) => tag.substring(1)) // Remove the '#' character from tags
}
