export type User = {
  id: string
  name: string
  email: string
}

export type Tag = string

export type Category = "Personal" | "Work" | "Study" | "Health" | "Finance" | "Travel" | "Ideas" | "Other"

export type HistoryEntry = {
  id: string
  timestamp: string
  content: string
}

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  category: Category
  tags: Tag[]
  creatorId: string
  creatorName: string
  history: HistoryEntry[]
}

