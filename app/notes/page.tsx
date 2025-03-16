"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getNotes, deleteNote } from "@/lib/note-service"
import type { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, FilePlus, Hash, Search, SortAsc, SortDesc, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function NotesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<"updatedAt" | "createdAt" | "title">("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const notesPerPage = 3

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const allNotes = getNotes().filter((note) => note.creatorId === user.id)
    setNotes(allNotes)
  }, [user, router])

  useEffect(() => {
    let result = [...notes]

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((note) => note.category === categoryFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB

      if (sortField === "title") {
        valueA = a.title.toLowerCase()
        valueB = b.title.toLowerCase()
      } else {
        valueA = new Date(a[sortField]).getTime()
        valueB = new Date(b[sortField]).getTime()
      }

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

    setFilteredNotes(result)
  }, [notes, categoryFilter, searchQuery, sortField, sortDirection])

  // Get current notes for pagination
  const indexOfLastNote = currentPage * notesPerPage
  const indexOfFirstNote = indexOfLastNote - notesPerPage
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote)
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString()
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const deleteNoteHandler = async (noteId: string) => {
    const isDeleted = deleteNote(noteId)

    if (isDeleted) {
      // Update local state to reflect the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      setFilteredNotes((prevFilteredNotes) =>
        prevFilteredNotes.filter((note) => note.id !== noteId)
      )
      
      // Adjust the page number if it exceeds total pages after deletion
      if (currentPage > totalPages) {
        setCurrentPage(totalPages)
      }
    } else {
      alert("Failed to delete the note.")
    }
  }

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Notes</h1>
          <p className="text-muted-foreground">Manage and organize your notes</p>
        </div>
        <Link href="/notes/new">
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Create Note
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Study">Study</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Ideas">Ideas</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Select
            value={sortField}
            onValueChange={(value) => setSortField(value as "updatedAt" | "createdAt" | "title")}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updatedAt">Last Updated</SelectItem>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            aria-label={`Sort ${sortDirection === "asc" ? "ascending" : "descending"}`}
          >
            {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {currentNotes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No notes found</h2>
          <p className="text-muted-foreground mb-6">
            {notes.length === 0 ? "You haven't created any notes yet." : "No notes match your current filters."}
          </p>
          {notes.length === 0 && (
            <Link href="/notes/new">
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                Create your first note
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentNotes.map((note) => (
              <Link href={`/notes`} key={note.id}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                      <Badge variant="outline">{note.category}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {note.creatorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm mb-4">{note.content}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(note.updatedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(note.updatedAt)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault()
                        deleteNoteHandler(note.id)
                      }}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              >
                Previous
              </PaginationPrevious>
              <PaginationItem>{currentPage}</PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              >
                Next
              </PaginationNext>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}
